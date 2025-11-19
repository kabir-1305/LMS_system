import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import ThemeToggle from '../components/common/ThemeToggle';
import DashboardCard from '../components/common/DashboardCard';
import { AuthContext } from '../context/AuthContext';
import TeacherAnnouncements from './TeacherAnnouncements';

// Teacher Dashboard Components
const TeacherOverview = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [greeting, setGreeting] = useState('');
  
  // Mock data
  const totalStudents = 120;
  const averageAttendance = 82;
  const pendingAssessments = 5;
  const upcomingClasses = 3;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const todayClasses = [
    { class: 'Mathematics - Class 10A', students: 30, time: '9:00 AM - 10:30 AM', room: 'Room 101', color: 'blue' },
    { class: 'Mathematics - Class 11B', students: 25, time: '11:00 AM - 12:30 PM', room: 'Room 203', color: 'purple' },
    { class: 'Mathematics - Class 12C', students: 28, time: '2:00 PM - 3:30 PM', room: 'Room 105', color: 'green' }
  ];

  const submissions = [
    { title: 'Calculus Problem Set', submitted: 15, total: 25, daysAgo: 2, percentage: 60 },
    { title: 'Algebra Fundamentals Quiz', submitted: 25, total: 25, daysAgo: 7, percentage: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Modern Header with Gradient */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <div className="text-center md:text-left">
              <p className="inline-block text-lg font-semibold text-primary-100 bg-white/10 px-3 py-1 rounded-full">{greeting}</p>
              <h2 className="text-4xl font-extrabold mt-3">{currentUser?.name || 'Teacher'}!</h2>
              <p className="mt-2 text-sm opacity-85">Mathematics Department</p>
            </div>
            <div className="text-center md:text-right">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl inline-block">
                <p className="text-xs opacity-80">Today's Date</p>
                <p className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Students" 
          value={totalStudents} 
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          onClick={() => navigate('/teacher-dashboard/students')}
        />
        
        <DashboardCard 
          title="Average Attendance" 
          value={`${averageAttendance}%`} 
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          onClick={() => navigate('/teacher-dashboard/attendance')}
        />
        
        <DashboardCard 
          title="Pending Assessments" 
          value={pendingAssessments} 
          color="yellow"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          onClick={() => navigate('/teacher-dashboard/assessments')}
        />
        
        <DashboardCard 
          title="Today's Classes" 
          value={upcomingClasses} 
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          onClick={() => navigate('/teacher-dashboard/timetable')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule - 2 columns */}
        <div className="lg:col-span-2">
          <div className="card shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Today's Classes
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {upcomingClasses} Classes
              </span>
            </div>
            <div className="space-y-3">
              {todayClasses.map((cls, idx) => (
                <div key={idx} className="group relative overflow-hidden bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${cls.color}-500`}></div>
                  <div className="flex justify-between items-center ml-3">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white">{cls.class}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cls.students} Students</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">{cls.time}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-end gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {cls.room}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Submissions - 1 column */}
        <div>
          <div className="card shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Recent Submissions
            </h3>
            <div className="space-y-4">
              {submissions.map((sub, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{sub.title}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{sub.daysAgo}d ago</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {sub.submitted}/{sub.total} students submitted
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${sub.percentage === 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${sub.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Mark Attendance', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'green', path: '/teacher-dashboard/attendance' },
            { name: 'Grade Assignments', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', color: 'blue', path: '/teacher-dashboard/assessments' },
            { name: 'View Students', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'purple', path: '/teacher-dashboard/students' },
            { name: 'Schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'orange', path: '/teacher-dashboard/timetable' }
          ].map((action, idx) => (
            <button 
              key={idx} 
              onClick={() => navigate(action.path)}
              className={`p-6 bg-${action.color}-50 dark:bg-${action.color}-900/20 border-2 border-${action.color}-200 dark:border-${action.color}-800 rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group`}
            >
              <svg className={`w-8 h-8 text-${action.color}-600 dark:text-${action.color}-400 mx-auto mb-3 group-hover:scale-110 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{action.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const students = [
    { id: 1, name: 'Aarav Patel', rollNo: '10A01', present: true },
    { id: 2, name: 'Priya Gupta', rollNo: '10A02', present: true },
    { id: 3, name: 'Arjun Singh', rollNo: '10A03', present: false },
    { id: 4, name: 'Ananya Reddy', rollNo: '10A04', present: true },
    { id: 5, name: 'Rohan Sharma', rollNo: '10A05', present: true },
    { id: 6, name: 'Diya Verma', rollNo: '10A06', present: true },
    { id: 7, name: 'Aditya Kumar', rollNo: '10A07', present: false },
    { id: 8, name: 'Kavya Iyer', rollNo: '10A08', present: true },
  ];
  
  const [attendance, setAttendance] = useState(students);
  
  const toggleAttendance = (id) => {
    setAttendance(attendance.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };
  
  const markAllPresent = () => {
    setAttendance(attendance.map(student => ({ ...student, present: true })));
  };
  
  const markAllAbsent = () => {
    setAttendance(attendance.map(student => ({ ...student, present: false })));
  };
  
  const saveAttendance = () => {
    alert('Attendance saved successfully!');
  };

  const presentCount = attendance.filter(s => s.present).length;
  const attendancePercentage = Math.round((presentCount / attendance.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Mark Attendance</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Record student attendance for your classes</p>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Students</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-1">{attendance.length}</p>
            </div>
            <div className="w-14 h-14 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Present</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">{presentCount}</p>
            </div>
            <div className="w-14 h-14 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Attendance %</p>
              <p className="text-3xl font-bold text-purple-700 dark:text-purple-300 mt-1">{attendancePercentage}%</p>
            </div>
            <div className="w-14 h-14 bg-purple-500 dark:bg-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Controls */}
      <div className="card shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="class" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Select Class
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input-field"
            >
              <option value="10A">Class 10A - Mathematics</option>
              <option value="11B">Class 11B - Mathematics</option>
              <option value="12C">Class 12C - Mathematics</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex items-end gap-2">
            <button onClick={markAllPresent} className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium text-sm">
              All Present
            </button>
            <button onClick={markAllAbsent} className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium text-sm">
              All Absent
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {attendance.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">{student.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => toggleAttendance(student.id)}
                      className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        student.present 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/60' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60'
                      }`}
                    >
                      {student.present ? '✓ Present' : '✗ Absent'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button onClick={saveAttendance} className="px-8 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 font-semibold">
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

// Customizable Dashboard Component
const CustomizableDashboard = () => {
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem('teacherDashboardWidgets');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState(null);
  const [resizingWidget, setResizingWidget] = useState(null);
  const [linkingMode, setLinkingMode] = useState(false);
  const [selectedForLink, setSelectedForLink] = useState(null);
  const [widgetLinks, setWidgetLinks] = useState(() => {
    const saved = localStorage.getItem('teacherDashboardLinks');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock student data
  const students = [
    { id: 1, name: 'Aarav Patel', rollNo: '10A01', attendance: '92%', grade: 'A+', marks: 95, subject: 'Mathematics' },
    { id: 2, name: 'Priya Gupta', rollNo: '10A02', attendance: '88%', grade: 'A', marks: 88, subject: 'Mathematics' },
    { id: 3, name: 'Arjun Singh', rollNo: '10A03', attendance: '75%', grade: 'B+', marks: 78, subject: 'Mathematics' },
    { id: 4, name: 'Ananya Reddy', rollNo: '10A04', attendance: '95%', grade: 'A+', marks: 97, subject: 'Mathematics' },
    { id: 5, name: 'Rohan Sharma', rollNo: '10A05', attendance: '82%', grade: 'B', marks: 82, subject: 'Mathematics' },
  ];

  useEffect(() => {
    localStorage.setItem('teacherDashboardWidgets', JSON.stringify(widgets));
  }, [widgets]);

  useEffect(() => {
    localStorage.setItem('teacherDashboardLinks', JSON.stringify(widgetLinks));
  }, [widgetLinks]);

  const availableWidgets = [
    {
      id: 'attendance-quick',
      type: 'attendance-quick',
      title: 'Quick Attendance',
      description: 'Mark attendance quickly',
      icon: '✓',
      color: 'green'
    },
    {
      id: 'student-grades',
      type: 'student-grades',
      title: 'Student Grades',
      description: 'View and add grades',
      icon: '📊',
      color: 'blue'
    },
    {
      id: 'add-marks',
      type: 'add-marks',
      title: 'Add Marks',
      description: 'Enter student marks',
      icon: '✏️',
      color: 'purple'
    },
    {
      id: 'class-schedule',
      type: 'class-schedule',
      title: 'Class Schedule',
      description: 'Today\'s classes',
      icon: '📅',
      color: 'orange'
    },
    {
      id: 'recent-submissions',
      type: 'recent-submissions',
      title: 'Recent Submissions',
      description: 'Assignment submissions',
      icon: '📝',
      color: 'pink'
    },
    {
      id: 'student-list',
      type: 'student-list',
      title: 'Student List',
      description: 'Quick student view',
      icon: '👥',
      color: 'indigo'
    },
    {
      id: 'notes',
      type: 'notes',
      title: 'Quick Notes',
      description: 'Personal notes',
      icon: '📌',
      color: 'yellow'
    },
    {
      id: 'analytics',
      type: 'analytics',
      title: 'Analytics',
      description: 'Class performance',
      icon: '📈',
      color: 'teal'
    }
  ];

  const addWidget = (widgetType) => {
    const widgetTemplate = availableWidgets.find(w => w.type === widgetType);
    const newWidget = {
      id: `${widgetType}-${Date.now()}`,
      type: widgetType,
      title: widgetTemplate.title,
      color: widgetTemplate.color,
      position: { x: 0, y: widgets.length * 350 },
      size: { width: 400, height: 300 }
    };
    setWidgets([...widgets, newWidget]);
    setShowAddMenu(false);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter(w => w.id !== id));
    // Remove any links associated with this widget
    setWidgetLinks(widgetLinks.filter(link => link.from !== id && link.to !== id));
  };

  const handleWidgetClick = (widgetId) => {
    if (!linkingMode) return;
    
    if (!selectedForLink) {
      setSelectedForLink(widgetId);
    } else {
      if (selectedForLink !== widgetId) {
        // Create link if it doesn't exist
        const linkExists = widgetLinks.some(
          link => (link.from === selectedForLink && link.to === widgetId) || 
                  (link.from === widgetId && link.to === selectedForLink)
        );
        
        if (!linkExists) {
          setWidgetLinks([...widgetLinks, { from: selectedForLink, to: widgetId }]);
        }
      }
      setSelectedForLink(null);
      setLinkingMode(false);
    }
  };

  const removeLink = (from, to) => {
    setWidgetLinks(widgetLinks.filter(link => 
      !(link.from === from && link.to === to) && !(link.from === to && link.to === from)
    ));
  };

  const getLinkedWidgets = (widgetId) => {
    const linked = [];
    widgetLinks.forEach(link => {
      if (link.from === widgetId) linked.push(link.to);
      if (link.to === widgetId) linked.push(link.from);
    });
    return linked;
  };

  const isWidgetLinked = (widgetId, otherWidgetId) => {
    return widgetLinks.some(
      link => (link.from === widgetId && link.to === otherWidgetId) || 
              (link.from === otherWidgetId && link.to === widgetId)
    );
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleDragStart = (e, widget) => {
    setDraggedWidget(widget);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedWidget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setWidgets(widgets.map(w => 
        w.id === draggedWidget.id 
          ? { ...w, position: { x: Math.max(0, x - 200), y: Math.max(0, y - 20) } }
          : w
      ));
      setDraggedWidget(null);
    }
  };

  const handleResize = (widgetId, newSize) => {
    setWidgets(widgets.map(w => 
      w.id === widgetId 
        ? { ...w, size: newSize }
        : w
    ));
  };

  const renderWidgetContent = (widget) => {
    const isLinked = getLinkedWidgets(widget.id).length > 0;
    
    switch (widget.type) {
      case 'attendance-quick':
        return (
          <div className="p-4 h-full overflow-auto">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
              Quick Attendance
              {isLinked && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Linked</span>}
            </h4>
            {selectedStudent && isLinked ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 p-3 rounded-lg mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{selectedStudent.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{selectedStudent.rollNo}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Attendance: </span>
                  <span className="font-bold text-green-600">{selectedStudent.attendance}</span>
                </div>
              </div>
            ) : (
              <select className="input-field mb-3 text-sm">
                <option>Class 10A</option>
                <option>Class 11B</option>
                <option>Class 12C</option>
              </select>
            )}
            <div className="space-y-2">
              {students.slice(0, 3).map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className={`w-full flex justify-between text-sm p-2 rounded transition-colors ${
                    selectedStudent?.id === student.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className={selectedStudent?.id === student.id ? 'text-white' : 'text-gray-800 dark:text-white'}>{student.name}</span>
                  <span className={`font-bold ${selectedStudent?.id === student.id ? 'text-white' : 'text-green-600'}`}>{student.attendance}</span>
                </button>
              ))}
            </div>
            <button className="btn-primary w-full mt-3 text-sm">Mark Attendance</button>
          </div>
        );
      
      case 'student-grades':
        return (
          <div className="p-4 h-full overflow-auto">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
              Student Grades
              {isLinked && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Linked</span>}
            </h4>
            {selectedStudent && isLinked ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{selectedStudent.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{selectedStudent.rollNo}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Grade</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedStudent.grade}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Marks</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedStudent.marks}/100</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {students.slice(0, 3).map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    className={`w-full flex justify-between items-center p-2 rounded transition-colors ${
                      selectedStudent?.id === student.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className={`text-sm ${selectedStudent?.id === student.id ? 'text-white' : 'text-gray-800 dark:text-white'}`}>{student.name}</span>
                    <span className={`font-bold ${selectedStudent?.id === student.id ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>{student.grade}</span>
                  </button>
                ))}
                <button className="btn-secondary w-full mt-3 text-sm">View All Grades</button>
              </div>
            )}
          </div>
        );
      
      case 'add-marks':
        return (
          <div className="p-4 h-full overflow-auto">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
              Add Marks
              {isLinked && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Linked</span>}
            </h4>
            {selectedStudent && isLinked ? (
              <div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 p-3 rounded-lg mb-3">
                  <p className="font-bold text-gray-900 dark:text-white">{selectedStudent.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{selectedStudent.rollNo}</p>
                </div>
                <input type="text" value={selectedStudent.subject} readOnly className="input-field mb-2 text-sm" />
                <input type="number" placeholder="Marks" className="input-field mb-2 text-sm" defaultValue={selectedStudent.marks} />
                <input type="number" placeholder="Total Marks" className="input-field mb-2 text-sm" defaultValue="100" />
                <button className="btn-primary w-full text-sm">Update Marks</button>
              </div>
            ) : (
              <div>
                <input type="text" placeholder="Student Name" className="input-field mb-2 text-sm" />
                <input type="text" placeholder="Subject" className="input-field mb-2 text-sm" />
                <input type="number" placeholder="Marks" className="input-field mb-2 text-sm" />
                <input type="number" placeholder="Total Marks" className="input-field mb-2 text-sm" />
                <button className="btn-primary w-full text-sm">Submit Marks</button>
              </div>
            )}
          </div>
        );
      
      case 'class-schedule':
        return (
          <div className="p-4 h-full overflow-auto">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Today's Schedule</h4>
            <div className="space-y-2">
              {[
                { time: '9:00 AM', class: 'Math 10A' },
                { time: '11:00 AM', class: 'Math 11B' },
                { time: '2:00 PM', class: 'Math 12C' }
              ].map((cls, i) => (
                <div key={i} className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 rounded-lg">
                  <div className="text-xs text-orange-600 dark:text-orange-400">{cls.time}</div>
                  <div className="font-semibold text-sm text-gray-800 dark:text-white">{cls.class}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'recent-submissions':
        return (
          <div className="p-4 h-full overflow-auto">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Recent Submissions</h4>
            <div className="space-y-2">
              {[
                { title: 'Calculus Quiz', count: '15/25' },
                { title: 'Algebra Test', count: '25/25' }
              ].map((sub, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-800 dark:text-white">{sub.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{sub.count} submitted</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'student-list':
        return (
          <div className="p-4 h-full overflow-auto">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
              Student List
              {isLinked && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Linked</span>}
            </h4>
            {selectedStudent && isLinked && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 p-3 rounded-lg mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{selectedStudent.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{selectedStudent.rollNo}</p>
                  </div>
                </div>
              </div>
            )}
            <input type="text" placeholder="Search students..." className="input-field mb-3 text-sm" />
            <div className="space-y-2">
              {students.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className={`w-full flex items-center gap-2 p-2 rounded transition-colors ${
                    selectedStudent?.id === student.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${selectedStudent?.id === student.id ? 'bg-white/20' : 'bg-indigo-500'} flex items-center justify-center ${selectedStudent?.id === student.id ? 'text-white' : 'text-white'} text-xs font-bold`}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className={`text-sm flex-1 text-left ${selectedStudent?.id === student.id ? 'text-white' : 'text-gray-800 dark:text-white'}`}>{student.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'notes':
        return (
          <div className="p-4 h-full overflow-auto">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Quick Notes</h4>
            <textarea 
              className="input-field h-32 text-sm resize-none" 
              placeholder="Write your notes here..."
              defaultValue="Remember to check homework submissions..."
            />
            <button className="btn-secondary w-full mt-3 text-sm">Save Note</button>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="p-4 h-full overflow-auto">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Class Analytics</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Avg. Attendance</span>
                  <span className="font-bold text-teal-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Avg. Performance</span>
                  <span className="font-bold text-teal-600">78%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="p-4">Widget content</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Customizable Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {linkingMode ? '🔗 Click on two widgets to link them' : 'Create your personalized workspace'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setLinkingMode(!linkingMode);
              setSelectedForLink(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold ${
              linkingMode 
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {linkingMode ? 'Cancel Linking' : 'Link Widgets'}
          </button>
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Widget
          </button>
        </div>
      </div>

      {/* Add Widget Menu */}
      {showAddMenu && (
        <div className="mb-6 card shadow-2xl border-2 border-primary-200 dark:border-primary-800">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Select a Widget</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableWidgets.map((widget) => (
              <button
                key={widget.id}
                onClick={() => addWidget(widget.type)}
                className={`p-4 bg-${widget.color}-50 dark:bg-${widget.color}-900/20 border-2 border-${widget.color}-200 dark:border-${widget.color}-800 rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-left`}
              >
                <div className="text-3xl mb-2">{widget.icon}</div>
                <div className="font-semibold text-sm text-gray-800 dark:text-white">{widget.title}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{widget.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Widgets Area */}
      {widgets.length === 0 ? (
        <div className="card text-center py-20">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your Dashboard is Empty</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Click "Add Widget" to start customizing your dashboard</p>
          <button
            onClick={() => setShowAddMenu(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Your First Widget
          </button>
        </div>
      ) : (
        <div
          className="relative min-h-screen border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 p-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* SVG Layer for Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            {widgetLinks.map((link, idx) => {
              const fromWidget = widgets.find(w => w.id === link.from);
              const toWidget = widgets.find(w => w.id === link.to);
              if (!fromWidget || !toWidget) return null;
              
              const fromX = fromWidget.position.x + fromWidget.size.width / 2;
              const fromY = fromWidget.position.y + fromWidget.size.height / 2;
              const toX = toWidget.position.x + toWidget.size.width / 2;
              const toY = toWidget.position.y + toWidget.size.height / 2;
              
              return (
                <g key={idx}>
                  <line
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="8,4"
                    className="animate-pulse"
                  />
                  <circle cx={fromX} cy={fromY} r="6" fill="#3b82f6" />
                  <circle cx={toX} cy={toY} r="6" fill="#3b82f6" />
                </g>
              );
            })}
          </svg>

          {widgets.map((widget) => {
            const linkedWidgets = getLinkedWidgets(widget.id);
            const isSelected = selectedForLink === widget.id;
            
            return (
            <div
              key={widget.id}
              draggable={!linkingMode}
              onDragStart={(e) => !linkingMode && handleDragStart(e, widget)}
              onClick={() => handleWidgetClick(widget.id)}
              style={{
                position: 'absolute',
                left: widget.position.x,
                top: widget.position.y,
                width: widget.size.width,
                height: widget.size.height,
                minWidth: '250px',
                minHeight: '200px',
                maxWidth: '800px',
                maxHeight: '600px'
              }}
              className={`card shadow-lg hover:shadow-xl transition-all border-l-4 border-${widget.color}-500 group ${
                linkingMode ? 'cursor-pointer' : 'cursor-move'
              } ${isSelected ? 'ring-4 ring-orange-500' : ''} ${linkedWidgets.length > 0 ? 'ring-2 ring-blue-400' : ''}`}
            >
              {/* Widget Header */}
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`font-bold text-${widget.color}-600 dark:text-${widget.color}-400 flex items-center gap-2`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  {widget.title}
                  {linkedWidgets.length > 0 && (
                    <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full">{linkedWidgets.length}</span>
                  )}
                </h3>
                <div className="flex gap-1">
                  {linkedWidgets.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        linkedWidgets.forEach(linkedId => removeLink(widget.id, linkedId));
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded"
                      title="Unlink all"
                    >
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWidget(widget.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                  >
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Widget Content */}
              <div className="overflow-auto" style={{ height: 'calc(100% - 50px)' }}>
                {renderWidgetContent(widget)}
              </div>

              {/* Resize Handle */}
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-50 hover:opacity-100"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startWidth = widget.size.width;
                  const startHeight = widget.size.height;

                  const handleMouseMove = (moveEvent) => {
                    const newWidth = Math.max(250, Math.min(800, startWidth + (moveEvent.clientX - startX)));
                    const newHeight = Math.max(200, Math.min(600, startHeight + (moveEvent.clientY - startY)));
                    handleResize(widget.id, { width: newWidth, height: newHeight });
                  };

                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };

                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Online Class Meeting Component
const OnlineClassMeeting = () => {
  const { currentUser } = useContext(AuthContext);
  const [meetingActive, setMeetingActive] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [participants, setParticipants] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [shareScreen, setShareScreen] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const classes = [
    { id: 1, name: 'Mathematics - Class 10A', students: 30 },
    { id: 2, name: 'Mathematics - Class 11B', students: 25 },
    { id: 3, name: 'Mathematics - Class 12C', students: 28 }
  ];

  const startMeeting = () => {
    if (!selectedClass) {
      alert('Please select a class first');
      return;
    }
    
    const link = `https://meet.college.edu/${Date.now()}`;
    setMeetingLink(link);
    setMeetingActive(true);
    
    // Simulate some students joining
    setTimeout(() => {
      setParticipants([
        { id: 1, name: 'Aarav Patel', joined: true, mic: true, camera: true },
        { id: 2, name: 'Priya Gupta', joined: true, mic: true, camera: false },
        { id: 3, name: 'Arjun Singh', joined: true, mic: false, camera: true },
      ]);
    }, 2000);
  };

  const endMeeting = () => {
    if (window.confirm('Are you sure you want to end the meeting for all participants?')) {
      setMeetingActive(false);
      setParticipants([]);
      setChatMessages([]);
      setMeetingLink('');
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: Date.now(),
        sender: currentUser?.name || 'Teacher',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink);
    alert('Meeting link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Online Class Meeting</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Conduct live classes with your students</p>
      </div>

      {!meetingActive ? (
        /* Meeting Setup */
        <div className="max-w-2xl mx-auto">
          <div className="card shadow-xl">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Start Your Online Class</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Select a class and begin your live session</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Select Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="input-field"
                >
                  <option value="">Choose a class...</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.name}>{cls.name} ({cls.students} students)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <button
                    onClick={() => setMicEnabled(!micEnabled)}
                    className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      micEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                    } text-white transition-colors`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {micEnabled ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      )}
                    </svg>
                  </button>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{micEnabled ? 'Mic On' : 'Mic Off'}</p>
                </div>

                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <button
                    onClick={() => setCameraEnabled(!cameraEnabled)}
                    className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      cameraEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                    } text-white transition-colors`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {cameraEnabled ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      )}
                    </svg>
                  </button>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cameraEnabled ? 'Camera On' : 'Camera Off'}</p>
                </div>

                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <button
                    onClick={() => setShareScreen(!shareScreen)}
                    className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      shareScreen ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'
                    } text-white transition-colors`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Share Screen</p>
                </div>
              </div>

              <button
                onClick={startMeeting}
                disabled={!selectedClass}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Meeting
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Active Meeting */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video Display */}
            <div className="card bg-gray-900 aspect-video relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {cameraEnabled ? (
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">{currentUser?.name?.charAt(0) || 'T'}</span>
                    </div>
                    <p className="text-white text-xl font-semibold">{currentUser?.name || 'Teacher'} (You)</p>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <p className="text-lg">Camera is off</p>
                  </div>
                )}
              </div>
              
              {/* Meeting Info Overlay */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-white text-sm font-medium">{selectedClass}</p>
                <p className="text-white/80 text-xs">{participants.length} participants</p>
              </div>

              {/* Recording Indicator */}
              <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-semibold">LIVE</span>
              </div>
            </div>

            {/* Controls */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={() => setMicEnabled(!micEnabled)}
                    className={`p-4 rounded-xl ${
                      micEnabled ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                    } transition-colors`}
                    title={micEnabled ? 'Mute' : 'Unmute'}
                  >
                    <svg className={`w-6 h-6 ${micEnabled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {micEnabled ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      )}
                    </svg>
                  </button>

                  <button
                    onClick={() => setCameraEnabled(!cameraEnabled)}
                    className={`p-4 rounded-xl ${
                      cameraEnabled ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                    } transition-colors`}
                    title={cameraEnabled ? 'Turn off camera' : 'Turn on camera'}
                  >
                    <svg className={`w-6 h-6 ${cameraEnabled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setShareScreen(!shareScreen)}
                    className={`p-4 rounded-xl ${
                      shareScreen ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                    } transition-colors`}
                    title="Share screen"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>

                  <button
                    onClick={copyMeetingLink}
                    className="p-4 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    title="Copy meeting link"
                  >
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={endMeeting}
                  className="px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  End Meeting
                </button>
              </div>
            </div>

            {/* Meeting Link */}
            <div className="card bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">Meeting Link</p>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1 font-mono">{meetingLink}</p>
                </div>
                <button
                  onClick={copyMeetingLink}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Participants & Chat */}
          <div className="space-y-4">
            {/* Participants */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Participants ({participants.length + 1})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {/* Host */}
                <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    {currentUser?.name?.charAt(0) || 'T'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{currentUser?.name || 'Teacher'} (Host)</p>
                  </div>
                  <div className="flex gap-1">
                    <span className={`w-4 h-4 ${micEnabled ? 'text-green-500' : 'text-red-500'}`}>
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Participants */}
                {participants.map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-bold">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                    </div>
                    <div className="flex gap-1">
                      <span className={`w-4 h-4 ${p.mic ? 'text-green-500' : 'text-gray-400'}`}>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                        </svg>
                      </span>
                      <span className={`w-4 h-4 ${p.camera ? 'text-green-500' : 'text-gray-400'}`}>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="card flex flex-col" style={{ height: '400px' }}>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat
              </h3>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {chatMessages.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">No messages yet</p>
                ) : (
                  chatMessages.map(msg => (
                    <div key={msg.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{msg.sender}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="input-field flex-1 text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { currentUser } = useContext(AuthContext);

  const menuItems = [
    {
      name: 'Overview',
      path: '/teacher-dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      name: 'Dashboard',
      path: '/teacher-dashboard/custom-dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      name: 'Online Class',
      path: '/teacher-dashboard/meeting',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      ),
    },
    {
      name: 'Students',
      path: '/teacher-dashboard/students',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      name: 'Attendance',
      path: '/teacher-dashboard/attendance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Assessments',
      path: '/teacher-dashboard/assessments',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Timetable',
      path: '/teacher-dashboard/timetable',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Announcements',
      path: '/teacher-dashboard/announcements',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.757 15.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM4 10a1 1 0 01-1-1V8a1 1 0 012 0v1a1 1 0 01-1 1zM5.757 4.343a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM12 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {isSidebarOpen && (
        <Sidebar menuItems={menuItems} />
      )}
      
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out`}>
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <ThemeToggle />
              <div className="ml-4 relative">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-white">{currentUser?.name || 'Teacher'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{currentUser?.role || 'Teacher'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<TeacherOverview />} />
            <Route path="/custom-dashboard" element={<CustomizableDashboard />} />
            <Route path="/meeting" element={<OnlineClassMeeting />} />
            <Route path="/attendance" element={<TeacherAttendance />} />
            <Route path="/announcements" element={<TeacherAnnouncements />} />
            <Route path="*" element={<div className="text-center text-lg mt-8">Page under construction 🚧</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
