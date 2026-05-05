import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import NotificationSidebar from '../components/notifications/NotificationSidebar';
import NotificationCard from '../components/notifications/NotificationCard';
import NewsSidebar from '../components/feed/NewsSidebar';
import { useNotificationStore } from '../store/useNotificationStore';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    notifications, 
    loading, 
    error, 
    fetchNotifications, 
    markAsRead, 
    deleteNotification 
  } = useNotificationStore();

  useEffect(() => {
    const userId = user?.id || 22; 
    fetchNotifications(userId);
  }, [fetchNotifications, user]);

  return (
    <div className="min-h-screen bg-[#f4f2ee] font-sans selection:bg-[#0a66c2]/20">
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto pt-[72px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
          
          
          <div className="hidden lg:block lg:col-span-3">
            <NotificationSidebar />
          </div>

          
          <div className="col-span-1 lg:col-span-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
              {loading && notifications.length === 0 ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 text-[#0a66c2] animate-spin" />
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-600">
                  <p>{error}</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="No notifications" className="w-12 h-12 opacity-50" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No new notifications</h3>
                  <p>You're all caught up! Check back later for new alerts.</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {notifications.map((notification) => (
                    <NotificationCard 
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          
          <div className="hidden lg:block lg:col-span-3">
            <NewsSidebar />
          </div>

        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
