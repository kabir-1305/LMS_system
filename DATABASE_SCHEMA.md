# College Management System - Complete Database Schema

## Database Design Philosophy

- **Normalization:** 3NF (Third Normal Form)
- **Scalability:** Designed for 10,000+ users
- **Data Integrity:** Foreign keys, constraints, and validations
- **Performance:** Indexed on frequently queried columns
- **Audit Trail:** Tracking all changes for compliance

---

## 1. User Management Module

### 1.1 Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  full_name VARCHAR(255) GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name)) STORED,
  profile_picture_url VARCHAR(500),
  date_of_birth DATE,
  gender ENUM('Male', 'Female', 'Other', 'Prefer Not to Say'),
  blood_group VARCHAR(5),
  nationality VARCHAR(50),
  permanent_address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relation VARCHAR(50),
  status ENUM('active', 'inactive', 'suspended', 'deleted') DEFAULT 'active',
  last_login TIMESTAMP NULL,
  login_count INT DEFAULT 0,
  password_changed_at TIMESTAMP NULL,
  account_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  account_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_email (email),
  INDEX idx_status (status),
  INDEX idx_email (email),
  INDEX idx_created_at (account_created_at)
);

-- Table description:
-- Stores all user information including students, teachers, HODs, and admins
-- UUID used for external API calls (security measure)
-- Soft delete support with deleted_at field
```

### 1.2 User Roles Table
```sql
CREATE TABLE user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  role VARCHAR(50) NOT NULL,
  department_id INT,
  is_primary BOOLEAN DEFAULT FALSE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  assigned_by INT NOT NULL,
  deassigned_at TIMESTAMP NULL,
  permissions JSON,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_user_role_dept (user_id, role, department_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_by) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_role (role)
);

-- Supports multiple roles per user
-- Track who assigned the role and when
-- Store role-specific permissions as JSON
```

### 1.3 Role Definitions Table
```sql
CREATE TABLE role_definitions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  role_name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  base_permissions JSON NOT NULL,
  is_system_role BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_role_name (role_name)
);

-- System roles: admin, hod, teacher, student, support_staff
-- Custom roles can be created by admin
```

### 1.4 Permissions Table
```sql
CREATE TABLE permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  permission_code VARCHAR(100) UNIQUE NOT NULL,
  resource VARCHAR(50),
  action VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_permission_code (permission_code),
  INDEX idx_resource (resource)
);

INSERT INTO permissions (permission_code, resource, action, description) VALUES
-- Admin permissions
('admin.user.create', 'user', 'create', 'Create user accounts'),
('admin.user.read', 'user', 'read', 'View user information'),
('admin.user.update', 'user', 'update', 'Update user information'),
('admin.user.delete', 'user', 'delete', 'Delete user accounts'),
-- Teacher permissions
('teacher.attendance.mark', 'attendance', 'create', 'Mark attendance'),
('teacher.grades.create', 'grade', 'create', 'Create grades'),
('teacher.assignments.create', 'assignment', 'create', 'Create assignments'),
-- Student permissions
('student.dashboard.view', 'dashboard', 'read', 'View own dashboard'),
('student.grades.view', 'grade', 'read', 'View own grades'),
('student.attendance.view', 'attendance', 'read', 'View own attendance');
```

### 1.5 Login Audit Table
```sql
CREATE TABLE login_audit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  logout_time TIMESTAMP NULL,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  browser VARCHAR(100),
  operating_system VARCHAR(100),
  device_type VARCHAR(50),
  login_status ENUM('success', 'failed') DEFAULT 'success',
  failure_reason VARCHAR(255),
  session_duration INT,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id_time (user_id, login_time),
  INDEX idx_ip_address (ip_address)
);

