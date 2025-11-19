import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/common/Sidebar';
import DashboardCard from '../components/common/DashboardCard';
import ThemeToggle from '../components/common/ThemeToggle';

// Admin Overview Component
const AdminOverview = () => {
  const { currentUser } = useContext(AuthContext);
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Mock data for dashboard
  const collegeStats = {
    totalStudents: 2480,
    totalFaculty: 120,
    totalDepartments: 12,
    pendingRequests: 15
  };

  const recentActivities = [
    { time: '2 hours ago', event: 'New faculty onboarded', department: 'Computer Science', type: 'success' },
    { time: '5 hours ago', event: 'Fee structure updated', department: 'All Departments', type: 'info' },
    { time: '1 day ago', event: 'New course added', department: 'Electrical Engineering', type: 'success' },
    { time: '2 days ago', event: 'System maintenance completed', department: 'IT Department', type: 'warning' }
  ];

  const departmentPerformance = [
    { name: 'Computer Science', students: 450, faculty: 24, avgGrade: 8.5, color: 'blue' },
    { name: 'Electrical Engineering', students: 380, faculty: 20, avgGrade: 8.2, color: 'green' },
    { name: 'Mechanical Engineering', students: 420, faculty: 22, avgGrade: 8.0, color: 'purple' },
    { name: 'Civil Engineering', students: 350, faculty: 18, avgGrade: 7.8, color: 'orange' }
  ];

  return (
    <div className="space-y-6">
      {/* Modern Header with Gradient */}
      <div className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <div className="text-center md:text-left">
              <p className="inline-block text-lg font-semibold text-primary-100 bg-white/10 px-3 py-1 rounded-full">{greeting}</p>
              <h2 className="text-4xl font-extrabold mt-3">System Administrator</h2>
              <p className="mt-2 text-sm opacity-85">College Management Portal</p>
            </div>
            <div className="text-center md:text-right">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl inline-block">
                <p className="text-xs opacity-80">Active Users</p>
                <p className="text-2xl font-bold">2,600</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Students" 
          value={collegeStats.totalStudents} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          } 
          color="blue" 
        />
        <DashboardCard 
          title="Total Faculty" 
          value={collegeStats.totalFaculty} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          } 
          color="green" 
        />
        <DashboardCard 
          title="Departments" 
          value={collegeStats.totalDepartments} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          } 
          color="purple" 
        />
        <DashboardCard 
          title="Pending Requests" 
          value={collegeStats.pendingRequests} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          } 
          color="red" 
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance - 2 columns */}
        <div className="lg:col-span-2">
          <div className="card shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Department Performance
            </h2>
            <div className="space-y-4">
              {departmentPerformance.map((dept, idx) => (
                <div key={idx} className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{dept.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {dept.students} Students
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {dept.faculty} Faculty
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Avg Grade</p>
                      <p className={`text-3xl font-bold text-${dept.color}-600 dark:text-${dept.color}-400`}>{dept.avgGrade}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-${dept.color}-500 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(dept.avgGrade / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities - 1 column */}
        <div>
          <div className="card shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Activities
            </h2>
            <div className="space-y-3">
              {recentActivities.map((item, index) => (
                <div key={index} className={`p-4 rounded-xl border-l-4 ${
                  item.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' :
                  item.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                  'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.event}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{item.department}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* College Overview */}
      <div className="card shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          College Metrics Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Student Enrollment', value: 85, color: 'blue' },
            { label: 'Faculty Retention', value: 92, color: 'green' },
            { label: 'Budget Utilization', value: 78, color: 'yellow' },
            { label: 'Infrastructure Development', value: 65, color: 'purple' }
          ].map((metric, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{metric.label}</span>
                <span className={`text-sm font-bold text-${metric.color}-600 dark:text-${metric.color}-400`}>{metric.value}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
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
            { name: 'Add User', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'blue' },
            { name: 'Generate Report', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'green' },
            { name: 'Manage Courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'purple' },
            { name: 'System Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', color: 'orange' }
          ].map((action, idx) => (
            <button key={idx} className={`p-6 bg-${action.color}-50 dark:bg-${action.color}-900/20 border-2 border-${action.color}-200 dark:border-${action.color}-800 rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group`}>
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

// Department Management - Comprehensive System
const DepartmentManagement = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('collegeDepartments');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Computer Science & Engineering',
        shortName: 'CSE',
        hodId: null,
        hodName: '',
        icon: '💻',
        color: 'blue',
        classes: []
      }
    ];
  });
  const [showCreateDept, setShowCreateDept] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [showManageDept, setShowManageDept] = useState(false);

  // Available teachers and HODs
  const [availableTeachers] = useState([
    { id: 1, name: 'Prof. Rajesh Kumar', subject: 'Mathematics', department: null },
    { id: 2, name: 'Prof. Priya Sharma', subject: 'Computer Science', department: null },
    { id: 3, name: 'Prof. Amit Verma', subject: 'Physics', department: null },
    { id: 4, name: 'Prof. Kavita Singh', subject: 'English', department: null },
    { id: 5, name: 'Prof. Suresh Patel', subject: 'Chemistry', department: null }
  ]);

  const [availableHODs] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', qualification: 'PhD Computer Science' },
    { id: 2, name: 'Dr. Michael Chen', qualification: 'PhD Electrical Engineering' },
    { id: 3, name: 'Dr. Robert Williams', qualification: 'PhD Mechanical Engineering' },
    { id: 4, name: 'Dr. Emily Davis', qualification: 'PhD Civil Engineering' }
  ]);

  const [availableStudents] = useState([
    { id: 1, name: 'Aarav Patel', rollNo: '10A01', class: null },
    { id: 2, name: 'Priya Gupta', rollNo: '10A02', class: null },
    { id: 3, name: 'Arjun Singh', rollNo: '10A03', class: null },
    { id: 4, name: 'Ananya Reddy', rollNo: '10A04', class: null },
    { id: 5, name: 'Rohan Sharma', rollNo: '10A05', class: null },
    { id: 6, name: 'Diya Verma', rollNo: '10A06', class: null },
    { id: 7, name: 'Aditya Kumar', rollNo: '10A07', class: null },
    { id: 8, name: 'Kavya Iyer', rollNo: '10A08', class: null }
  ]);

  useEffect(() => {
    localStorage.setItem('collegeDepartments', JSON.stringify(departments));
  }, [departments]);

  const createDepartment = (deptData) => {
    const newDept = {
      id: Date.now(),
      ...deptData,
      classes: []
    };
    setDepartments([...departments, newDept]);
    setShowCreateDept(false);
  };

  const addClassToDepartment = (deptId, classData) => {
    const newClass = { 
      id: Date.now(), 
      ...classData, 
      students: [], 
      teacherId: null, 
      teacherName: '' 
    };
    
    setDepartments(prevDepts => prevDepts.map(dept => {
      if (dept.id === deptId) {
        const updatedDept = {
          ...dept,
          classes: [...(dept.classes || []), newClass]
        };
        console.log('Adding class to department:', updatedDept);
        return updatedDept;
      }
      return dept;
    }));
    
    // Update selected dept if it's currently open
    setSelectedDept(prev => {
      if (prev && prev.id === deptId) {
        return {
          ...prev,
          classes: [...(prev.classes || []), newClass]
        };
      }
      return prev;
    });
  };

  const addStudentToClass = (deptId, classId, studentId) => {
    setDepartments(departments.map(dept => {
      if (dept.id === deptId) {
        return {
          ...dept,
          classes: dept.classes.map(cls => {
            if (cls.id === classId) {
              return {
                ...cls,
                students: [...(cls.students || []), studentId]
              };
            }
            return cls;
          })
        };
      }
      return dept;
    }));
  };

  const assignTeacherToClass = (deptId, classId, teacherId, teacherName) => {
    setDepartments(departments.map(dept => {
      if (dept.id === deptId) {
        return {
          ...dept,
          classes: dept.classes.map(cls => {
            if (cls.id === classId) {
              return { ...cls, teacherId, teacherName };
            }
            return cls;
          })
        };
      }
      return dept;
    }));
  };

  const assignHODToDepartment = (deptId, hodId, hodName) => {
    setDepartments(departments.map(dept => {
      if (dept.id === deptId) {
        return { ...dept, hodId, hodName };
      }
      return dept;
    }));
  };

  const deleteDepartment = (deptId) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(d => d.id !== deptId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Department Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage departments, classes, teachers, and students</p>
        </div>
        <button
          onClick={() => setShowCreateDept(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Department
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className={`card shadow-lg hover:shadow-xl transition-all duration-200 border-l-4 border-${dept.color}-500`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 bg-${dept.color}-100 dark:bg-${dept.color}-900/40 rounded-xl flex items-center justify-center text-2xl`}>
                  {dept.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{dept.shortName}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{dept.classes?.length || 0} classes</p>
                </div>
              </div>
              <button
                onClick={() => deleteDepartment(dept.id)}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{dept.name}</h4>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-600 dark:text-gray-400">HOD:</span>
                <span className="font-medium text-gray-900 dark:text-white">{dept.hodName || 'Not Assigned'}</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-600 dark:text-gray-400">Classes:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{dept.classes?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-600 dark:text-gray-400">Total Students:</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {dept.classes?.reduce((sum, cls) => sum + (cls.students?.length || 0), 0) || 0}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedDept(dept);
                setShowManageDept(true);
              }}
              className="w-full btn-primary text-sm"
            >
              Manage Department
            </button>
          </div>
        ))}
      </div>

      {/* Create Department Modal */}
      {showCreateDept && <CreateDepartmentModal onClose={() => setShowCreateDept(false)} onCreate={createDepartment} availableHODs={availableHODs} />}

      {/* Manage Department Modal */}
      {showManageDept && selectedDept && (
        <ManageDepartmentModal
          department={selectedDept}
          onClose={() => { setShowManageDept(false); setSelectedDept(null); }}
          onAddClass={addClassToDepartment}
          onAddStudent={addStudentToClass}
          onAssignTeacher={assignTeacherToClass}
          onAssignHOD={assignHODToDepartment}
          availableTeachers={availableTeachers}
          availableHODs={availableHODs}
          availableStudents={availableStudents}
        />
      )}
    </div>
  );
};

// Create Department Modal
const CreateDepartmentModal = ({ onClose, onCreate, availableHODs }) => {
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    icon: '🏫',
    color: 'blue',
    hodId: null,
    hodName: ''
  });

  const iconOptions = ['💻', '⚡', '⚙️', '🏗️', '📡', '🖥️', '🧪', '🧬', '✈️', '🚗', '🏛️', '💼', '🏫'];
  const colorOptions = ['blue', 'green', 'purple', 'orange', 'pink', 'indigo', 'teal', 'cyan', 'red', 'amber', 'emerald', 'yellow'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Create New Department</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Department Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Computer Science & Engineering"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Short Name</label>
            <input
              type="text"
              required
              value={formData.shortName}
              onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
              placeholder="e.g., CSE"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Select Icon</label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-3 text-2xl rounded-lg border-2 transition-all ${
                    formData.icon === icon
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Theme Color</label>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.color === color
                      ? 'border-green-500 ring-2 ring-green-300'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div className={`w-full h-6 bg-${color}-500 rounded`}></div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assign HOD (Optional)</label>
            <select
              value={formData.hodId || ''}
              onChange={(e) => {
                const hod = availableHODs.find(h => h.id === parseInt(e.target.value));
                setFormData({ ...formData, hodId: parseInt(e.target.value) || null, hodName: hod?.name || '' });
              }}
              className="input-field"
            >
              <option value="">Select HOD...</option>
              {availableHODs.map((hod) => (
                <option key={hod.id} value={hod.id}>{hod.name} - {hod.qualification}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 btn-primary">Create Department</button>
            <button type="button" onClick={onClose} className="flex-1 btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Manage Department Modal (Classes, Students, Teachers)
const ManageDepartmentModal = ({ department, onClose, onAddClass, onAddStudent, onAssignTeacher, onAssignHOD, availableTeachers, availableHODs, availableStudents }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddClass, setShowAddClass] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newClass, setNewClass] = useState({ name: '', section: '', capacity: 30 });

  const handleAddClass = () => {
    if (!newClass.name || !newClass.section) {
      alert('Please fill in class name and section');
      return;
    }
    onAddClass(department.id, newClass);
    setNewClass({ name: '', section: '', capacity: 30 });
    setShowAddClass(false);
  };

  const handleAddStudent = (classId, studentId) => {
    onAddStudent(department.id, classId, studentId);
  };

  const handleAssignTeacher = (classId, teacherId, teacherName) => {
    onAssignTeacher(department.id, classId, teacherId, teacherName);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`bg-gradient-to-r from-${department.color}-500 to-${department.color}-600 p-6 text-white`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{department.icon}</div>
              <div>
                <h3 className="text-2xl font-bold">{department.name}</h3>
                <p className="opacity-90 mt-1">Department Code: {department.shortName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            {['overview', 'classes', 'hod'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-gray-900'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="card bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Total Classes</p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{department.classes?.length || 0}</p>
                </div>
                <div className="card bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-600 dark:text-green-400 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                    {department.classes?.reduce((sum, cls) => sum + (cls.students?.length || 0), 0) || 0}
                  </p>
                </div>
                <div className="card bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Teachers</p>
                  <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                    {department.classes?.filter(cls => cls.teacherId).length || 0}
                  </p>
                </div>
              </div>

              <div className="card">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Department Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Department Name</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{department.name}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Short Code</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{department.shortName}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Head of Department</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{department.hodName || 'Not Assigned'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Classes in {department.shortName}</h4>
                <button
                  onClick={() => setShowAddClass(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Class
                </button>
              </div>

              {/* Add Class Form */}
              {showAddClass && (
                <div className="card bg-green-50 dark:bg-green-900/20 border-2 border-green-500">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-4">Add New Class</h5>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Class Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., 10"
                        value={newClass.name}
                        onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Section *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., A"
                        value={newClass.section}
                        onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
                      <input
                        type="number"
                        placeholder="30"
                        value={newClass.capacity}
                        onChange={(e) => setNewClass({ ...newClass, capacity: parseInt(e.target.value) || 30 })}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={handleAddClass} className="flex-1 btn-primary">Add Class</button>
                    <button type="button" onClick={() => setShowAddClass(false)} className="flex-1 btn-secondary">Cancel</button>
                  </div>
                </div>
              )}

              {/* Classes List */}
              <div className="space-y-4">
                {department.classes && department.classes.length > 0 ? (
                  department.classes.map((cls) => (
                    <ClassManagementCard
                      key={cls.id}
                      classData={cls}
                      onAddStudent={handleAddStudent}
                      onAssignTeacher={handleAssignTeacher}
                      availableTeachers={availableTeachers}
                      availableStudents={availableStudents}
                    />
                  ))
                ) : (
                  <div className="card text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No classes added yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HOD Tab */}
          {activeTab === 'hod' && (
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Assign Head of Department</h4>

              {department.hodName ? (
                <div className="card bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                        {department.hodName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{department.hodName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Current HOD</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onAssignHOD(department.id, null, '')}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card text-center py-8 bg-gray-50 dark:bg-gray-700">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">No HOD assigned yet</p>
                </div>
              )}

              <div className="card">
                <h5 className="font-bold text-gray-900 dark:text-white mb-4">Available HODs</h5>
                <div className="space-y-3">
                  {availableHODs.map((hod) => (
                    <div key={hod.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                          {hod.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{hod.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{hod.qualification}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onAssignHOD(department.id, hod.id, hod.name)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Assign as HOD
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Detailed Student Creation Modal
const CreateStudentModal = ({ onClose, onCreateStudent, classInfo }) => {
  const [step, setStep] = useState(1);
  const [studentData, setStudentData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    
    // Academic Info
    rollNo: '',
    admissionDate: '',
    previousSchool: '',
    category: 'General',
    
    // Address Info
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Parent/Guardian Info
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    motherName: '',
    motherPhone: '',
    motherOccupation: '',
    guardianName: '',
    guardianPhone: '',
    guardianRelation: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    
    // Medical Info
    medicalConditions: '',
    allergies: '',
    medications: ''
  });

  const handleChange = (field, value) => {
    setStudentData({ ...studentData, [field]: value });
  };

  const handleSubmit = () => {
    const fullName = `${studentData.firstName} ${studentData.lastName}`;
    const newStudent = {
      id: Date.now(),
      name: fullName,
      ...studentData,
      classInfo: classInfo
    };
    onCreateStudent(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">Add New Student</h3>
              <p className="opacity-90 mt-1">Complete student registration for {classInfo}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {['Personal', 'Academic', 'Contact', 'Medical'].map((stepName, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold ${
                  step > idx + 1 ? 'bg-white text-blue-600 border-white' :
                  step === idx + 1 ? 'bg-white/20 border-white text-white' :
                  'bg-white/10 border-white/30 text-white/50'
                }`}>
                  {step > idx + 1 ? '✓' : idx + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${step === idx + 1 ? 'text-white' : 'text-white/60'}`}>
                  {stepName}
                </span>
                {idx < 3 && <div className="w-12 h-0.5 bg-white/30 mx-4"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 240px)' }}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personal Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">First Name *</label>
                  <input type="text" required value={studentData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className="input-field" placeholder="Enter first name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Name *</label>
                  <input type="text" required value={studentData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} className="input-field" placeholder="Enter last name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                  <input type="email" required value={studentData.email} onChange={(e) => handleChange('email', e.target.value)} className="input-field" placeholder="student@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                  <input type="tel" required value={studentData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="input-field" placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date of Birth *</label>
                  <input type="date" required value={studentData.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Gender *</label>
                  <select value={studentData.gender} onChange={(e) => handleChange('gender', e.target.value)} className="input-field" required>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Blood Group</label>
                  <select value={studentData.bloodGroup} onChange={(e) => handleChange('bloodGroup', e.target.value)} className="input-field">
                    <option value="">Select blood group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Information */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Academic Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Roll Number *</label>
                  <input type="text" required value={studentData.rollNo} onChange={(e) => handleChange('rollNo', e.target.value)} className="input-field" placeholder="e.g., 10A01" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Admission Date *</label>
                  <input type="date" required value={studentData.admissionDate} onChange={(e) => handleChange('admissionDate', e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Previous School</label>
                  <input type="text" value={studentData.previousSchool} onChange={(e) => handleChange('previousSchool', e.target.value)} className="input-field" placeholder="Previous school name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select value={studentData.category} onChange={(e) => handleChange('category', e.target.value)} className="input-field">
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Residential Address *</label>
                  <textarea required value={studentData.address} onChange={(e) => handleChange('address', e.target.value)} className="input-field h-20 resize-none" placeholder="Full address"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City *</label>
                  <input type="text" required value={studentData.city} onChange={(e) => handleChange('city', e.target.value)} className="input-field" placeholder="City" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">State *</label>
                  <input type="text" required value={studentData.state} onChange={(e) => handleChange('state', e.target.value)} className="input-field" placeholder="State" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">PIN Code *</label>
                  <input type="text" required value={studentData.pincode} onChange={(e) => handleChange('pincode', e.target.value)} className="input-field" placeholder="123456" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Parent/Guardian & Emergency Contact */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Father's Information</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Father's Name *</label>
                    <input type="text" required value={studentData.fatherName} onChange={(e) => handleChange('fatherName', e.target.value)} className="input-field" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                    <input type="tel" required value={studentData.fatherPhone} onChange={(e) => handleChange('fatherPhone', e.target.value)} className="input-field" placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Occupation</label>
                    <input type="text" value={studentData.fatherOccupation} onChange={(e) => handleChange('fatherOccupation', e.target.value)} className="input-field" placeholder="Occupation" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Mother's Information</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mother's Name *</label>
                    <input type="text" required value={studentData.motherName} onChange={(e) => handleChange('motherName', e.target.value)} className="input-field" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                    <input type="tel" required value={studentData.motherPhone} onChange={(e) => handleChange('motherPhone', e.target.value)} className="input-field" placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Occupation</label>
                    <input type="text" value={studentData.motherOccupation} onChange={(e) => handleChange('motherOccupation', e.target.value)} className="input-field" placeholder="Occupation" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact Name *</label>
                    <input type="text" required value={studentData.emergencyContactName} onChange={(e) => handleChange('emergencyContactName', e.target.value)} className="input-field" placeholder="Emergency contact name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                    <input type="tel" required value={studentData.emergencyContactPhone} onChange={(e) => handleChange('emergencyContactPhone', e.target.value)} className="input-field" placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Relation *</label>
                    <input type="text" required value={studentData.emergencyContactRelation} onChange={(e) => handleChange('emergencyContactRelation', e.target.value)} className="input-field" placeholder="e.g., Uncle" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Medical Information */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Medical Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Medical Conditions (if any)</label>
                  <textarea value={studentData.medicalConditions} onChange={(e) => handleChange('medicalConditions', e.target.value)} className="input-field h-24 resize-none" placeholder="List any chronic conditions, disabilities, or health concerns"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Allergies (if any)</label>
                  <textarea value={studentData.allergies} onChange={(e) => handleChange('allergies', e.target.value)} className="input-field h-20 resize-none" placeholder="Food allergies, drug allergies, etc."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Medications (if any)</label>
                  <textarea value={studentData.medications} onChange={(e) => handleChange('medications', e.target.value)} className="input-field h-20 resize-none" placeholder="List any regular medications"></textarea>
                </div>
              </div>

              {/* Student Summary Preview */}
              <div className="card bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 mt-6">
                <h5 className="font-bold text-gray-900 dark:text-white mb-3">Student Summary</h5>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{studentData.firstName} {studentData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Roll No:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{studentData.rollNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{studentData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Class:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{classInfo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Parent Contact:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{studentData.fatherPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Emergency:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{studentData.emergencyContactPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Navigation */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 rounded-lg font-medium transition-colors"
            >
              ← Previous
            </button>
            
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg text-white rounded-lg font-bold transition-all"
              >
                ✓ Add Student
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Class Management Card
const ClassManagementCard = ({ classData, onAddStudent, onAssignTeacher, availableTeachers, availableStudents }) => {
  const [expanded, setExpanded] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [showAssignTeacher, setShowAssignTeacher] = useState(false);
  const [classStudents, setClassStudents] = useState(classData.students || []);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);

  const getStudentName = (studentId) => {
    const student = availableStudents.find(s => s.id === studentId);
    if (!student) {
      const created = classStudents.find(s => s.id === studentId);
      return created ? created.name : 'Unknown Student';
    }
    return student.name;
  };

  const getStudentRollNo = (studentId) => {
    const student = availableStudents.find(s => s.id === studentId);
    if (!student) {
      const created = classStudents.find(s => s.id === studentId);
      return created ? created.rollNo : '';
    }
    return student.rollNo;
  };

  const getStudentDetails = (studentId) => {
    return classStudents.find(s => s.id === studentId);
  };

  return (
    <div className="card border-2 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="font-bold text-lg text-gray-900 dark:text-white">
            Class {classData.name}-{classData.section}
          </h5>
          <div className="flex gap-4 mt-1 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              👨‍🎓 {classData.students?.length || 0}/{classData.capacity} students
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              👨‍🏫 {classData.teacherName || 'No teacher assigned'}
            </span>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg className={`w-5 h-5 text-gray-600 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="space-y-4 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          {/* Assign Teacher Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h6 className="font-semibold text-gray-900 dark:text-white">Class Teacher</h6>
              <button
                onClick={() => setShowAssignTeacher(!showAssignTeacher)}
                className="text-sm px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded font-medium transition-colors"
              >
                {classData.teacherId ? 'Change Teacher' : 'Assign Teacher'}
              </button>
            </div>

            {showAssignTeacher && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-3">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Select Teacher</p>
                <div className="space-y-2">
                  {availableTeachers.map((teacher) => (
                    <button
                      key={teacher.id}
                      onClick={() => {
                        onAssignTeacher(classData.id, teacher.id, teacher.name);
                        setShowAssignTeacher(false);
                      }}
                      className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{teacher.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{teacher.subject}</p>
                      </div>
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Students Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h6 className="font-semibold text-gray-900 dark:text-white">Students ({classData.students?.length || 0}/{classData.capacity})</h6>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCreateStudent(true)}
                  className="flex items-center gap-1 text-sm px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-md text-white rounded-lg font-medium transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create New Student
                </button>
                <button
                  onClick={() => setShowAddStudent(!showAddStudent)}
                  className="text-sm px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  Quick Add
                </button>
              </div>
            </div>

            {/* Quick Add from Existing Students */}
            {showAddStudent && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-3 border-2 border-green-500">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quick Add - Existing Students</p>
                  <button onClick={() => setShowAddStudent(false)} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {availableStudents.filter(s => !classData.students?.includes(s.id)).map((student) => (
                    <button
                      key={student.id}
                      onClick={() => {
                        onAddStudent(classData.id, student.id);
                      }}
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{student.rollNo}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Create New Student Modal */}
            {showCreateStudent && (
              <CreateStudentModal
                onClose={() => setShowCreateStudent(false)}
                onCreateStudent={(student) => {
                  onAddStudent(classData.id, student.id);
                  setClassStudents([...classStudents, student]);
                }}
                classInfo={`${classData.name}-${classData.section}`}
              />
            )}

            {/* Student List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {classData.students && classData.students.length > 0 ? (
                classData.students.map((studentId) => (
                  <button
                    key={studentId}
                    onClick={() => {
                      const details = getStudentDetails(studentId);
                      if (details) {
                        setSelectedStudent(details);
                        setShowStudentDetails(true);
                      }
                    }}
                    className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-2 hover:border-blue-500 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {getStudentName(studentId).split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{getStudentName(studentId)}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{getStudentRollNo(studentId)}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))
              ) : (
                <p className="col-span-2 text-center text-gray-500 dark:text-gray-400 py-6">No students added yet</p>
              )}
            </div>

            {/* Student Details Modal */}
            {showStudentDetails && selectedStudent && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowStudentDetails(false)}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                          {selectedStudent.name?.split(' ').map(n => n[0]).join('') || '?'}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                          <p className="opacity-90">Roll No: {selectedStudent.rollNo}</p>
                        </div>
                      </div>
                      <button onClick={() => setShowStudentDetails(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.name}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{selectedStudent.email}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.phone}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Date of Birth</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.dateOfBirth}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gender</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.gender}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Blood Group</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.bloodGroup || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Academic Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Roll Number</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.rollNo}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Admission Date</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.admissionDate}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg col-span-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Address</p>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{selectedStudent.address}, {selectedStudent.city}, {selectedStudent.state} - {selectedStudent.pincode}</p>
                        </div>
                      </div>
                    </div>

                    {/* Parent Information */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Parent & Emergency Contact
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Father's Name</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.fatherName}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{selectedStudent.fatherPhone}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mother's Name</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.motherName}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{selectedStudent.motherPhone}</p>
                        </div>
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg col-span-2 border-2 border-orange-500">
                          <p className="text-xs text-orange-600 dark:text-orange-400 mb-1 font-bold">Emergency Contact</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.emergencyContactName} ({selectedStudent.emergencyContactRelation})</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedStudent.emergencyContactPhone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Medical Information */}
                    {(selectedStudent.medicalConditions || selectedStudent.allergies || selectedStudent.medications) && (
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Medical Information
                        </h4>
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
                          {selectedStudent.medicalConditions && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">Medical Conditions</p>
                              <p className="text-sm text-gray-900 dark:text-white">{selectedStudent.medicalConditions}</p>
                            </div>
                          )}
                          {selectedStudent.allergies && (
                            <div className="mb-3">
                              <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">Allergies</p>
                              <p className="text-sm text-gray-900 dark:text-white">{selectedStudent.allergies}</p>
                            </div>
                          )}
                          {selectedStudent.medications && (
                            <div>
                              <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">Medications</p>
                              <p className="text-sm text-gray-900 dark:text-white">{selectedStudent.medications}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Departments Component (Original - for backward compatibility)
const AdminDepartments = () => {
  const departments = [
    { 
      id: 1, 
      name: 'Computer Science & Engineering', 
      shortName: 'CSE',
      hod: 'Dr. Sarah Johnson',
      students: 450,
      faculty: 24,
      programs: ['B.Tech', 'M.Tech', 'PhD'],
      avgGrade: 8.5,
      placement: 92,
      color: 'blue',
      icon: '💻'
    },
    { 
      id: 2, 
      name: 'Electrical & Electronics Engineering', 
      shortName: 'EEE',
      hod: 'Dr. Michael Chen',
      students: 380,
      faculty: 20,
      programs: ['B.Tech', 'M.Tech'],
      avgGrade: 8.2,
      placement: 88,
      color: 'yellow',
      icon: '⚡'
    },
    { 
      id: 3, 
      name: 'Mechanical Engineering', 
      shortName: 'ME',
      hod: 'Dr. Robert Williams',
      students: 420,
      faculty: 22,
      programs: ['B.Tech', 'M.Tech', 'PhD'],
      avgGrade: 8.0,
      placement: 85,
      color: 'orange',
      icon: '⚙️'
    },
    { 
      id: 4, 
      name: 'Civil Engineering', 
      shortName: 'CE',
      hod: 'Dr. Emily Davis',
      students: 350,
      faculty: 18,
      programs: ['B.Tech', 'M.Tech'],
      avgGrade: 7.8,
      placement: 82,
      color: 'green',
      icon: '🏗️'
    },
    { 
      id: 5, 
      name: 'Electronics & Communication Engineering', 
      shortName: 'ECE',
      hod: 'Dr. David Martinez',
      students: 400,
      faculty: 21,
      programs: ['B.Tech', 'M.Tech'],
      avgGrade: 8.3,
      placement: 90,
      color: 'purple',
      icon: '📡'
    },
    { 
      id: 6, 
      name: 'Information Technology', 
      shortName: 'IT',
      hod: 'Dr. Lisa Anderson',
      students: 380,
      faculty: 19,
      programs: ['B.Tech', 'M.Tech'],
      avgGrade: 8.4,
      placement: 91,
      color: 'indigo',
      icon: '🖥️'
    },
    { 
      id: 7, 
      name: 'Chemical Engineering', 
      shortName: 'CHE',
      hod: 'Dr. James Wilson',
      students: 280,
      faculty: 15,
      programs: ['B.Tech', 'M.Tech', 'PhD'],
      avgGrade: 7.9,
      placement: 84,
      color: 'pink',
      icon: '🧪'
    },
    { 
      id: 8, 
      name: 'Biotechnology', 
      shortName: 'BT',
      hod: 'Dr. Maria Garcia',
      students: 220,
      faculty: 12,
      programs: ['B.Tech', 'M.Tech'],
      avgGrade: 8.1,
      placement: 86,
      color: 'teal',
      icon: '🧬'
    },
    { 
      id: 9, 
      name: 'Aerospace Engineering', 
      shortName: 'AE',
      hod: 'Dr. John Taylor',
      students: 180,
      faculty: 10,
      programs: ['B.Tech', 'M.Tech'],
      avgGrade: 8.6,
      placement: 93,
      color: 'cyan',
      icon: '✈️'
    },
    { 
      id: 10, 
      name: 'Automobile Engineering', 
      shortName: 'AUTO',
      hod: 'Dr. Patricia Brown',
      students: 200,
      faculty: 11,
      programs: ['B.Tech', 'M.Tech'],
      avgGrade: 7.7,
      placement: 80,
      color: 'red',
      icon: '🚗'
    },
    { 
      id: 11, 
      name: 'Architecture', 
      shortName: 'ARCH',
      hod: 'Dr. Thomas Lee',
      students: 150,
      faculty: 9,
      programs: ['B.Arch', 'M.Arch'],
      avgGrade: 8.2,
      placement: 87,
      color: 'amber',
      icon: '🏛️'
    },
    { 
      id: 12, 
      name: 'MBA (Management)', 
      shortName: 'MBA',
      hod: 'Dr. Jennifer White',
      students: 220,
      faculty: 14,
      programs: ['MBA', 'PGDM'],
      avgGrade: 8.3,
      placement: 89,
      color: 'emerald',
      icon: '💼'
    }
  ];

  const totalStudents = departments.reduce((sum, dept) => sum + dept.students, 0);
  const totalFaculty = departments.reduce((sum, dept) => sum + dept.faculty, 0);
  const avgPlacement = Math.round(departments.reduce((sum, dept) => sum + dept.placement, 0) / departments.length);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">All Departments</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive view of all academic departments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Departments</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-1">{departments.length}</p>
            </div>
            <div className="w-14 h-14 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center text-2xl">
              🏫
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Students</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">{totalStudents}</p>
            </div>
            <div className="w-14 h-14 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center text-2xl">
              👨‍🎓
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Placement</p>
              <p className="text-3xl font-bold text-purple-700 dark:text-purple-300 mt-1">{avgPlacement}%</p>
            </div>
            <div className="w-14 h-14 bg-purple-500 dark:bg-purple-600 rounded-xl flex items-center justify-center text-2xl">
              📈
            </div>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="card shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 bg-${dept.color}-100 dark:bg-${dept.color}-900/40 rounded-xl flex items-center justify-center text-2xl`}>
                  {dept.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{dept.shortName}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{dept.programs.join(', ')}</p>
                </div>
              </div>
            </div>
            
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{dept.name}</h4>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">HOD:</span>
                <span className="font-medium text-gray-900 dark:text-white">{dept.hod}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Students:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{dept.students}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Faculty:</span>
                <span className="font-bold text-green-600 dark:text-green-400">{dept.faculty}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">Avg Grade</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{dept.avgGrade}/10</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r from-${dept.color}-400 to-${dept.color}-600 h-2 rounded-full`}
                  style={{ width: `${(dept.avgGrade / 10) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-600 dark:text-gray-400">Placement</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{dept.placement}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Finance Component
const AdminFinance = () => {
  const feeStructures = [
    { 
      department: 'Computer Science & Engineering', 
      shortName: 'CSE',
      tuition: 125000, 
      lab: 15000, 
      library: 5000, 
      misc: 8000,
      total: 153000,
      students: 450,
      color: 'blue'
    },
    { 
      department: 'Electrical & Electronics Engineering', 
      shortName: 'EEE',
      tuition: 118000, 
      lab: 14000, 
      library: 5000, 
      misc: 8000,
      total: 145000,
      students: 380,
      color: 'yellow'
    },
    { 
      department: 'Mechanical Engineering', 
      shortName: 'ME',
      tuition: 115000, 
      lab: 12000, 
      library: 5000, 
      misc: 8000,
      total: 140000,
      students: 420,
      color: 'orange'
    },
    { 
      department: 'Civil Engineering', 
      shortName: 'CE',
      tuition: 110000, 
      lab: 10000, 
      library: 5000, 
      misc: 8000,
      total: 133000,
      students: 350,
      color: 'green'
    },
    { 
      department: 'Electronics & Communication Engineering', 
      shortName: 'ECE',
      tuition: 120000, 
      lab: 13000, 
      library: 5000, 
      misc: 8000,
      total: 146000,
      students: 400,
      color: 'purple'
    },
    { 
      department: 'Information Technology', 
      shortName: 'IT',
      tuition: 122000, 
      lab: 14000, 
      library: 5000, 
      misc: 8000,
      total: 149000,
      students: 380,
      color: 'indigo'
    },
    { 
      department: 'Chemical Engineering', 
      shortName: 'CHE',
      tuition: 115000, 
      lab: 16000, 
      library: 5000, 
      misc: 8000,
      total: 144000,
      students: 280,
      color: 'pink'
    },
    { 
      department: 'Biotechnology', 
      shortName: 'BT',
      tuition: 118000, 
      lab: 17000, 
      library: 5000, 
      misc: 8000,
      total: 148000,
      students: 220,
      color: 'teal'
    },
    { 
      department: 'Aerospace Engineering', 
      shortName: 'AE',
      tuition: 130000, 
      lab: 18000, 
      library: 5000, 
      misc: 8000,
      total: 161000,
      students: 180,
      color: 'cyan'
    },
    { 
      department: 'Automobile Engineering', 
      shortName: 'AUTO',
      tuition: 115000, 
      lab: 14000, 
      library: 5000, 
      misc: 8000,
      total: 142000,
      students: 200,
      color: 'red'
    },
    { 
      department: 'Architecture', 
      shortName: 'ARCH',
      tuition: 125000, 
      lab: 12000, 
      library: 6000, 
      misc: 10000,
      total: 153000,
      students: 150,
      color: 'amber'
    },
    { 
      department: 'MBA (Management)', 
      shortName: 'MBA',
      tuition: 135000, 
      lab: 8000, 
      library: 7000, 
      misc: 10000,
      total: 160000,
      students: 220,
      color: 'emerald'
    }
  ];

  // Payment statistics
  const totalStudents = 2480;
  const studentsPaid = 1982; // 80%
  const studentsPartialPaid = 298; // 12%
  const studentsNotPaid = 200; // 8%

  const totalRevenue = feeStructures.reduce((sum, dept) => sum + (dept.total * dept.students), 0);
  const collectedRevenue = Math.round(totalRevenue * 0.80);
  const pendingRevenue = totalRevenue - collectedRevenue;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Finance Management</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Fee structures and payment analytics</p>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">₹{(totalRevenue / 10000000).toFixed(2)}Cr</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Collected</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">₹{(collectedRevenue / 10000000).toFixed(2)}Cr</p>
            </div>
            <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Pending</p>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300 mt-1">₹{(pendingRevenue / 10000000).toFixed(2)}Cr</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 dark:bg-orange-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Collection %</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-1">80%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 dark:bg-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status Chart */}
      <div className="card shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Student Payment Status</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visual Bar Chart */}
          <div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    Fully Paid
                  </span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{studentsPaid} ({Math.round((studentsPaid/totalStudents)*100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-bold"
                    style={{ width: `${(studentsPaid/totalStudents)*100}%` }}
                  >
                    {studentsPaid}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    Partially Paid
                  </span>
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{studentsPartialPaid} ({Math.round((studentsPartialPaid/totalStudents)*100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-bold"
                    style={{ width: `${(studentsPartialPaid/totalStudents)*100}%` }}
                  >
                    {studentsPartialPaid}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    Not Paid
                  </span>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400">{studentsNotPaid} ({Math.round((studentsNotPaid/totalStudents)*100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-red-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-bold"
                    style={{ width: `${(studentsNotPaid/totalStudents)*100}%` }}
                  >
                    {studentsNotPaid}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart Visualization */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Fully Paid - 80% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray={`${(studentsPaid/totalStudents) * 251.2} 251.2`}
                  strokeDashoffset="0"
                />
                {/* Partially Paid - 12% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="20"
                  strokeDasharray={`${(studentsPartialPaid/totalStudents) * 251.2} 251.2`}
                  strokeDashoffset={`-${(studentsPaid/totalStudents) * 251.2}`}
                />
                {/* Not Paid - 8% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray={`${(studentsNotPaid/totalStudents) * 251.2} 251.2`}
                  strokeDashoffset={`-${((studentsPaid + studentsPartialPaid)/totalStudents) * 251.2}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalStudents}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Structure Table */}
      <div className="card shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Department-wise Fee Structure (Annual)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tuition</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Lab</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Library</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Misc</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Students</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {feeStructures.map((fee, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{fee.shortName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{fee.department}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-300">₹{fee.tuition.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-300">₹{fee.lab.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-300">₹{fee.library.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-300">₹{fee.misc.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">₹{fee.total.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900 dark:text-white">{fee.students}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <td colSpan="5" className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">Total Expected Revenue:</td>
                <td colSpan="2" className="px-6 py-4 text-right font-bold text-2xl text-primary-600 dark:text-primary-400">
                  ₹{(totalRevenue / 10000000).toFixed(2)} Crores
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sidebar menu items
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin-dashboard', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> 
    },
    { 
      name: 'Departments', 
      path: '/admin-dashboard/departments', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg> 
    },
    { 
      name: 'Manage Departments', 
      path: '/admin-dashboard/manage-departments', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg> 
    },
    { 
      name: 'Faculty', 
      path: '/admin-dashboard/faculty', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg> 
    },
    { 
      name: 'Students', 
      path: '/admin-dashboard/students', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg> 
    },
    { 
      name: 'Finance', 
      path: '/admin-dashboard/finance', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg> 
    },
    { 
      name: 'Settings', 
      path: '/admin-dashboard/settings', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg> 
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
                    <p className="text-sm font-medium text-gray-700 dark:text-white">Dr. Ananya Iyer</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/departments" element={<AdminDepartments />} />
            <Route path="/manage-departments" element={<DepartmentManagement />} />
            <Route path="/finance" element={<AdminFinance />} />
            <Route path="*" element={<div className="text-center text-lg mt-8">Page under construction 🚧</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
