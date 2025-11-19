import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = ({ menuItems }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="h-screen bg-white dark:bg-gray-900 w-64 fixed left-0 top-0 overflow-y-auto transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-center mb-8 mt-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">College Portal</h1>
        </div>
        
        <div className="mb-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentUser?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <h3 className="text-gray-800 dark:text-white font-medium">{currentUser?.name || 'User'}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{currentUser?.role || 'Role'}</p>
        </div>
        
          <nav className="flex-grow">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    location.pathname === item.path ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto pb-4">
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;