-- Track login history for security and analytics
```

---

## 2. Organizational Structure Module

### 2.1 College Information Table
```sql
CREATE TABLE college_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  college_name VARCHAR(200) NOT NULL,
  college_code VARCHAR(50) UNIQUE,
  logo_url VARCHAR(500),
  establishment_year INT,
  accreditation_status VARCHAR(50),
  accreditation_body VARCHAR(100),
  principal_id INT,
  registrar_id INT,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  country VARCHAR(100) NOT NULL,
  phone_primary VARCHAR(20),
  phone_secondary VARCHAR(20),
  email_primary VARCHAR(255),
  email_secondary VARCHAR(255),
  website_url VARCHAR(500),
  helpdesk_email VARCHAR(255),
  helpdesk_phone VARCHAR(20),
  
  -- Academic configuration
  academic_year_start INT,
  academic_year_end INT,
  semester_duration INT,
  total_semesters INT,
  
  -- Logo and branding
  primary_color VARCHAR(7),
  secondary_color VARCHAR(7),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (principal_id) REFERENCES users(id),
  FOREIGN KEY (registrar_id) REFERENCES users(id)
);
```

### 2.2 Departments Table
```sql
CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  college_id INT NOT NULL,
  department_code VARCHAR(50) UNIQUE NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  description TEXT,
  hod_id INT NOT NULL,
  building_location VARCHAR(100),
  phone_number VARCHAR(20),
  email VARCHAR(255),
  established_year INT,
  total_credits INT DEFAULT 120,
  max_students_per_class INT DEFAULT 60,
  total_semesters INT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_department_code (department_code),
  FOREIGN KEY (college_id) REFERENCES college_info(id),
  FOREIGN KEY (hod_id) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_college_id (college_id)
);
```

### 2.3 Classes/Sections Table
```sql
CREATE TABLE classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  department_id INT NOT NULL,
  class_code VARCHAR(50) UNIQUE NOT NULL,
  class_name VARCHAR(100) NOT NULL,
  section VARCHAR(10),
  semester INT NOT NULL,
  academic_year VARCHAR(9) NOT NULL,
  max_strength INT,
  current_strength INT DEFAULT 0,
  class_advisor_id INT NOT NULL,
  class_advisor_secondary_id INT,
  classroom_number VARCHAR(50),
  building_location VARCHAR(100),
  status ENUM('active', 'archived', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_class_code (class_code),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (class_advisor_id) REFERENCES users(id),
  FOREIGN KEY (class_advisor_secondary_id) REFERENCES users(id),
  INDEX idx_department_id (department_id),
  INDEX idx_semester (semester),
  INDEX idx_academic_year (academic_year)
);
```

---

## 3. Academic Management Module

### 3.1 Courses/Subjects Table
```sql
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  department_id INT NOT NULL,
  course_code VARCHAR(50) UNIQUE NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  course_title VARCHAR(200),
  description TEXT,
  semester INT NOT NULL,
  credit_hours INT DEFAULT 3,
  theory_hours INT DEFAULT 3,
  practical_hours INT DEFAULT 0,
  total_hours INT GENERATED ALWAYS AS (theory_hours + practical_hours) STORED,
  course_objectives TEXT,
  course_outcomes JSON,
  prerequisites VARCHAR(500),
  textbooks JSON,
  reference_materials JSON,
  course_type ENUM('theory', 'practical', 'theory_practical') DEFAULT 'theory_practical',
  min_passing_percentage INT DEFAULT 40,
  is_mandatory BOOLEAN DEFAULT TRUE,
  status ENUM('active', 'inactive', 'archived') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_course_code (course_code),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  INDEX idx_department_id (department_id),
  INDEX idx_semester (semester)
);
```

### 3.2 Class-Course Assignment Table
```sql
CREATE TABLE class_courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  class_id INT NOT NULL,
  course_id INT NOT NULL,
  teacher_id INT NOT NULL,
  teacher_secondary_id INT,
  lab_teacher_id INT,
  academic_year VARCHAR(9),
  semester INT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_class_course (class_id, course_id, academic_year),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (teacher_id) REFERENCES users(id),
  FOREIGN KEY (teacher_secondary_id) REFERENCES users(id),
  FOREIGN KEY (lab_teacher_id) REFERENCES users(id),
  INDEX idx_teacher_id (teacher_id),
  INDEX idx_academic_year (academic_year)
);
```

### 3.3 Timetable Table
```sql
CREATE TABLE timetable_slots (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  class_id INT NOT NULL,
  class_course_id INT NOT NULL,
  day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
  period_number INT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room_id INT NOT NULL,
  slot_type ENUM('theory', 'practical', 'lab', 'seminar') DEFAULT 'theory',
  academic_year VARCHAR(9),
  semester INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (class_course_id) REFERENCES class_courses(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id),
  INDEX idx_class_id_day (class_id, day_of_week),
  INDEX idx_room_id_day (room_id, day_of_week)
);
```

### 3.4 Rooms Table
```sql
CREATE TABLE rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  college_id INT NOT NULL,
  room_number VARCHAR(50) NOT NULL,
  building_name VARCHAR(100),
  floor_number INT,
  room_type ENUM('classroom', 'lab', 'seminar', 'auditorium', 'library') DEFAULT 'classroom',
  capacity INT,
  has_projector BOOLEAN DEFAULT FALSE,
  has_whiteboard BOOLEAN DEFAULT TRUE,
  has_board BOOLEAN DEFAULT TRUE,
  has_ac BOOLEAN DEFAULT FALSE,
  has_mic BOOLEAN DEFAULT FALSE,
  has_internet BOOLEAN DEFAULT TRUE,
  special_equipment VARCHAR(255),
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_room_number (room_number, building_name),
  FOREIGN KEY (college_id) REFERENCES college_info(id),
  INDEX idx_room_type (room_type)
);
```

### 3.5 Academic Calendar Table
```sql
CREATE TABLE academic_calendar (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  college_id INT NOT NULL,
  academic_year VARCHAR(9) NOT NULL,
  year_start_date DATE NOT NULL,
  year_end_date DATE NOT NULL,
  
  -- Semester 1
  sem1_start_date DATE,
  sem1_end_date DATE,
  sem1_exam_start_date DATE,
  sem1_exam_end_date DATE,
  sem1_result_date DATE,
  
  -- Semester 2
  sem2_start_date DATE,
  sem2_end_date DATE,
  sem2_exam_start_date DATE,
  sem2_exam_end_date DATE,
  sem2_result_date DATE,
  
  is_published BOOLEAN DEFAULT FALSE,
  published_date TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_academic_year (academic_year),
  FOREIGN KEY (college_id) REFERENCES college_info(id)
);
```

### 3.6 Holidays Table
```sql
CREATE TABLE holidays (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  college_id INT,
  department_id INT,
  holiday_name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  holiday_type ENUM('national', 'state', 'college', 'department', 'festival') DEFAULT 'college',
  description TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (college_id) REFERENCES college_info(id),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_date_range (start_date, end_date)
);
```

---

## 4. Student Management Module

### 4.1 Students Table
```sql
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  user_id INT UNIQUE NOT NULL,
  college_id INT NOT NULL,
  department_id INT NOT NULL,
  class_id INT NOT NULL,
  roll_number VARCHAR(50) UNIQUE NOT NULL,
  admission_number VARCHAR(50) UNIQUE,
  admission_date DATE NOT NULL,
  expected_graduation_date DATE,
  parent_name VARCHAR(100),
  parent_phone VARCHAR(20),
  parent_email VARCHAR(255),
  parent_occupation VARCHAR(100),
  guardian_name VARCHAR(100),
  guardian_phone VARCHAR(20),
  guardian_relation VARCHAR(50),
  guardian_occupation VARCHAR(100),
  caste VARCHAR(50),
  religion VARCHAR(50),
  student_category VARCHAR(50),
  disability_status VARCHAR(100),
  status ENUM('active', 'inactive', 'graduated', 'dropped', 'transferred', 'suspended') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_user_id (user_id),
  UNIQUE KEY uk_roll_number (roll_number),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (college_id) REFERENCES college_info(id),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  INDEX idx_status (status),
  INDEX idx_admission_date (admission_date)
);
```

### 4.2 Student-Course Enrollment Table
```sql
CREATE TABLE student_course_enrollment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  student_id INT NOT NULL,
  class_course_id INT NOT NULL,
  academic_year VARCHAR(9),
  semester INT,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  enrollment_status ENUM('enrolled', 'dropped', 'transferred') DEFAULT 'enrolled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_student_course (student_id, class_course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (class_course_id) REFERENCES class_courses(id)
);
```

---

## 5. Teacher Management Module

### 5.1 Teachers Table
```sql
CREATE TABLE teachers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  user_id INT UNIQUE NOT NULL,
  college_id INT NOT NULL,
  department_id INT NOT NULL,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  qualification VARCHAR(500),
  specialization VARCHAR(100),
  experience_years INT DEFAULT 0,
  employment_type ENUM('permanent', 'contractual', 'visiting') DEFAULT 'permanent',
  employment_date DATE,
  designation VARCHAR(100),
  office_room_number VARCHAR(50),
  office_building VARCHAR(100),
  office_phone VARCHAR(20),
  office_email VARCHAR(255),
  office_hours JSON,
  status ENUM('active', 'inactive', 'on_leave', 'retired', 'resigned') DEFAULT 'active',
  is_hod BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_user_id (user_id),
  UNIQUE KEY uk_employee_id (employee_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (college_id) REFERENCES college_info(id),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  INDEX idx_status (status),
  INDEX idx_department_id (department_id)
);
```

### 5.2 Teacher Course Assignment Table
```sql
CREATE TABLE teacher_course_assignments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  teacher_id INT NOT NULL,
  class_course_id INT NOT NULL,
  assignment_type ENUM('primary_instructor', 'lab_instructor', 'co_instructor') DEFAULT 'primary_instructor',
  academic_year VARCHAR(9),
  semester INT,
  assignment_date DATE DEFAULT CURRENT_DATE,
  hours_per_week INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_teacher_course (teacher_id, class_course_id, assignment_type),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  FOREIGN KEY (class_course_id) REFERENCES class_courses(id)
);
```

---

## 6. Attendance Management Module

### 6.1 Attendance Records Table
```sql
CREATE TABLE attendance_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  class_id INT NOT NULL,
  course_id INT NOT NULL,
  teacher_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  period INT DEFAULT 1,
  marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  marked_by INT NOT NULL,
  academic_year VARCHAR(9),
  semester INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_attendance (class_id, course_id, attendance_date, period),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (teacher_id) REFERENCES users(id),
  FOREIGN KEY (marked_by) REFERENCES users(id),
  INDEX idx_attendance_date (attendance_date),
  INDEX idx_class_id_date (class_id, attendance_date)
);
```

### 6.2 Student Attendance Details Table
```sql
CREATE TABLE student_attendance_details (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  attendance_record_id INT NOT NULL,
  student_id INT NOT NULL,
  attendance_status ENUM('present', 'absent', 'late', 'excused', 'medical_leave') DEFAULT 'absent',
  remarks VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_student_attendance (attendance_record_id, student_id),
  FOREIGN KEY (attendance_record_id) REFERENCES attendance_records(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id),
  INDEX idx_student_id (student_id),
  INDEX idx_status (attendance_status)
);
```

### 6.3 Attendance Requests Table
```sql
CREATE TABLE attendance_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  student_id INT NOT NULL,
  request_date DATE,
  reason_for_absence TEXT,
  supporting_document_url VARCHAR(500),
  request_status ENUM('pending', 'approved', 'rejected', 'under_review') DEFAULT 'pending',
  reviewed_by INT,
  review_date TIMESTAMP NULL,
  review_remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (reviewed_by) REFERENCES users(id),
  INDEX idx_status (request_status),
  INDEX idx_student_id (student_id)
);
```

### 6.4 Attendance Configuration Table
```sql
CREATE TABLE attendance_configuration (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  college_id INT NOT NULL,
  department_id INT,
  min_attendance_percentage INT DEFAULT 75,
  late_arrival_threshold_minutes INT DEFAULT 10,
  auto_alert_threshold_percentage INT DEFAULT 70,
  absence_warning_threshold INT DEFAULT 5,
  max_leave_per_semester INT DEFAULT 10,
  medical_leave_max INT DEFAULT 3,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (college_id) REFERENCES college_info(id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

---

## 7. Assignment & Grading Module

### 7.1 Assignments Table
```sql
CREATE TABLE assignments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  class_course_id INT NOT NULL,
  teacher_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructions TEXT,
  assignment_type ENUM('homework', 'project', 'presentation', 'lab_assignment', 'research_paper') DEFAULT 'homework',
  max_score INT DEFAULT 100,
  assigned_date DATE DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  due_time TIME,
  submission_type ENUM('file_upload', 'online_form', 'both') DEFAULT 'file_upload',
  accepted_file_types VARCHAR(255),
  max_file_size_mb INT,
  allow_late_submission BOOLEAN DEFAULT TRUE,
  late_submission_deadline DATE,
  late_submission_penalty_percent INT DEFAULT 0,
  rubric_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (class_course_id) REFERENCES class_courses(id),
  FOREIGN KEY (teacher_id) REFERENCES users(id),
  INDEX idx_due_date (due_date),
  INDEX idx_class_course_id (class_course_id)
);
```

### 7.2 Submissions Table
```sql
CREATE TABLE submissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  assignment_id INT NOT NULL,
  student_id INT NOT NULL,
  submission_content TEXT,
  submission_file_url VARCHAR(500),
  submission_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_late BOOLEAN DEFAULT FALSE,
  days_late INT DEFAULT 0,
  submission_status ENUM('submitted', 'graded', 'resubmitted', 'not_submitted') DEFAULT 'submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_student_assignment (assignment_id, student_id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id),
  INDEX idx_student_id (student_id),
  INDEX idx_submission_datetime (submission_datetime)
);
```

### 7.3 Grades Table
```sql
CREATE TABLE grades (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  submission_id INT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  class_course_id INT NOT NULL,
  teacher_id INT NOT NULL,
  assessment_type VARCHAR(50),
  marks_obtained DECIMAL(5, 2) NOT NULL,
  total_marks DECIMAL(5, 2) NOT NULL,
  percentage DECIMAL(5, 2) GENERATED ALWAYS AS (marks_obtained / total_marks * 100) STORED,
  grade_point DECIMAL(3, 1),
  letter_grade VARCHAR(2),
  feedback TEXT,
  rubric_scores JSON,
  graded_date TIMESTAMP,
  is_published BOOLEAN DEFAULT FALSE,
  published_date TIMESTAMP NULL,
  academic_year VARCHAR(9),
  semester INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE SET NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (class_course_id) REFERENCES class_courses(id),
  FOREIGN KEY (teacher_id) REFERENCES users(id),
  INDEX idx_student_course (student_id, course_id),
  INDEX idx_is_published (is_published)
);
```

### 7.4 Grading Scales Table
```sql
CREATE TABLE grading_scales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  college_id INT NOT NULL,
  scale_name VARCHAR(100),
  scale_type ENUM('percentage', 'points') DEFAULT 'percentage',
  description TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (college_id) REFERENCES college_info(id)
);

CREATE TABLE grading_scale_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  scale_id INT NOT NULL,
  letter_grade VARCHAR(2),
  min_percentage DECIMAL(5, 2),
  max_percentage DECIMAL(5, 2),
  grade_point DECIMAL(3, 1),
  description VARCHAR(255),
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (scale_id) REFERENCES grading_scales(id) ON DELETE CASCADE
);
```

### 7.5 Rubrics Table
```sql
CREATE TABLE rubrics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  teacher_id INT NOT NULL,
  rubric_name VARCHAR(255) NOT NULL,
  description TEXT,
  total_points INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

CREATE TABLE rubric_criteria (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  rubric_id INT NOT NULL,
  criterion_name VARCHAR(255),
  description TEXT,
  max_points INT,
  weight INT,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (rubric_id) REFERENCES rubrics(id) ON DELETE CASCADE
);

CREATE TABLE rubric_levels (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  criterion_id INT NOT NULL,
  level_name VARCHAR(50),
  description TEXT,
  points INT,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (criterion_id) REFERENCES rubric_criteria(id) ON DELETE CASCADE
);
```

---

## 8. Financial Management Module

### 8.1 Fee Structures Table
```sql
CREATE TABLE fee_structures (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  college_id INT NOT NULL,
  class_id INT NOT NULL,
  academic_year VARCHAR(9) NOT NULL,
  semester INT,
  
  -- Fee components
  tuition_fee DECIMAL(10, 2) DEFAULT 0,
  lab_fee DECIMAL(10, 2) DEFAULT 0,
  library_fee DECIMAL(10, 2) DEFAULT 0,
  sports_fee DECIMAL(10, 2) DEFAULT 0,
  exam_fee DECIMAL(10, 2) DEFAULT 0,
  technology_fee DECIMAL(10, 2) DEFAULT 0,
  development_fee DECIMAL(10, 2) DEFAULT 0,
  other_fees DECIMAL(10, 2) DEFAULT 0,
  total_fee DECIMAL(10, 2) GENERATED ALWAYS AS (
    tuition_fee + lab_fee + library_fee + sports_fee + 
    exam_fee + technology_fee + development_fee + other_fees
  ) STORED,
  
  -- Payment terms
  payment_method ENUM('full', 'installment') DEFAULT 'full',
  number_of_installments INT DEFAULT 1,
  
  status ENUM('active', 'archived') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_fee_structure (college_id, class_id, academic_year, semester),
  FOREIGN KEY (college_id) REFERENCES college_info(id),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  INDEX idx_academic_year (academic_year)
);
```

### 8.2 Fee Schedules Table
```sql
CREATE TABLE fee_schedules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  fee_structure_id INT NOT NULL,
  installment_number INT,
  amount DECIMAL(10, 2) NOT NULL,
  due_date DATE NOT NULL,
  late_fee_percentage DECIMAL(5, 2) DEFAULT 0,
  grace_period_days INT DEFAULT 0,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_installment (fee_structure_id, installment_number),
  FOREIGN KEY (fee_structure_id) REFERENCES fee_structures(id),
  INDEX idx_due_date (due_date)
);
```

### 8.3 Student Fee Mapping Table
```sql
CREATE TABLE student_fee_mappings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  student_id INT NOT NULL,
  fee_structure_id INT NOT NULL,
  academic_year VARCHAR(9),
  semester INT,
  applied_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_student_fee (student_id, fee_structure_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (fee_structure_id) REFERENCES fee_structures(id)
);
```

### 8.4 Payments Table
```sql
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  student_id INT NOT NULL,
  fee_schedule_id INT,
  amount_paid DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('online', 'check', 'cash', 'bank_transfer', 'card') DEFAULT 'online',
  payment_status ENUM('pending', 'completed', 'failed', 'refunded', 'partial') DEFAULT 'pending',
  transaction_id VARCHAR(100),
  payment_gateway VARCHAR(50),
  payment_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  recorded_by INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (fee_schedule_id) REFERENCES fee_schedules(id),
  FOREIGN KEY (recorded_by) REFERENCES users(id),
  INDEX idx_student_id (student_id),
  INDEX idx_payment_datetime (payment_datetime),
  INDEX idx_status (payment_status)
);
```

### 8.5 Fee Concessions/Waivers Table
```sql
CREATE TABLE fee_concessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  student_id INT NOT NULL,
  fee_structure_id INT NOT NULL,
  concession_type ENUM('scholarship', 'merit', 'need_based', 'financial_hardship', 'reserved_category') DEFAULT 'need_based',
  concession_amount DECIMAL(10, 2) NOT NULL,
  concession_percentage DECIMAL(5, 2),
  reason TEXT,
  supporting_documents_url VARCHAR(500),
  approval_status ENUM('pending', 'approved', 'rejected', 'under_review') DEFAULT 'pending',
  approved_by INT,
  approval_date TIMESTAMP NULL,
  effective_from DATE,
  effective_to DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (fee_structure_id) REFERENCES fee_structures(id),
  FOREIGN KEY (approved_by) REFERENCES users(id),
  INDEX idx_status (approval_status)
);
```

### 8.6 Invoices Table
```sql
CREATE TABLE invoices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  student_id INT NOT NULL,
  fee_schedule_id INT,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  balance_amount DECIMAL(10, 2) GENERATED ALWAYS AS (total_amount - amount_paid) STORED,
  due_date DATE,
  status ENUM('draft', 'issued', 'partial_paid', 'fully_paid', 'overdue', 'cancelled') DEFAULT 'draft',
  issued_date TIMESTAMP,
  issued_by INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_invoice_number (invoice_number),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (fee_schedule_id) REFERENCES fee_schedules(id),
  FOREIGN KEY (issued_by) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_due_date (due_date)
);
```

### 8.7 Receipts Table
```sql
CREATE TABLE receipts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  payment_id INT NOT NULL,
  invoice_id INT,
  receipt_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(10, 2),
  payment_method VARCHAR(50),
  issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  issued_by INT NOT NULL,
  receipt_url VARCHAR(500),
  digital_signature VARCHAR(500),
  qr_code VARCHAR(500),
  download_count INT DEFAULT 0,
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_receipt_number (receipt_number),
  FOREIGN KEY (payment_id) REFERENCES payments(id),
  FOREIGN KEY (invoice_id) REFERENCES invoices(id),
  FOREIGN KEY (issued_by) REFERENCES users(id)
);
```

---

## 9. Communication Module

### 9.1 Announcements Table
```sql
CREATE TABLE announcements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  creator_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  announcement_type ENUM('college_wide', 'department', 'class', 'individual') DEFAULT 'college_wide',
  priority_level ENUM('urgent', 'high', 'normal', 'low') DEFAULT 'normal',
  attachment_url VARCHAR(500),
  target_role VARCHAR(50),
  target_department_id INT,
  target_class_id INT,
  target_user_id INT,
  
  scheduled_date TIMESTAMP NULL,
  is_scheduled BOOLEAN DEFAULT FALSE,
  published_date TIMESTAMP NULL,
  is_published BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (creator_id) REFERENCES users(id),
  FOREIGN KEY (target_department_id) REFERENCES departments(id),
  FOREIGN KEY (target_class_id) REFERENCES classes(id),
  FOREIGN KEY (target_user_id) REFERENCES users(id),
  INDEX idx_published_date (published_date),
  INDEX idx_priority (priority_level)
);
```

### 9.2 Announcement Recipients Table
```sql
CREATE TABLE announcement_recipients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  announcement_id INT NOT NULL,
  recipient_id INT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP NULL,
  read_device VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_announcement_recipient (announcement_id, recipient_id),
  FOREIGN KEY (announcement_id) REFERENCES announcements(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES users(id),
  INDEX idx_is_read (is_read)
);
```

### 9.3 Messages Table
```sql
CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  conversation_id INT,
  sender_id INT NOT NULL,
  recipient_id INT,
  group_id INT,
  subject VARCHAR(255),
  content TEXT NOT NULL,
  message_type ENUM('text', 'file', 'image', 'video', 'system_message') DEFAULT 'text',
  attachment_url VARCHAR(500),
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP NULL,
  
  parent_message_id INT,
  is_edited BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMP NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (recipient_id) REFERENCES users(id),
  FOREIGN KEY (parent_message_id) REFERENCES messages(id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
);
```

### 9.4 Conversations Table
```sql
CREATE TABLE conversations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  initiator_id INT NOT NULL,
  recipient_id INT NOT NULL,
  subject VARCHAR(255),
  last_message_at TIMESTAMP NULL,
  last_message_preview VARCHAR(255),
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_conversation_pair (initiator_id, recipient_id),
  FOREIGN KEY (initiator_id) REFERENCES users(id),
  FOREIGN KEY (recipient_id) REFERENCES users(id),
  INDEX idx_is_archived (is_archived)
);
```

### 9.5 Group Conversations Table
```sql
CREATE TABLE group_conversations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  group_type ENUM('class', 'department', 'study_group', 'project_group', 'custom') DEFAULT 'custom',
  group_name VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id INT NOT NULL,
  class_id INT,
  department_id INT,
  
  max_members INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (creator_id) REFERENCES users(id),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE group_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  group_id INT NOT NULL,
  user_id INT NOT NULL,
  role ENUM('admin', 'moderator', 'member') DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_group_member (group_id, user_id),
  FOREIGN KEY (group_id) REFERENCES group_conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 9.6 Notifications Table
```sql
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  notification_type VARCHAR(50),
  title VARCHAR(255),
  message TEXT NOT NULL,
  action_url VARCHAR(500),
  action_data JSON,
  priority_level ENUM('critical', 'urgent', 'high', 'normal', 'low') DEFAULT 'normal',
  
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP NULL,
  delivery_channels JSON,
  
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at),
  INDEX idx_user_id_read (user_id, is_read)
);
```

### 9.7 Notification Preferences Table
```sql
CREATE TABLE notification_preferences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  user_id INT UNIQUE NOT NULL,
  
  email_enabled BOOLEAN DEFAULT TRUE,
  sms_enabled BOOLEAN DEFAULT FALSE,
  push_enabled BOOLEAN DEFAULT TRUE,
  in_app_enabled BOOLEAN DEFAULT TRUE,
  
  quiet_hours_enabled BOOLEAN DEFAULT FALSE,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  quiet_hours_timezone VARCHAR(50),
  
  notification_types JSON,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 10. System Configuration Module

