import { create } from 'zustand';
import { api } from '../lib/axios';

export type Notification = {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link: string;
  createdAt: string;
};

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  fetchNotifications: (userId: number) => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async (userId: number) => {
    set({ loading: true, error: null });
    try {
      
      const response = await api.get(`/Notification/paged?userId=${userId}`);
      
      const items = response.data?.items || response.data || [];
      set({ notifications: items, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch notifications',
        loading: false 
      });
    }
  },

  markAsRead: async (id: number) => {
    try {
      await api.patch(`/Notification/${id}/read`);
      set({
        notifications: get().notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
      });
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  },

  markAllAsRead: async () => {
    try {
      await api.post('/Notification/read-all');
      set({
        notifications: get().notifications.map((n) => ({ ...n, isRead: true })),
      });
    } catch (error) {
      console.error('Failed to mark all notifications as read', error);
    }
  },

  deleteNotification: async (id: number) => {
    try {
      await api.delete(`/Notification/${id}`);
      set({
        notifications: get().notifications.filter((n) => n.id !== id),
      });
    } catch (error) {
      console.error('Failed to delete notification', error);
    }
  },
}));
