import React, { useState } from 'react';

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Mid-Term Exams Schedule',
      message: 'Mid-term exams will begin on November 15th. Exam timings and class-wise schedules will be posted soon.',
      teacher: 'Prof. Rajesh Kumar',
      class: 'Mathematics',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      isNew: false
    },
    {
      id: 2,
      title: 'Updated Course Material',
      message: 'New lecture notes and slides for Advanced Calculus have been uploaded. Please download from the portal.',
      teacher: 'Prof. Rajesh Kumar',
      class: 'Mathematics',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      isNew: false
    },
    {
      id: 3,
      title: 'Assignment Submission Deadline Extended',
      message: 'Due to technical issues, the deadline for Data Structures assignment has been extended to Nov 18th.',
      teacher: 'Prof. Priya Sharma',
      class: 'Computer Science',
      date: new Date().toLocaleDateString(),
      isNew: true
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const markAsRead = (id) => {
    setAnnouncements(announcements.map(ann =>
      ann.id === id ? { ...ann, isNew: false } : ann
    ));
  };

  const filteredAnnouncements =
    filter === 'new' ? announcements.filter(a => a.isNew) : announcements;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Announcements</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Stay updated with class announcements</p>
      </div>

      {/* Announcement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Announcements</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-1">{announcements.length}</p>
            </div>
            <div className="w-14 h-14 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Unread</p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-300 mt-1">{announcements.filter(a => a.isNew).length}</p>
            </div>
            <div className="w-14 h-14 bg-red-500 dark:bg-red-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Classes</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">{new Set(announcements.map(a => a.class)).size}</p>
            </div>
            <div className="w-14 h-14 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2v-5.5a2.5 2.5 0 015 0V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            filter === 'all'
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All Announcements
        </button>
        <button
          onClick={() => setFilter('new')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            filter === 'new'
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          New ({announcements.filter(a => a.isNew).length})
        </button>
      </div>

      {/* Announcements List */}
      {selectedAnnouncement ? (
        // Detailed View
        <div className="card shadow-xl">
          <button
            onClick={() => setSelectedAnnouncement(null)}
            className="mb-6 flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Announcements
          </button>

          <div className="border-b-2 border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedAnnouncement.title}
                </h3>
                <div className="flex items-center gap-3 mt-3">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 text-sm font-semibold rounded-full">
                    {selectedAnnouncement.class}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Posted on {selectedAnnouncement.date}
                  </span>
                </div>
              </div>
              {selectedAnnouncement.isNew && (
                <span className="px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 font-bold text-sm rounded-lg">
                  NEW
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {selectedAnnouncement.message}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              From: <span className="font-semibold text-gray-900 dark:text-white">{selectedAnnouncement.teacher}</span>
            </p>
          </div>

          {selectedAnnouncement.isNew && (
            <button
              onClick={() => {
                markAsRead(selectedAnnouncement.id);
                setSelectedAnnouncement(null);
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
            >
              Mark as Read
            </button>
          )}
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No announcements to display</p>
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                onClick={() => {
                  markAsRead(announcement.id);
                  setSelectedAnnouncement(announcement);
                }}
                className={`card cursor-pointer transition-all duration-200 ${
                  announcement.isNew
                    ? 'border-2 border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20 hover:shadow-lg hover:-translate-y-1'
                    : 'border-2 border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`font-bold text-lg ${
                        announcement.isNew
                          ? 'text-red-700 dark:text-red-400'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {announcement.title}
                      </h4>
                      {announcement.isNew && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className={`mb-3 line-clamp-2 ${
                      announcement.isNew
                        ? 'text-red-800 dark:text-red-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {announcement.message}
                    </p>

                    <div className="flex items-center gap-4 flex-wrap text-sm">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-full font-semibold">
                        {announcement.class}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">From:</span> {announcement.teacher}
                      </span>
                      <span className="text-gray-500 dark:text-gray-500">
                        {announcement.date}
                      </span>
                    </div>
                  </div>

                  <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudentAnnouncements;
