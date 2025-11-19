# Implementation Guide - College Management System

## Overview

This guide provides step-by-step instructions to implement the professional college management workflow with full communication, admin controls, and interconnected systems.

---

## Week 1-2: Backend Setup & Database

### Step 1: Choose Backend Technology

**Option A: Node.js + Express (Recommended)**
```bash
# Initialize project
mkdir college-management-api
cd college-management-api
npm init -y

# Install dependencies
npm install express cors dotenv bcryptjs jsonwebtoken
npm install mysql2 sequelize sequelize-cli
npm install nodemon --save-dev
```

**Option B: Python + Django**
```bash
python -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers
pip install python-dotenv bcrypt PyJWT
```

### Step 2: Setup Database

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE college_management;
USE college_management;

# Run schema files
mysql -u root -p college_management < DATABASE_SCHEMA.md
```

### Step 3: Create Environment Configuration

**.env file:**
```
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=college_management
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=7d

# Email
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Gateway
STRIPE_KEY=your_stripe_key
STRIPE_SECRET=your_stripe_secret

# AWS/File Storage
AWS_ACCESS_KEY=your_key
AWS_SECRET_KEY=your_secret
AWS_BUCKET=your_bucket

# API Configuration
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

### Step 4: Create Core API Endpoints

**Express.js Example Structure:**
```
api/
├── config/
│   ├── database.js
│   └── jwt.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── studentController.js
│   ├── teacherController.js
│   ├── attendanceController.js
│   ├── assignmentController.js
│   ├── gradeController.js
│   ├── feeController.js
│   ├── announcementController.js
│   └── messageController.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── admin.js
│   ├── hod.js
│   ├── teacher.js
│   ├── student.js
│   └── public.js
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validationMiddleware.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Student.js
│   ├── Teacher.js
│   ├── Course.js
│   ├── Assignment.js
│   ├── Grade.js
│   ├── Attendance.js
│   ├── Payment.js
│   ├── Announcement.js
│   └── Message.js
├── services/
│   ├── authService.js
│   ├── emailService.js
│   ├── paymentService.js
│   ├── fileService.js
│   └── notificationService.js
├── utils/
│   ├── helpers.js
│   ├── validators.js
│   └── constants.js
├── app.js
├── server.js
└── .env
```

---

## Week 2-3: Authentication & Authorization System

### Step 1: Implement JWT Authentication

**authController.js:**
```javascript
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password_hash: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      status: 'active'
    });

    // Create role assignment
    await user.createRole({ role });

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user role
    const userRole = await user.getRole();

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: userRole.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Update last login
    await user.update({ last_login: new Date() });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: userRole.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Step 2: Create Middleware for Role-Based Access Control

**roleMiddleware.js:**
```javascript
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

### Step 3: Setup Routes

**routes/admin.js:**
```javascript
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const userController = require('../controllers/userController');

// Protect all admin routes
router.use(authMiddleware.authenticate);
router.use(roleMiddleware.authorize(['admin']));

// User Management
router.post('/users', userController.createUser);
router.get('/users', userController.listUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users/bulk-import', userController.bulkImportUsers);

// Department Management
router.post('/departments', require('../controllers/departmentController').create);
router.get('/departments', require('../controllers/departmentController').list);
router.put('/departments/:id', require('../controllers/departmentController').update);

// Class Management
router.post('/classes', require('../controllers/classController').create);
router.get('/classes', require('../controllers/classController').list);

// Fee Management
router.post('/fee-structures', require('../controllers/feeController').createFeeStructure);
router.get('/fees/analytics', require('../controllers/feeController').getFinancialAnalytics);

// Reports
router.get('/reports/analytics', require('../controllers/reportController').getExecutiveDashboard);
router.get('/reports/students', require('../controllers/reportController').getStudentAnalytics);
router.get('/reports/financial', require('../controllers/reportController').getFinancialReport);

module.exports = router;
```

---

## Week 3-4: Core Academic Features

### Step 1: Implement Assignment System

