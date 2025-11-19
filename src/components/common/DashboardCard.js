import React from 'react';

const DashboardCard = ({ title, value, icon, color, onClick }) => {
  return (
    <div
      className={`card cursor-pointer hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;