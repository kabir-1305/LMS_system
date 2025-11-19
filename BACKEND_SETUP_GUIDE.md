# Backend Setup Guide
## Ready-to-Use Code to Get Started

---

## 🚀 Quick Start (30 minutes)

### Step 1: Initialize Node.js Project

```bash
# In the dashboard directory
cd backend
npm init -y
npm install express cors dotenv axios bcryptjs jsonwebtoken pg
npm install -D nodemon
```

### Step 2: Create Project Structure

```
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── departmentController.js
│   └── attendanceController.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── departments.js
│   └── attendance.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   └── queryHelpers.js
├── .env
├── .gitignore
├── server.js
└── package.json
```

### Step 3: Database Setup

Install PostgreSQL (or use free cloud version):
- **Local:** PostgreSQL from postgresql.org
- **Free Cloud:** Supabase (supabase.com) or ElephantSQL

Create database:
```sql
CREATE DATABASE college_management;
```

---

## 📝 Complete Code Files

### 1. `.env` File

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=college_management

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Email (for future use)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key

# Payment Gateway (for future use)
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

### 2. `config/database.js`

```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
```

### 3. `server.js` (Main File)

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const departmentRoutes = require('./routes/departments');
const attendanceRoutes = require('./routes/attendance');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'OK', 
      database: 'Connected',
      time: result.rows[0] 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      message: error.message 
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/attendance', attendanceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: err.message,
    message: 'Internal Server Error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
```

### 4. `middleware/auth.js`

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission for this action' 
      });
    }
    next();
  };
};

module.exports = { authMiddleware, roleCheck };
```

### 5. `routes/auth.js`

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Validate input
    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // Check if user exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password, name, role, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, email, name, role',
      [email, hashedPassword, name, role]
    );

    const user = result.rows[0];

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: 'User created successfully',
      user,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Update last login
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify token
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

module.exports = router;
```

### 6. `routes/users.js`

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { authMiddleware, roleCheck } = require('../middleware/auth');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authMiddleware, roleCheck(['admin']), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, role, department_id, created_at FROM users ORDER BY created_at DESC'
    );

    res.json({
      count: result.rows.length,
      users: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, role, department_id, phone, address, created_at FROM users WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create user (Admin only)
router.post('/', authMiddleware, roleCheck(['admin']), async (req, res) => {
  try {
    const { email, password, name, role, department_id, phone, address } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: 'Email, password, name, and role required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password, name, role, department_id, phone, address, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id, email, name, role',
      [email, hashedPassword, name, role, department_id || null, phone || null, address || null]
    );

    res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update user (Admin only)
router.put('/:id', authMiddleware, roleCheck(['admin']), async (req, res) => {
  try {
    const { name, phone, address, role, department_id } = req.body;

    const result = await pool.query(
      'UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), address = COALESCE($3, address), role = COALESCE($4, role), department_id = COALESCE($5, department_id), updated_at = NOW() WHERE id = $6 RETURNING id, email, name, role',
      [name, phone, address, role, department_id, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user (Admin only)
router.delete('/:id', authMiddleware, roleCheck(['admin']), async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset password (Admin only)
router.post('/:id/reset-password', authMiddleware, roleCheck(['admin']), async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: 'New password required' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await pool.query(
      'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING id, email, name',
      [hashedPassword, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Password reset successfully',
      user: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 7. `routes/departments.js`

```javascript
const express = require('express');
const pool = require('../config/database');
const { authMiddleware, roleCheck } = require('../middleware/auth');

const router = express.Router();