**assignmentController.js:**
```javascript
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, classCourseId, dueDate, maxScore } = req.body;
    const teacherId = req.user.userId;

    const assignment = await Assignment.create({
      class_course_id: classCourseId,
      teacher_id: teacherId,
      title,
      description,
      due_date: dueDate,
      max_score: maxScore,
      assigned_date: new Date()
    });

    // Notify students
    const enrollment = await StudentCourseEnrollment.findAll({
      where: { class_course_id: classCourseId }
    });

    const notificationPromises = enrollment.map(e =>
      Notification.create({
        user_id: e.student_id,
        type: 'assignment_posted',
        title: `New Assignment: ${title}`,
        message: `New assignment "${title}" has been posted`,
        action_url: `/student-dashboard/assignments/${assignment.id}`
      })
    );

    await Promise.all(notificationPromises);

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const { classCourseId } = req.query;

    const assignments = await Assignment.findAll({
      where: { class_course_id: classCourseId },
      include: [{ model: Submission, as: 'submissions' }]
    });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const studentId = req.user.userId;
    const { submissionText } = req.body;
    const submissionFile = req.file;

    // Check if already submitted
    const existing = await Submission.findOne({
      where: { assignment_id: assignmentId, student_id: studentId }
    });

    if (existing) {
      return res.status(400).json({ error: 'Already submitted' });
    }

    const submission = await Submission.create({
      assignment_id: assignmentId,
      student_id: studentId,
      submission_text: submissionText,
      submission_file_url: submissionFile?.location,
      submission_datetime: new Date(),
      submission_status: 'submitted'
    });

    // Notify teacher
    const assignment = await Assignment.findByPk(assignmentId);
    await Notification.create({
      user_id: assignment.teacher_id,
      type: 'assignment_submitted',
      title: 'New Assignment Submission',
      message: `Student submitted assignment: ${assignment.title}`,
      action_url: `/teacher-dashboard/assignments/${assignmentId}/submissions`
    });

    res.status(201).json({
      message: 'Assignment submitted successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.gradeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { score, feedback } = req.body;
    const teacherId = req.user.userId;

    const submission = await Submission.findByPk(submissionId);
    const assignment = await Assignment.findByPk(submission.assignment_id);

    // Create grade record
    const grade = await Grade.create({
      submission_id: submissionId,
      student_id: submission.student_id,
      course_id: submission.course_id,
      teacher_id: teacherId,
      marks_obtained: score,
      total_marks: assignment.max_score,
      feedback,
      graded_date: new Date(),
      is_published: true,
      published_date: new Date()
    });

    // Update submission status
    await submission.update({ submission_status: 'graded' });

    // Notify student
    await Notification.create({
      user_id: submission.student_id,
      type: 'grade_posted',
      title: 'Assignment Graded',
      message: `Your assignment "${assignment.title}" has been graded: ${score}/${assignment.max_score}`,
      action_url: `/student-dashboard/grades`
    });

    res.json({
      message: 'Grade submitted successfully',
      grade
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Step 2: Implement Attendance System

**attendanceController.js:**
```javascript
exports.markAttendance = async (req, res) => {
  try {
    const { classId, courseId, attendanceData, attendanceDate } = req.body;
    const teacherId = req.user.userId;

    // Create attendance record
    const attendance = await AttendanceRecord.create({
      class_id: classId,
      course_id: courseId,
      teacher_id: teacherId,
      attendance_date: attendanceDate,
      marked_by: teacherId
    });

    // Bulk create attendance details
    const details = attendanceData.map(item => ({
      attendance_record_id: attendance.id,
      student_id: item.studentId,
      attendance_status: item.status,
      remarks: item.remarks
    }));

    await StudentAttendanceDetail.bulkCreate(details);

    // Get students and notify those with low attendance
    const students = await Student.findAll({
      where: { class_id: classId }
    });

    for (const student of students) {
      const attendance_count = await StudentAttendanceDetail.count({
        where: { student_id: student.id, attendance_status: 'present' }
      });

      const total_count = await StudentAttendanceDetail.count({
        where: { student_id: student.id }
      });

      const percentage = (attendance_count / total_count) * 100;

      if (percentage < 75) {
        // Alert student
        await Notification.create({
          user_id: student.user_id,
          type: 'low_attendance_alert',
          title: 'Low Attendance Alert',
          message: `Your attendance is ${percentage.toFixed(2)}%. Attend more classes.`,
          priority_level: 'urgent'
        });

        // Alert HOD
        const department = await Department.findByPk(student.department_id);
        await Notification.create({
          user_id: department.hod_id,
          type: 'low_attendance_alert',
          title: `Low Attendance: ${student.user.full_name}`,
          message: `Student attendance is below threshold`
        });
      }
    }

    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { studentId, classCourseId } = req.query;

    const attendance = await StudentAttendanceDetail.findAll({
      include: [
        {
          model: AttendanceRecord,
          where: { course_id: classCourseId }
        }
      ],
      where: { student_id: studentId }
    });

    // Calculate statistics
    const total = attendance.length;
    const present = attendance.filter(a => a.attendance_status === 'present').length;
    const percentage = (present / total) * 100;

    res.json({
      attendance,
      statistics: {
        total,
        present,
        absent: total - present,
        percentage: percentage.toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## Week 4-5: Communication System

### Step 1: Implement Announcements

**announcementController.js:**
```javascript
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, targetAudience, targetDepartmentId, targetClassId, priorityLevel } = req.body;
    const creatorId = req.user.userId;

    const announcement = await Announcement.create({
      creator_id: creatorId,
      title,
      content,
      announcement_type: targetAudience,
      target_department_id: targetDepartmentId,
      target_class_id: targetClassId,
      priority_level: priorityLevel,
      is_published: true,
      published_date: new Date()
    });

    // Determine recipients based on target audience
    let recipients = [];

    if (targetAudience === 'college_wide') {
      recipients = await User.findAll({
        where: { status: 'active' }
      });
    } else if (targetAudience === 'department') {
      recipients = await User.findAll({
        include: [{
          model: UserRole,
          where: { department_id: targetDepartmentId }
        }],
        where: { status: 'active' }
      });
    } else if (targetAudience === 'class') {
      recipients = await Student.findAll({
        where: { class_id: targetClassId },
        include: [{ model: User }]
      }).map(s => s.user);
    }

    // Create announcement recipients and send notifications
    const recipientRecords = recipients.map(r => ({
      announcement_id: announcement.id,
      recipient_id: r.id
    }));

    await AnnouncementRecipient.bulkCreate(recipientRecords);

    // Send notifications
    const notifications = recipients.map(r => ({
      user_id: r.id,
      type: 'announcement',
      title: title,
      message: content.substring(0, 100),
      action_url: `/dashboard/announcements/${announcement.id}`,
      priority_level: priorityLevel
    }));

    await Notification.bulkCreate(notifications);

    res.status(201).json({
      message: 'Announcement created and sent',
      announcement
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Step 2: Implement Messaging

**messageController.js:**
```javascript
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, subject, content } = req.body;
    const senderId = req.user.userId;

    // Find or create conversation
    let conversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          { initiator_id: senderId, recipient_id: recipientId },
          { initiator_id: recipientId, recipient_id: senderId }
        ]
      }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        initiator_id: senderId,
        recipient_id: recipientId,
        subject
      });
    }

    // Create message
    const message = await Message.create({
      conversation_id: conversation.id,
      sender_id: senderId,
      recipient_id: recipientId,
      subject,
      content,
      message_type: 'text'
    });

    // Update conversation
    await conversation.update({
      last_message_at: new Date(),
      last_message_preview: content.substring(0, 100)
    });

    // Send notification to recipient
    await Notification.create({
      user_id: recipientId,
      type: 'new_message',
      title: `New message from ${req.user.name}`,
      message: `${subject}: ${content.substring(0, 50)}...`,
      action_url: `/dashboard/messages/${conversation.id}`
    });

    res.status(201).json({
      message: 'Message sent successfully',
      message: message
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.userId;

    const messages = await Message.findAll({
      where: { conversation_id: conversationId },
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'recipient' }
      ],
      order: [['created_at', 'ASC']]
    });

    // Mark as read
    await Message.update(
      { is_read: true, read_at: new Date() },
      {
        where: {
          conversation_id: conversationId,
          recipient_id: userId,
          is_read: false
        }
      }
    );

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## Week 5-6: Financial Management

