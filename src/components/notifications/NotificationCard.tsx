import React, { useState } from 'react';
import { MoreHorizontal, Heart, MessageCircle, UserPlus, Eye, Briefcase, Trash2, CheckCircle } from 'lucide-react';
import { type Notification } from '../../store/useNotificationStore';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + 'y ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + 'mo ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + 'd ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + 'h ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + 'm ago';
  return Math.floor(seconds) + 's ago';
};

const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'like':
      return <div className="bg-red-500 rounded-full p-1 border-2 border-white absolute -bottom-1 -right-1"><Heart className="w-3 h-3 text-white fill-current" /></div>;
    case 'comment':
    case 'mention':
      return <div className="bg-orange-500 rounded-full p-1 border-2 border-white absolute -bottom-1 -right-1"><MessageCircle className="w-3 h-3 text-white fill-current" /></div>;
    case 'connection':
      return <div className="bg-[#0a66c2] rounded-full p-1 border-2 border-white absolute -bottom-1 -right-1"><UserPlus className="w-3 h-3 text-white" /></div>;
    case 'view':
      return <div className="bg-green-600 rounded-full p-1 border-2 border-white absolute -bottom-1 -right-1"><Eye className="w-3 h-3 text-white" /></div>;
    case 'job':
      return <div className="bg-purple-600 rounded-full p-1 border-2 border-white absolute -bottom-1 -right-1"><Briefcase className="w-3 h-3 text-white" /></div>;
    default:
      return <div className="bg-gray-500 rounded-full p-1 border-2 border-white absolute -bottom-1 -right-1"><Bell className="w-3 h-3 text-white" /></div>;
  }
};

const getAvatarSeed = (title: string, type: string) => {
  return `${title.replace(/\s/g, '')}${type}`;
};

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsRead, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on menu button
    if ((e.target as HTMLElement).closest('.menu-button') || (e.target as HTMLElement).closest('.dropdown-menu')) {
      return;
    }
    
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }

    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`relative p-4 flex gap-4 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0
        ${notification.isRead ? 'bg-white hover:bg-gray-50' : 'bg-[#eef3f8] hover:bg-[#e1e9f1]'}
      `}
    >
      {/* Unread Indicator */}
      {!notification.isRead && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0a66c2] rounded-full" />
      )}

      {/* Avatar with Type Icon */}
      <div className="relative shrink-0 ml-2">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(notification.title, notification.type)}`} 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        {getIconForType(notification.type)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-8">
        <p className="text-sm text-gray-900 leading-snug">
          <span className="font-semibold">{notification.title}</span>
          <span className="text-gray-600"> {notification.message}</span>
        </p>
      </div>

      {/* Time & Menu */}
      <div className="flex flex-col items-end shrink-0 gap-1">
        <span className="text-xs text-gray-500 whitespace-nowrap">{formatTimeAgo(notification.createdAt)}</span>
        
        <div className="relative">
          <button 
            className="menu-button p-1.5 text-gray-500 hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="dropdown-menu absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
              >
                {!notification.isRead && (
                  <button 
                    onClick={() => {
                      onMarkAsRead(notification.id);
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                    Mark as read
                  </button>
                )}
                <button 
                  onClick={() => {
                    onDelete(notification.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