// Get all departments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, head_id, contact, created_at FROM departments ORDER BY name'
    );

    res.json({
      count: result.rows.length,
      departments: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get department by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, head_id, contact, created_at FROM departments WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create department (Admin only)
router.post('/', authMiddleware, roleCheck(['admin']), async (req, res) => {
  try {
    const { name, head_id, contact } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Department name required' });
    }

    const result = await pool.query(
      'INSERT INTO departments (name, head_id, contact, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [name, head_id || null, contact || null]
    );

    res.status(201).json({
      message: 'Department created successfully',
      department: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update department (Admin only)
router.put('/:id', authMiddleware, roleCheck(['admin']), async (req, res) => {
  try {
    const { name, head_id, contact } = req.body;

    const result = await pool.query(
      'UPDATE departments SET name = COALESCE($1, name), head_id = COALESCE($2, head_id), contact = COALESCE($3, contact), updated_at = NOW() WHERE id = $4 RETURNING *',
      [name, head_id, contact, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({
      message: 'Department updated successfully',
      department: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete department (Admin only)
router.delete('/:id', authMiddleware, roleCheck(['admin']), async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM departments WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 8. `routes/attendance.js`

```javascript
const express = require('express');
const pool = require('../config/database');
const { authMiddleware, roleCheck } = require('../middleware/auth');

const router = express.Router();

// Mark attendance (Teacher only)
router.post('/', authMiddleware, roleCheck(['teacher']), async (req, res) => {
  try {
    const { student_id, class_id, date, status, remarks } = req.body;

    if (!student_id || !class_id || !date || !status) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStatus = ['present', 'absent', 'late'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const result = await pool.query(
      'INSERT INTO attendance (student_id, class_id, date, status, marked_by, remarks, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [student_id, class_id, date, status, req.user.id, remarks || null]
    );

    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance for a student
router.get('/student/:student_id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM attendance WHERE student_id = $1 ORDER BY date DESC',
      [req.params.student_id]
    );

    const total = result.rows.length;
    const present = result.rows.filter(r => r.status === 'present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    res.json({
      student_id: req.params.student_id,
      total,
      present,
      absent: total - present,
      percentage: `${percentage}%`,
      records: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance for a class
router.get('/class/:class_id', authMiddleware, roleCheck(['teacher', 'hod', 'admin']), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM attendance WHERE class_id = $1 ORDER BY date DESC',
      [req.params.class_id]
    );

    res.json({
      class_id: req.params.class_id,
      total_records: result.rows.length,
      records: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update attendance (Teacher only)
router.put('/:id', authMiddleware, roleCheck(['teacher']), async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const result = await pool.query(
      'UPDATE attendance SET status = COALESCE($1, status), remarks = COALESCE($2, remarks), updated_at = NOW() WHERE id = $3 RETURNING *',
      [status, remarks, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json({
      message: 'Attendance updated successfully',
      attendance: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 9. `package.json` Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --detectOpenHandles --forceExit",
    "db:init": "node scripts/initDatabase.js"
  }
}
```

---

## 🗄️ Database Schema (SQL)

Save as `scripts/initDatabase.sql`:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'hod', 'teacher', 'student')),
  department_id INTEGER,
  phone VARCHAR(20),
  address TEXT,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  head_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  contact VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  semester VARCHAR(50),
  section VARCHAR(10),
  capacity INTEGER,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  credits INTEGER,
  department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Class-Course mapping (many-to-many)
CREATE TABLE class_courses (
  id SERIAL PRIMARY KEY,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  teacher_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(class_id, course_id)
);

-- Student-Class mapping (many-to-many)
CREATE TABLE student_classes (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, class_id)
);

-- Attendance table
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  marked_by INTEGER REFERENCES users(id),
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, class_id, date)
);

-- Assignments table
CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  file_path VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions table
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_path VARCHAR(500) NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  score DECIMAL(5, 2),
  feedback TEXT,
  graded_at TIMESTAMP,
  graded_by INTEGER REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grades table
CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  marks DECIMAL(5, 2) NOT NULL,
  grade_letter VARCHAR(2),
  entered_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id)
);

-- Fee Invoices table
CREATE TABLE fee_invoices (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'paid', 'overdue')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER NOT NULL REFERENCES fee_invoices(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  method VARCHAR(50), -- 'online', 'cash', 'check'
  transaction_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'completed'
);

-- Announcements table
CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  target_type VARCHAR(50), -- 'college', 'department', 'class', 'individual'
  target_id INTEGER,
  scheduled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  attachment_path VARCHAR(500),
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_department ON users(department_id);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_class ON attendance(class_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_grades_student ON grades(student_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_student_classes_student ON student_classes(student_id);
CREATE INDEX idx_student_classes_class ON student_classes(class_id);
```

---

## 🚀 How to Run

### 1. Setup Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE college_management;

# Exit
\q

# Load schema
psql -U postgres -d college_management -f scripts/initDatabase.sql
```

### 2. Start Server

```bash
# Install dependencies
npm install

# Create .env file with your settings
# (see .env section above)

# Start development server
npm run dev

# Or production
npm start
```

### 3. Test Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.com","password":"Admin@123","name":"Admin User","role":"admin"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.com","password":"Admin@123"}'

# Get users (use token from login)
curl http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📱 Connect React Frontend

### In React (StudentDashboard.js or any component):

```javascript
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api';

export default function StudentDashboard() {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Get student ID from auth context or localStorage
    const studentId = localStorage.getItem('userId');

    axios.get(`${API_URL}/attendance/student/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Attendance: {attendance?.percentage}</h2>
      <p>Present: {attendance?.present} out of {attendance?.total}</p>
    </div>
  );
}
```

---

## 🔒 CORS Configuration

Update `server.js`:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

---

## ✅ Next Steps

1. **Setup database** with the SQL schema
2. **Create backend folder** with the file structure
3. **Copy the code** from the sections above
4. **Run `npm run dev`** to start server
5. **Test endpoints** with curl or Postman
6. **Connect React frontend** to backend

This is your complete, production-ready foundation. Now you can build the full system!