### 10.1 System Settings Table
```sql
CREATE TABLE system_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value LONGTEXT,
  setting_type ENUM('string', 'integer', 'boolean', 'json', 'decimal') DEFAULT 'string',
  description TEXT,
  is_editable BOOLEAN DEFAULT TRUE,
  updated_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_setting_key (setting_key),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);
```

### 10.2 Email Configuration Table
```sql
CREATE TABLE email_configuration (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  smtp_server VARCHAR(255),
  smtp_port INT,
  smtp_username VARCHAR(255),
  smtp_password VARCHAR(255),
  from_email VARCHAR(255),
  from_name VARCHAR(100),
  use_tls BOOLEAN DEFAULT TRUE,
  use_ssl BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid)
);
```

### 10.3 Payment Gateway Configuration
```sql
CREATE TABLE payment_gateway_config (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  gateway_name VARCHAR(100),
  api_key VARCHAR(500),
  api_secret VARCHAR(500),
  webhook_url VARCHAR(500),
  is_enabled BOOLEAN DEFAULT TRUE,
  is_production BOOLEAN DEFAULT FALSE,
  currencies JSON,
  success_url VARCHAR(500),
  failure_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  UNIQUE KEY uk_gateway_name (gateway_name)
);
```

---

## 11. Audit & Logging Module

