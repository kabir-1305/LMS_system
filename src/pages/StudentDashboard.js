import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import ThemeToggle from '../components/common/ThemeToggle';
import DashboardCard from '../components/common/DashboardCard';
import { AuthContext } from '../context/AuthContext';
import StudentAnnouncements from './StudentAnnouncements';

// Student Dashboard Components
const StudentOverview = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [dashboardColor, setDashboardColor] = useState(
    localStorage.getItem('dashboardColor') || 'blue'
  );
  const [widgetLayout, setWidgetLayout] = useState(
    JSON.parse(localStorage.getItem('widgetLayout')) || ['attendance', 'assignments', 'fees', 'announcements']
  );
  const [greeting, setGreeting] = useState('');

  // Mock data
  const attendancePercentage = 85;
  const upcomingAssignments = 3;
  const pendingFees = 1200;
  const announcements = 2;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboardColor', dashboardColor);
  }, [dashboardColor]);

  useEffect(() => {
    localStorage.setItem('widgetLayout', JSON.stringify(widgetLayout));
  }, [widgetLayout]);

  const colorSchemes = {
    blue: {
      gradient: 'from-blue-500 to-purple-600',
      text: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800'
    },
    purple: {
      gradient: 'from-purple-500 to-pink-600',
      text: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800'
    },
    green: {
      gradient: 'from-green-500 to-teal-600',
      text: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800'
    },
    orange: {
      gradient: 'from-orange-500 to-red-600',
      text: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800'
    }
  };

  const currentScheme = colorSchemes[dashboardColor];

  const widgets = {
    attendance: (
      <DashboardCard 
        title="Attendance" 
        value={`${attendancePercentage}%`} 
        color="green"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        onClick={() => navigate('/student-dashboard/attendance')}
      />
    ),
    assignments: (
      <DashboardCard 
        title="Assignments Due" 
        value={upcomingAssignments} 
        color="blue"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        }
      />
    ),
    fees: (
      <DashboardCard 
        title="Pending Fees" 
        value={`₹${pendingFees}`} 
        color="red"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        onClick={() => navigate('/student-dashboard/fees')}
      />
    ),
    announcements: (
      <DashboardCard 
        title="Announcements" 
        value={announcements} 
        color="yellow"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        }
      />
    )
  };

  return (
    <div className="space-y-6">
      {/* Modern Header with Gradient */}
      <div className={`relative bg-gradient-to-r ${currentScheme.gradient} rounded-2xl p-8 text-white shadow-xl overflow-hidden`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <div className="text-center md:text-left">
              <p className="inline-block text-lg font-semibold text-primary-100 bg-white/10 px-3 py-1 rounded-full">{greeting}</p>
              <h2 className="text-4xl font-extrabold mt-3">{currentUser?.name || 'Student'}!</h2>
              <p className="mt-2 text-sm opacity-85">Computer Science - Semester 5</p>
            </div>
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-all duration-200"
              title="Customize Dashboard"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm">Active Session</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customizer Panel */}
      {showCustomizer && (
        <div className="card border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Customize Your Dashboard
            </h3>
            <button onClick={() => setShowCustomizer(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Color Scheme</label>
              <div className="flex gap-3">
                {Object.keys(colorSchemes).map((color) => (
                  <button
                    key={color}
                    onClick={() => setDashboardColor(color)}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorSchemes[color].gradient} shadow-md hover:scale-110 transition-transform ${
                      dashboardColor === color ? 'ring-4 ring-offset-2 ring-gray-400 dark:ring-gray-500' : ''
                    }`}
                    title={color.charAt(0).toUpperCase() + color.slice(1)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgetLayout.map((widgetKey) => (
          <div key={widgetKey}>{widgets[widgetKey]}</div>
        ))}
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
                Today's Schedule
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                3 Classes
              </span>
            </div>
            <div className="space-y-3">
              {[
              { subject: 'Mathematics', prof: 'Prof. Rajesh Kumar', time: '9:00 AM - 10:30 AM', room: 'Room 101', color: 'blue' },
              { subject: 'Computer Science', prof: 'Prof. Priya Sharma', time: '11:00 AM - 12:30 PM', room: 'Lab 203', color: 'purple' },
              { subject: 'Physics', prof: 'Prof. Amit Verma', time: '2:00 PM - 3:30 PM', room: 'Room 105', color: 'green' }
              ].map((cls, idx) => (
                <div key={idx} className="group relative overflow-hidden bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${cls.color}-500`}></div>
                  <div className="flex justify-between items-center ml-3">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{cls.subject}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cls.prof}</p>
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

        {/* Quick Actions & Announcements - 1 column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Library', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'blue' },
                { name: 'Grades', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'green' },
                { name: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'purple' },
                { name: 'Support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', color: 'orange' }
              ].map((action, idx) => (
                <button key={idx} className={`p-4 bg-${action.color}-50 dark:bg-${action.color}-900/20 border border-${action.color}-200 dark:border-${action.color}-800 rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-1 group`}>
                  <svg className={`w-6 h-6 text-${action.color}-600 dark:text-${action.color}-400 mx-auto mb-2 group-hover:scale-110 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                  </svg>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Announcements */}
          <div className="card shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              Announcements
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-r-lg">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Mid-Term Exams</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">2d ago</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">Examinations begin Nov 15th</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 rounded-r-lg">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Sports Day</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">1w ago</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">Annual sports on Dec 5th</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Semester Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Course Completion', value: 65, color: 'blue' },
            { label: 'Assignment Submission', value: 82, color: 'green' },
            { label: 'Overall Performance', value: 78, color: 'purple' }
          ].map((progress, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress.label}</span>
                <span className={`text-sm font-bold text-${progress.color}-600 dark:text-${progress.color}-400`}>{progress.value}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r from-${progress.color}-400 to-${progress.color}-600 h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${progress.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// =================================================================
// ===== ATTENDANCE COMPONENT - STYLES UPDATED BELOW =====
// =================================================================
const StudentAttendance = () => {
  // Mock data
  const subjects = [
    { name: 'Mathematics', present: 18, total: 20, percentage: 90 },
    { name: 'Physics', present: 16, total: 20, percentage: 80 },
    { name: 'Chemistry', present: 17, total: 20, percentage: 85 },
    { name: 'Computer Science', present: 19, total: 20, percentage: 95 },
    { name: 'English', present: 15, total: 20, percentage: 75 },
    { name: 'History', present: 14, total: 20, percentage: 70 },
  ];

  const overallPercentage = Math.round(subjects.reduce((acc, subject) => acc + subject.percentage, 0) / subjects.length);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">Attendance Tracker</h2>
      <div className="p-6 mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Overall Attendance</h3>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{overallPercentage}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${overallPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold p-6 text-slate-700 dark:text-slate-300">Subject-wise Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Attended</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Classes</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Percentage</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {subjects.map((subject, index) => (
                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{subject.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{subject.present}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{subject.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{subject.percentage}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${subject.percentage >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'}`}>
                      {subject.percentage >= 75 ? 'On Track ✅' : 'Needs Attention ⚠️'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
// =================================================================
// ===== END OF UPDATED COMPONENT =====
// =================================================================

// Timetable Tab - Notion-like Advanced View
const StudentTimetable = () => {
  const [viewMode, setViewMode] = useState('week'); // 'week', 'day', 'list'
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('classNotes');
    return saved ? JSON.parse(saved) : {};
  });
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('classReminders');
    return saved ? JSON.parse(saved) : {};
  });

  const schedule = [
    { day: 'Monday', classes: [
      { 
        id: 'mon-1',
        subject: 'Mathematics', 
        time: '9:00-10:30', 
        room: 'Room 101', 
        prof: 'Prof. Rajesh Kumar', 
        color: 'blue',
        type: 'Lecture',
        credits: 4,
        attendance: '92%',
        description: 'Advanced Calculus and Differential Equations',
        materials: ['Lecture Notes Ch. 5', 'Assignment #4'],
        nextTopic: 'Integration by Parts'
      },
      { 
        id: 'mon-2',
        subject: 'Computer Science', 
        time: '11:00-12:30', 
        room: 'Lab 203', 
        prof: 'Prof. Priya Sharma', 
        color: 'purple',
        type: 'Lab',
        credits: 3,
        attendance: '95%',
        description: 'Data Structures and Algorithms',
        materials: ['Lab Manual', 'Practice Problems'],
        nextTopic: 'Binary Search Trees'
      },
      { 
        id: 'mon-3',
        subject: 'Physics', 
        time: '2:00-3:30', 
        room: 'Room 105', 
        prof: 'Prof. Amit Verma', 
        color: 'green',
        type: 'Lecture',
        credits: 4,
        attendance: '88%',
        description: 'Modern Physics and Quantum Mechanics',
        materials: ['Textbook Ch. 12', 'Problem Set'],
        nextTopic: 'Wave-Particle Duality'
      }
    ]},
    { day: 'Tuesday', classes: [
      { id: 'tue-1', subject: 'English', time: '9:00-10:30', room: 'Room 102', prof: 'Prof. Kavita Singh', color: 'orange', type: 'Lecture', credits: 2, attendance: '90%', description: 'Literature and Communication', materials: ['Novel: Pride & Prejudice'], nextTopic: 'Victorian Literature' },
      { id: 'tue-2', subject: 'Mathematics', time: '11:00-12:30', room: 'Room 101', prof: 'Prof. Rajesh Kumar', color: 'blue', type: 'Tutorial', credits: 4, attendance: '92%', description: 'Problem Solving Session', materials: ['Practice Problems'], nextTopic: 'Solving Complex Problems' },
      { id: 'tue-3', subject: 'Chemistry', time: '2:00-3:30', room: 'Lab 201', prof: 'Prof. Suresh Patel', color: 'pink', type: 'Lab', credits: 3, attendance: '94%', description: 'Organic Chemistry Lab', materials: ['Lab Coat Required'], nextTopic: 'Titration Experiments' }
    ]},
    { day: 'Wednesday', classes: [
      { id: 'wed-1', subject: 'Physics', time: '9:00-10:30', room: 'Room 105', prof: 'Prof. Amit Verma', color: 'green', type: 'Lecture', credits: 4, attendance: '88%', description: 'Quantum Mechanics', materials: ['Lecture Slides'], nextTopic: 'Schrodinger Equation' },
      { id: 'wed-2', subject: 'Computer Science', time: '11:00-12:30', room: 'Lab 203', prof: 'Prof. Priya Sharma', color: 'purple', type: 'Lecture', credits: 3, attendance: '95%', description: 'Algorithm Analysis', materials: ['Course Notes'], nextTopic: 'Graph Algorithms' },
      { id: 'wed-3', subject: 'Mathematics', time: '2:00-3:30', room: 'Room 101', prof: 'Prof. Rajesh Kumar', color: 'blue', type: 'Lecture', credits: 4, attendance: '92%', description: 'Linear Algebra', materials: ['Textbook Ch. 8'], nextTopic: 'Eigenvalues' }
    ]},
    { day: 'Thursday', classes: [
      { id: 'thu-1', subject: 'Chemistry', time: '9:00-10:30', room: 'Lab 201', prof: 'Prof. Suresh Patel', color: 'pink', type: 'Lecture', credits: 3, attendance: '94%', description: 'Organic Chemistry Theory', materials: ['Reference Book'], nextTopic: 'Reaction Mechanisms' },
      { id: 'thu-2', subject: 'English', time: '11:00-12:30', room: 'Room 102', prof: 'Prof. Kavita Singh', color: 'orange', type: 'Seminar', credits: 2, attendance: '90%', description: 'Group Discussion', materials: ['Presentation Slides'], nextTopic: 'Poetry Analysis' },
      { id: 'thu-3', subject: 'Computer Science', time: '2:00-3:30', room: 'Lab 203', prof: 'Prof. Priya Sharma', color: 'purple', type: 'Lab', credits: 3, attendance: '95%', description: 'Coding Practice', materials: ['IDE Setup'], nextTopic: 'Dynamic Programming' }
    ]},
    { day: 'Friday', classes: [
      { id: 'fri-1', subject: 'Mathematics', time: '9:00-10:30', room: 'Room 101', prof: 'Prof. Rajesh Kumar', color: 'blue', type: 'Lecture', credits: 4, attendance: '92%', description: 'Calculus Review', materials: ['Review Notes'], nextTopic: 'Exam Preparation' },
      { id: 'fri-2', subject: 'Physics', time: '11:00-12:30', room: 'Room 105', prof: 'Prof. Amit Verma', color: 'green', type: 'Tutorial', credits: 4, attendance: '88%', description: 'Problem Solving', materials: ['Practice Set'], nextTopic: 'Past Papers Review' },
      { id: 'fri-3', subject: 'English', time: '2:00-3:30', room: 'Room 102', prof: 'Prof. Kavita Singh', color: 'orange', type: 'Lecture', credits: 2, attendance: '90%', description: 'Creative Writing', materials: ['Writing Guide'], nextTopic: 'Essay Techniques' }
    ]}
  ];

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const saveNote = (classId, note) => {
    const updated = { ...notes, [classId]: note };
    setNotes(updated);
    localStorage.setItem('classNotes', JSON.stringify(updated));
  };

  const toggleReminder = (classId) => {
    const updated = { ...reminders, [classId]: !reminders[classId] };
    setReminders(updated);
    localStorage.setItem('classReminders', JSON.stringify(updated));
  };

  const openClassDetails = (cls) => {
    setSelectedClass(cls);
    setShowClassDetails(true);
  };

  const getTodaysClasses = () => {
    const today = schedule.find(d => d.day === currentDay);
    return today ? today.classes : [];
  };

  return (
    <div className="space-y-6">
      {/* Header with View Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Class Timetable</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Organize and track your class schedule</p>
        </div>
        
        <div className="flex gap-3">
          {/* View Mode Selector */}
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'week' 
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'day' 
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              List
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="space-y-4">
          {schedule.map((daySchedule, idx) => (
            <div 
              key={idx} 
              className={`card shadow-lg transition-all duration-200 hover:shadow-xl ${
                daySchedule.day === currentDay ? 'ring-2 ring-primary-500 dark:ring-primary-400 bg-primary-50/30 dark:bg-primary-900/10' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md ${
                    daySchedule.day === currentDay 
                      ? 'bg-gradient-to-br from-primary-500 to-purple-600 text-white' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300'
                  }`}>
                    <div className="text-center">
                      <div className="text-xs opacity-75">{daySchedule.day.substring(0, 3)}</div>
                      <div className="text-lg font-bold">{idx + 1}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{daySchedule.day}</h3>
                    {daySchedule.day === currentDay && (
                      <span className="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-semibold bg-primary-100 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Today
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg font-medium">
                    {daySchedule.classes.length} Classes
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {daySchedule.classes.map((cls) => (
                  <div 
                    key={cls.id}
                    onClick={() => openClassDetails(cls)}
                    className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-lg cursor-pointer overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-${cls.color}-400 to-${cls.color}-600`}></div>
                    
                    {/* Reminder Bell */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleReminder(cls.id); }}
                      className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <svg className={`w-4 h-4 ${reminders[cls.id] ? 'text-yellow-500' : 'text-gray-400'}`} fill={reminders[cls.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </button>

                    <div className="mt-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {cls.subject}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded inline-block">
                            {cls.type}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{cls.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{cls.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-400">{cls.room}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-400 text-xs">{cls.prof}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Attendance</span>
                          <span className={`text-xs font-bold ${parseInt(cls.attendance) >= 90 ? 'text-green-600' : parseInt(cls.attendance) >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {cls.attendance}
                          </span>
                        </div>
                      </div>

                      {notes[cls.id] && (
                        <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-gray-700 dark:text-gray-300">
                          📝 {notes[cls.id].substring(0, 50)}{notes[cls.id].length > 50 ? '...' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Day View */}
      {viewMode === 'day' && (
        <div className="space-y-6">
          {/* Day Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {schedule.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDay(day.day)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedDay === day.day
                    ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-sm">{day.day}</div>
                <div className="text-xs opacity-75">{day.classes.length} classes</div>
              </button>
            ))}
          </div>

          {/* Selected Day Schedule */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {selectedDay}'s Schedule
            </h3>
            <div className="space-y-4">
              {schedule.find(d => d.day === selectedDay)?.classes.map((cls, idx) => (
                <div key={cls.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow cursor-pointer" onClick={() => openClassDetails(cls)}>
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className={`text-${cls.color}-600 dark:text-${cls.color}-400 font-bold text-lg`}>
                      {cls.time.split('-')[0]}
                    </div>
                    <div className="text-xs text-gray-500">
                      {cls.time.split('-')[1]}
                    </div>
                  </div>
                  <div className={`w-1 bg-${cls.color}-500 rounded`}></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">{cls.subject}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cls.prof} • {cls.room}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{cls.type}</span>
                      <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{cls.credits} Credits</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Day</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Professor</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {schedule.flatMap(day => 
                  day.classes.map(cls => (
                    <tr key={cls.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" onClick={() => openClassDetails(cls)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-${cls.color}-500`}></div>
                          <span className="font-semibold text-gray-900 dark:text-white">{cls.subject}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{day.day}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">{cls.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{cls.room}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{cls.prof}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{cls.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-bold ${parseInt(cls.attendance) >= 90 ? 'text-green-600' : parseInt(cls.attendance) >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {cls.attendance}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleReminder(cls.id); }}
                          className={`p-1 rounded ${reminders[cls.id] ? 'text-yellow-500' : 'text-gray-400'}`}
                        >
                          <svg className="w-5 h-5" fill={reminders[cls.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Class Details Modal */}
      {showClassDetails && selectedClass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowClassDetails(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className={`bg-gradient-to-r from-${selectedClass.color}-500 to-${selectedClass.color}-600 p-6 text-white rounded-t-2xl`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{selectedClass.subject}</h3>
                  <p className="opacity-90 mt-1">{selectedClass.description}</p>
                </div>
                <button onClick={() => setShowClassDetails(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Class Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Time</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedClass.time}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Room</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedClass.room}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Professor</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedClass.prof}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Credits</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedClass.credits} Credits</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Type</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{selectedClass.type}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Attendance</div>
                  <div className={`font-bold ${parseInt(selectedClass.attendance) >= 90 ? 'text-green-600' : parseInt(selectedClass.attendance) >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {selectedClass.attendance}
                  </div>
                </div>
              </div>

              {/* Next Topic */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-blue-900 dark:text-blue-300">Next Topic</div>
                    <div className="text-sm text-blue-700 dark:text-blue-400">{selectedClass.nextTopic}</div>
                  </div>
                </div>
              </div>

              {/* Materials */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Study Materials</h4>
                <div className="space-y-2">
                  {selectedClass.materials.map((material, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Personal Notes</h4>
                <textarea
                  value={notes[selectedClass.id] || ''}
                  onChange={(e) => saveNote(selectedClass.id, e.target.value)}
                  placeholder="Add your notes here..."
                  className="input-field h-32 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 btn-primary">
                  View All Materials
                </button>
                <button
                  onClick={() => toggleReminder(selectedClass.id)}
                  className={`flex-1 ${reminders[selectedClass.id] ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-500 hover:bg-gray-600'} text-white font-medium py-2 px-4 rounded-md transition-colors`}
                >
                  {reminders[selectedClass.id] ? '🔔 Reminder On' : '🔕 Set Reminder'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Fees Tab
const StudentFees = () => {
  const fees = [
    { id: 1, component: 'Tuition Fee', amount: 1000, dueDate: 'Oct 31, 2024', status: 'paid', icon: '🎓' },
    { id: 2, component: 'Library Fee', amount: 100, dueDate: 'Nov 10, 2024', status: 'pending', icon: '📚' },
    { id: 3, component: 'Examination Fee', amount: 100, dueDate: 'Nov 20, 2024', status: 'pending', icon: '📝' },
    { id: 4, component: 'Lab Fee', amount: 150, dueDate: 'Dec 5, 2024', status: 'pending', icon: '🔬' },
  ];

  const totalPaid = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = fees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalFees = fees.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Fees & Payments</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your fee payments and transaction history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Fees</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-1">₹{totalFees}</p>
            </div>
            <div className="w-14 h-14 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Paid</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">₹{totalPaid}</p>
            </div>
            <div className="w-14 h-14 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Pending</p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-300 mt-1">₹{totalPending}</p>
            </div>
            <div className="w-14 h-14 bg-red-500 dark:bg-red-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Items */}
      <div className="card shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Fee Breakdown</h3>
        <div className="space-y-4">
          {fees.map((fee) => (
            <div 
              key={fee.id}
              className="group relative bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/40 rounded-xl flex items-center justify-center text-2xl">
                    {fee.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">{fee.component}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Due: {fee.dueDate}
                      </p>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        fee.status === 'paid' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                      }`}>
                        {fee.status === 'paid' ? '✓ Paid' : '⚠ Pending'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{fee.amount}</p>
                  </div>
                  {fee.status === 'pending' && (
                    <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 font-medium">
                      Pay Now
                    </button>
                  )}
                  {fee.status === 'paid' && (
                    <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium">
                      Receipt
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Options */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Payment Methods</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Credit Card', 'Debit Card', 'Net Banking', 'UPI'].map((method, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{method}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Academic Performance Tab
const StudentPerformance = () => {
  const subjects = [
    { name: 'Mathematics', marks: 88, total: 100, grade: 'A', color: 'blue', icon: '📐' },
    { name: 'Physics', marks: 76, total: 100, grade: 'B+', color: 'green', icon: '⚛️' },
    { name: 'Chemistry', marks: 92, total: 100, grade: 'A+', color: 'pink', icon: '🧪' },
    { name: 'Computer Science', marks: 85, total: 100, grade: 'A', color: 'purple', icon: '💻' },
    { name: 'English', marks: 80, total: 100, grade: 'B+', color: 'orange', icon: '📚' },
  ];

  const totalMarks = subjects.reduce((sum, s) => sum + s.marks, 0);
  const totalPossible = subjects.reduce((sum, s) => sum + s.total, 0);
  const percentage = ((totalMarks / totalPossible) * 100).toFixed(1);
  const gpa = 8.7;

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'from-green-500 to-emerald-600';
    if (grade.startsWith('B')) return 'from-blue-500 to-cyan-600';
    if (grade.startsWith('C')) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Academic Performance</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track your grades and semester performance</p>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
          <div className="text-center">
            <p className="text-sm font-medium opacity-90">Overall Percentage</p>
            <p className="text-5xl font-bold mt-2">{percentage}%</p>
            <div className="mt-4 w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-xl">
          <div className="text-center">
            <p className="text-sm font-medium opacity-90">Cumulative GPA</p>
            <p className="text-5xl font-bold mt-2">{gpa}</p>
            <p className="text-sm mt-4 opacity-80">Out of 10.0</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl">
          <div className="text-center">
            <p className="text-sm font-medium opacity-90">Class Rank</p>
            <p className="text-5xl font-bold mt-2">12<span className="text-2xl">th</span></p>
            <p className="text-sm mt-4 opacity-80">Out of 120 students</p>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="card shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Subject-wise Performance</h3>
        <div className="space-y-4">
          {subjects.map((subject, idx) => (
            <div 
              key={idx}
              className="group bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/40 rounded-xl flex items-center justify-center text-2xl">
                    {subject.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{subject.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Semester 5</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{subject.marks}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">out of {subject.total}</p>
                  </div>
                  <div className={`px-6 py-3 bg-gradient-to-r ${getGradeColor(subject.grade)} text-white rounded-xl font-bold text-xl min-w-[80px] text-center shadow-lg`}>
                    {subject.grade}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r ${getGradeColor(subject.grade)} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${(subject.marks / subject.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Strengths
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span> Excellent in Chemistry (92%)
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span> Strong in Mathematics (88%)
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span> Good Computer Science skills
            </li>
          </ul>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Areas to Improve
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-orange-500">!</span> Focus more on Physics
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-orange-500">!</span> Improve English scores
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-orange-500">!</span> Practice problem-solving
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Documents Tab
const StudentDocuments = () => {
  const documents = [
    { 
      id: 1, 
      name: 'Admit Card - Semester 5', 
      type: 'PDF', 
      size: '245 KB', 
      date: 'Oct 15, 2024',
      category: 'Academic',
      icon: '🎫',
      color: 'blue'
    },
    { 
      id: 2, 
      name: 'Marksheet - Semester 4', 
      type: 'PDF', 
      size: '180 KB', 
      date: 'Sep 28, 2024',
      category: 'Academic',
      icon: '📊',
      color: 'green'
    },
    { 
      id: 3, 
      name: 'Student ID Card', 
      type: 'PDF', 
      size: '520 KB', 
      date: 'Aug 10, 2024',
      category: 'Identity',
      icon: '🪪',
      color: 'purple'
    },
    { 
      id: 4, 
      name: 'Fee Receipt - Q2', 
      type: 'PDF', 
      size: '95 KB', 
      date: 'Oct 31, 2024',
      category: 'Financial',
      icon: '🧾',
      color: 'orange'
    },
  ];

  const assignments = [
    { name: 'Mathematics Assignment 3', deadline: 'Nov 15, 2024', status: 'pending' },
    { name: 'Physics Lab Report', deadline: 'Nov 12, 2024', status: 'pending' },
    { name: 'Chemistry Project', deadline: 'Nov 20, 2024', status: 'submitted' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Documents & Files</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Access and manage all your academic documents</p>
      </div>

      {/* Upload Section */}
      <div className="card bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-2 border-dashed border-primary-300 dark:border-primary-700 shadow-lg">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Upload Assignment</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Drag and drop files here or click to browse</p>
          <div className="flex items-center justify-center gap-4">
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
            />
            <label 
              htmlFor="file-upload"
              className="cursor-pointer px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 font-medium"
            >
              Choose File
            </label>
            <button className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 font-medium">
              Upload
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
        </div>
      </div>

      {/* Assignments Status */}
      <div className="card shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Pending Assignments
        </h3>
        <div className="space-y-3">
          {assignments.map((assignment, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl border-2 ${
                assignment.status === 'submitted'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">{assignment.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Deadline: {assignment.deadline}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  assignment.status === 'submitted'
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 text-white'
                }`}>
                  {assignment.status === 'submitted' ? '✓ Submitted' : '⏱ Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="card shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">My Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div 
              key={doc.id}
              className="group bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-${doc.color}-100 dark:bg-${doc.color}-900/40 rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {doc.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 dark:text-white truncate">{doc.name}</h4>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {doc.type}
                    </span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full bg-${doc.color}-100 dark:bg-${doc.color}-900/40 text-${doc.color}-700 dark:text-${doc.color}-400 font-medium`}>
                      {doc.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{doc.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { currentUser } = useContext(AuthContext);

  const menuItems = [
    {
      name: 'Overview',
      path: '/student-dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      name: 'Attendance',
      path: '/student-dashboard/attendance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Timetable',
      path: '/student-dashboard/timetable',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Fees',
      path: '/student-dashboard/fees',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Academic Performance',
      path: '/student-dashboard/performance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
    {
      name: 'Documents',
      path: '/student-dashboard/documents',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Announcements',
      path: '/student-dashboard/announcements',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.757 15.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM4 10a1 1 0 01-1-1V8a1 1 0 012 0v1a1 1 0 01-1 1zM5.757 4.343a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM12 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      {isSidebarOpen && (
        <Sidebar menuItems={menuItems} />
      )}
      
      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out`}>
        {/* Header */}
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
                    <p className="text-sm font-medium text-gray-700 dark:text-white">{currentUser?.name || 'Student'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{currentUser?.role || 'Student'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<StudentOverview />} />
            <Route path="/attendance" element={<StudentAttendance />} />
            <Route path="/timetable" element={<StudentTimetable />} />
            <Route path="/fees" element={<StudentFees />} />
            <Route path="/performance" element={<StudentPerformance />} />
            <Route path="/documents" element={<StudentDocuments />} />
            <Route path="/announcements" element={<StudentAnnouncements />} />
            <Route path="*" element={<div className="text-center text-lg mt-8">Page under construction 🚧</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