### Step 1: Implement Fee Management

**feeController.js:**
```javascript
exports.createFeeStructure = async (req, res) => {
  try {
    const { classId, academicYear, fees } = req.body;

    const feeStructure = await FeeStructure.create({
      class_id: classId,
      academic_year: academicYear,
      tuition_fee: fees.tuitionFee,
      lab_fee: fees.labFee,
      library_fee: fees.libraryFee,
      sports_fee: fees.sportsFee,
      exam_fee: fees.examFee,
      technology_fee: fees.technologyFee,
      development_fee: fees.developmentFee
    });

    res.status(201).json({
      message: 'Fee structure created',
      feeStructure
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { studentId, amount, paymentMethod, feeScheduleId } = req.body;

    // Create payment record (pending)
    const payment = await Payment.create({
      student_id: studentId,
      amount_paid: amount,
      payment_method: paymentMethod,
      fee_schedule_id: feeScheduleId,
      payment_status: 'pending'
    });

    // If online payment, integrate with payment gateway
    if (paymentMethod === 'online') {
      // Integrate Stripe/Razorpay
      const stripe = require('stripe')(process.env.STRIPE_SECRET);
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'inr',
            product_data: {
              name: `College Fee - ${studentId}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment-success?paymentId=${payment.id}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
        metadata: {
          paymentId: payment.id,
          studentId
        }
      });

      return res.json({
        sessionId: session.id,
        paymentId: payment.id
      });
    }

    res.json({
      message: 'Payment recorded',
      payment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findByPk(studentId);
    const feeStructure = await FeeStructure.findOne({
      where: { class_id: student.class_id }
    });

    const payments = await Payment.findAll({
      where: { student_id: studentId }
    });

    const totalPaid = payments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + p.amount_paid, 0);

    const outstandingAmount = feeStructure.total_fee - totalPaid;

    res.json({
      feeStructure,
      totalFee: feeStructure.total_fee,
      totalPaid,
      outstandingAmount,
      payments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## Week 6-7: Admin Dashboard

### Step 1: Implement Analytics

**reportController.js:**
```javascript
exports.getExecutiveDashboard = async (req, res) => {
  try {
    // Get key metrics
    const totalUsers = await User.count();
    const totalStudents = await Student.count({ where: { status: 'active' } });
    const totalTeachers = await Teacher.count({ where: { status: 'active' } });
    const totalDepartments = await Department.count();

    // Get financial metrics
    const totalFeeCollected = await Payment.sum('amount_paid', {
      where: { payment_status: 'completed' }
    });

    // Get academic metrics
    const avgAttendance = await sequelize.query(`
      SELECT AVG(
        (SELECT COUNT(*) FROM student_attendance_details 
         WHERE attendance_status = 'present' AND student_id = s.id) * 100 /
        (SELECT COUNT(*) FROM student_attendance_details WHERE student_id = s.id)
      ) as avg_attendance
      FROM students s
    `);

    // Get system health
    const recentLogins = await LoginAudit.count({
      where: {
        login_time: {
          [Op.gte]: new Date(Date.now() - 24*60*60*1000)
        }
      }
    });

    res.json({
      userMetrics: {
        totalUsers,
        totalStudents,
        totalTeachers,
        totalDepartments
      },
      financialMetrics: {
        totalFeeCollected: totalFeeCollected || 0,
        outstandingFees: await getOutstandingFees(),
        collectionRate: await getCollectionRate()
      },
      academicMetrics: {
        avgAttendance: avgAttendance[0][0]?.avg_attendance || 0,
        avgGPA: await getAvgGPA(),
        passRate: await getPassRate()
      },
      systemMetrics: {
        recentLogins,
        activeUsers: await getActiveUsers(),
        systemUptime: '99.9%'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, role } = req.query;

    let where = {};
    if (startDate && endDate) {
      where.account_created_at = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    if (role) {
      where['$UserRoles.role$'] = role;
    }

    const users = await User.findAll({
      where,
      include: [{ model: UserRole, as: 'UserRoles' }],
      attributes: ['id', 'email', 'status', 'account_created_at']
    });

    const summary = {
      totalNewUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      inactiveUsers: users.filter(u => u.status === 'inactive').length,
      suspendedUsers: users.filter(u => u.status === 'suspended').length
    };

    res.json({ users, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## Week 7: Frontend Integration

### Step 1: Update Frontend API Service

**src/services/api.js:**
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout')
};

// Student endpoints
export const studentAPI = {
  getDashboard: () => api.get('/student/dashboard'),
  getAssignments: () => api.get('/student/assignments'),
  submitAssignment: (assignmentId, data) => api.post(`/student/assignments/${assignmentId}/submit`, data),
  getGrades: () => api.get('/student/grades'),
  getAttendance: () => api.get('/student/attendance'),
  getAnnouncements: () => api.get('/announcements'),
  getMessages: () => api.get('/messages'),
  getFees: () => api.get('/student/fees')
};

// Teacher endpoints
export const teacherAPI = {
  getDashboard: () => api.get('/teacher/dashboard'),
  createAssignment: (data) => api.post('/teacher/assignments', data),
  getAssignments: (classId) => api.get(`/teacher/classes/${classId}/assignments`),
  getSubmissions: (assignmentId) => api.get(`/teacher/assignments/${assignmentId}/submissions`),
  gradeSubmission: (submissionId, data) => api.post(`/teacher/submissions/${submissionId}/grade`, data),
  markAttendance: (data) => api.post('/teacher/attendance', data),
  getClasses: () => api.get('/teacher/classes')
};

// HOD endpoints
export const hodAPI = {
  getDashboard: () => api.get('/hod/dashboard'),
  getDepartmentAnalytics: () => api.get('/hod/department/analytics'),
  getTeachers: () => api.get('/hod/teachers'),
  getStudents: () => api.get('/hod/students'),
  getReports: () => api.get('/hod/reports')
};

// Admin endpoints
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  createUser: (data) => api.post('/admin/users', data),
  getUsers: (filters) => api.get('/admin/users', { params: filters }),
  updateUser: (userId, data) => api.put(`/admin/users/${userId}`, data),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  bulkImportUsers: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/admin/users/bulk-import', formData);
  },
  getAnalytics: (type, filters) => api.get(`/admin/reports/${type}`, { params: filters }),
  getFinancialReport: (filters) => api.get('/admin/reports/financial', { params: filters })
};

// Communication endpoints
export const communicationAPI = {
  createAnnouncement: (data) => api.post('/announcements', data),
  getAnnouncements: (filters) => api.get('/announcements', { params: filters }),
  sendMessage: (data) => api.post('/messages', data),
  getMessages: (conversationId) => api.get(`/messages/${conversationId}`),
  getConversations: () => api.get('/conversations'),
  getNotifications: () => api.get('/notifications'),
  markNotificationAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`)
};

export default api;
```

### Step 2: Create Hooks for Data Fetching

**src/hooks/useStudentDashboard.js:**
```javascript
import { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';

export const useStudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await studentAPI.getDashboard();
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading, error };
};