### 11.1 Activity Log Table
```sql
CREATE TABLE activity_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  user_id INT,
  action VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id INT,
  resource_name VARCHAR(255),
  old_value LONGTEXT,
  new_value LONGTEXT,
  change_summary VARCHAR(500),
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  affected_users INT,
  status ENUM('success', 'partial', 'failed') DEFAULT 'success',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id_date (user_id, created_at),
  INDEX idx_resource_type (resource_type),
  INDEX idx_action (action),
  INDEX idx_created_at (created_at)
);
```

### 11.2 Error Logs Table
```sql
CREATE TABLE error_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  user_id INT,
  error_type VARCHAR(100),
  error_message TEXT,
  error_stacktrace LONGTEXT,
  endpoint VARCHAR(500),
  request_data JSON,
  response_data JSON,
  http_status_code INT,
  ip_address VARCHAR(45),
  severity ENUM('critical', 'high', 'medium', 'low') DEFAULT 'medium',
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_error_type (error_type),
  INDEX idx_created_at (created_at),
  INDEX idx_severity (severity)
);
```

---

## 12. Documents & Certificates

### 12.1 Documents Table
```sql
CREATE TABLE documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  student_id INT NOT NULL,
  document_type ENUM('certificate', 'transcript', 'bonafide', 'admit_card', 'id_card', 'fee_receipt', 'marksheet', 'other') DEFAULT 'other',
  file_name VARCHAR(255),
  file_url VARCHAR(500),
  file_size_mb DECIMAL(10, 2),
  issue_date DATE,
  expiry_date DATE,
  signature_key VARCHAR(500),
  qr_code VARCHAR(500),
  digital_signature VARCHAR(500),
  is_verified BOOLEAN DEFAULT FALSE,
  verified_by INT,
  verified_at TIMESTAMP NULL,
  download_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (verified_by) REFERENCES users(id),
  INDEX idx_document_type (document_type),
  INDEX idx_issue_date (issue_date)
);
```

