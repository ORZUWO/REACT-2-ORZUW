import React from 'react';
import { Bell, AtSign, Briefcase, Settings } from 'lucide-react';

const NotificationSidebar: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-[88px]">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your alerts</p>
      </div>

      <div className="flex flex-col py-2">
        <button className="flex items-center gap-3 px-4 py-3 bg-[#f4f2ee] border-l-4 border-[#0a66c2] text-gray-900 w-full text-left font-medium transition-colors">
          <Bell className="w-5 h-5 text-[#0a66c2]" />
          <span>All Notifications</span>
        </button>

        <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-l-4 border-transparent text-gray-600 w-full text-left font-medium transition-colors">
          <AtSign className="w-5 h-5 text-gray-500" />
          <span>Mentions</span>
        </button>

        <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-l-4 border-transparent text-gray-600 w-full text-left font-medium transition-colors">
          <Briefcase className="w-5 h-5 text-gray-500" />
          <span>Job Alerts</span>
        </button>

        <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-l-4 border-transparent text-gray-600 w-full text-left font-medium transition-colors">
          <Settings className="w-5 h-5 text-gray-500" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationSidebar;