export const useAssignments = (classId) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await studentAPI.getAssignments(classId);
        setAssignments(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [classId]);

  return { assignments, loading };
};

export const useGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await studentAPI.getGrades();
        setGrades(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  return { grades, loading };
};
```

---

## Deployment Checklist

### Development Environment
- [ ] Backend API running on localhost:5000
- [ ] MySQL database running
- [ ] Frontend running on localhost:3000
- [ ] All environment variables configured
- [ ] JWT tokens working

### Testing
- [ ] Unit tests written (80%+ coverage)
- [ ] Integration tests passing
- [ ] E2E tests for critical flows
- [ ] API documentation complete
- [ ] Security audit done

### Production Preparation
- [ ] Database backed up
- [ ] SSL certificates configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Logging and monitoring setup
- [ ] Error tracking (Sentry) configured
- [ ] Performance optimized

### Deployment
- [ ] Choose hosting platform (AWS/GCP/Heroku)
- [ ] Setup CI/CD pipeline
- [ ] Configure environment variables
- [ ] Run database migrations
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Setup monitoring and alerts
- [ ] Test all critical paths

---

## Post-Launch Tasks

1. **Monitor Performance**
   - Setup application performance monitoring (APM)
   - Monitor database performance
   - Track API response times

2. **User Training**
   - Create user documentation
   - Conduct training sessions
   - Setup helpdesk support

3. **Iterative Improvements**
   - Gather user feedback
   - Fix bugs and issues
   - Implement requested features

4. **Security Updates**
   - Regular security patches
   - Dependency updates
   - Security audits

5. **Backup & Recovery**
   - Regular database backups
   - Test recovery procedures
   - Document disaster recovery plan

---

**Status:** Ready for Development  
**Estimated Timeline:** 8 weeks  
**Team Size:** 3-5 developers  
**Last Updated:** November 2025