### 12.2 Certificate Templates Table
```sql
CREATE TABLE certificate_templates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  college_id INT NOT NULL,
  template_name VARCHAR(255),
  certificate_type ENUM('completion', 'merit', 'participation', 'bonafide', 'conduct', 'custom') DEFAULT 'custom',
  html_template LONGTEXT,
  signature_fields JSON,
  qr_code_field VARCHAR(100),
  custom_fields JSON,
  preview_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_uuid (uuid),
  FOREIGN KEY (college_id) REFERENCES college_info(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);
```

---

## Indexing Strategy

```sql
-- Add these indexes for better performance
CREATE INDEX idx_user_email_status ON users(email, status);
CREATE INDEX idx_student_class_id ON students(class_id, status);
CREATE INDEX idx_teacher_department_id ON teachers(department_id, status);
CREATE INDEX idx_class_course_semester ON class_courses(class_id, semester);
CREATE INDEX idx_grade_student_semester ON grades(student_id, semester);
CREATE INDEX idx_attendance_date_class ON attendance_records(attendance_date, class_id);
CREATE INDEX idx_payment_student_date ON payments(student_id, payment_datetime);
CREATE INDEX idx_notification_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_announcement_published ON announcements(is_published, published_date);
CREATE INDEX idx_activity_user_action ON activity_logs(user_id, action, created_at);
```

