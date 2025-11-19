import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/common/Sidebar';
import DashboardCard from '../components/common/DashboardCard';
import ThemeToggle from '../components/common/ThemeToggle';

// Icons
import { UserGroupIcon, ClipboardCheckIcon, AcademicCapIcon, CalendarIcon } from '@heroicons/react/outline';

const HODDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  
  // Mock data for dashboard
  const departmentStats = {
    totalTeachers: 24,
    totalStudents: 450,
    coursesOffered: 15,
    avgAttendance: '87%'
  };

  // Mock schedule data
  const todaySchedule = [
    { time: '09:00 AM', event: 'Department Meeting', location: 'Conference Room 2' },
    { time: '11:30 AM', event: 'Curriculum Review', location: 'HOD Office' },
    { time: '02:00 PM', event: 'Faculty Performance Review', location: 'Meeting Room 1' },
    { time: '04:30 PM', event: 'Student Representatives Meeting', location: 'Seminar Hall' }
  ];

  // Sidebar menu items
  const menuItems = [
    { name: 'Dashboard', path: '/hod', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
    { name: 'Faculty', path: '/hod/faculty', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg> },
    { name: 'Students', path: '/hod/students', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg> },
    { name: 'Courses', path: '/hod/courses', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg> },
    { name: 'Reports', path: '/hod/reports', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" /></svg> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar menuItems={menuItems} />
      
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Department Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, Dr. Vikram Mehta</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            title="Total Teachers" 
            value={departmentStats.totalTeachers} 
            icon={<UserGroupIcon className="h-6 w-6" />} 
            color="blue" 
          />
          <DashboardCard 
            title="Total Students" 
            value={departmentStats.totalStudents} 
            icon={<AcademicCapIcon className="h-6 w-6" />} 
            color="green" 
          />
          <DashboardCard 
            title="Courses Offered" 
            value={departmentStats.coursesOffered} 
            icon={<ClipboardCheckIcon className="h-6 w-6" />} 
            color="purple" 
          />
          <DashboardCard 
            title="Average Attendance" 
            value={departmentStats.avgAttendance} 
            icon={<CalendarIcon className="h-6 w-6" />} 
            color="yellow" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex-shrink-0 w-12 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.time}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white">{item.event}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Department Performance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Student Pass Rate</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">92%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Faculty Performance</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">88%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Research Publications</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">76%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '76%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Infrastructure Utilization</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">95%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HODDashboard;