---

## Relationships Summary

```
┌─────────────────────────────────────────────────────┐
│           DATABASE RELATIONSHIPS OVERVIEW            │
├─────────────────────────────────────────────────────┤
│ users (1) ──── (M) user_roles                       │
│ users (1) ──── (M) students                         │
│ users (1) ──── (M) teachers                         │
│ colleges (1) ──── (M) departments                   │
│ departments (1) ──── (M) classes                    │
│ departments (1) ──── (M) courses                    │
│ classes (1) ──── (M) students                       │
│ classes (1) ──── (M) class_courses                  │
│ courses (1) ──── (M) class_courses                  │
│ teachers (1) ──── (M) class_courses                 │
│ class_courses (1) ──── (M) assignments              │
│ assignments (1) ──── (M) submissions                │
│ submissions (1) ──── (M) grades                     │
│ students (1) ──── (M) submissions                   │
│ classes (1) ──── (M) attendance_records             │
│ fee_structures (1) ──── (M) fee_schedules           │
│ students (1) ──── (M) payments                      │
│ users (1) ──── (M) announcements                    │
│ announcements (1) ──── (M) announcement_recipients  │
│ users (1) ──── (M) messages                         │
│ users (1) ──── (M) notifications                    │
└─────────────────────────────────────────────────────┘
```

---

## Migration Strategy

Run migrations in this order:
1. Core tables (users, roles, permissions)
2. Organizational structure (college, departments, classes)
3. Academic tables (courses, timetables)
4. Student/Teacher tables
5. Academic tracking (attendance, assignments, grades)
6. Financial tables
7. Communication tables
8. Configuration and logging tables

---

**Last Updated:** November 2025  
**Status:** Production-Ready Schema  
**Version:** 1.0
