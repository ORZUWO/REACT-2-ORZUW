import { create } from 'zustand';
import { api } from '../lib/axios';
import { cachedGet } from '../lib/apiCache';

export interface DirectoryUser {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  role: string;
  avatar?: string;
  title?: string;
  mutualConnections?: number;
}

export interface Invitation {
  id: number;
  senderId: number;
  senderName: string;
  senderTitle?: string;
  senderAvatar?: string;
  mutualConnections?: number;
}

interface ConnectionState {
  directoryUsers: DirectoryUser[];
  pendingInvitations: Invitation[];
  myConnections: DirectoryUser[];
  loading: boolean;
  error: string | null;

  fetchDirectory: () => Promise<void>;
  fetchPendingInvitations: () => Promise<void>;
  fetchMyConnections: () => Promise<void>;
  sendRequest: (userId: number) => Promise<void>;
  acceptRequest: (invitationId: number) => Promise<void>;
  ignoreRequest: (invitationId: number) => Promise<void>;
  removeConnection: (connectionId: number) => Promise<void>;
}

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  directoryUsers: [],
  pendingInvitations: [],
  myConnections: [],
  loading: false,
  error: null,

  fetchDirectory: async () => {
    set({ loading: true });
    try {
      const res = await cachedGet('/User/directory');
      const data = Array.isArray(res) ? res : (res?.data || []);
      
      const users = data.map((u: any) => ({
        ...u,
        title: u.title || (u.role === 'Organization' ? 'Tech Company' : 'Professional'),
        avatar: u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.fullName || u.id}`,
        mutualConnections: Math.floor(Math.random() * 30),
      }));

      set({ directoryUsers: users, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchPendingInvitations: async () => {
    set({ loading: true });
    try {
      const res = await cachedGet('/Connection/pending', 15000);
      const rawData = Array.isArray(res) ? res : (res?.data || []);
      
      const invitations: Invitation[] = rawData.map((inv: any) => ({
        id: inv.id,
        senderId: inv.requesterId || inv.senderId,
        senderName: inv.requester?.fullName || inv.sender?.fullName || "User",
        senderTitle: inv.requester?.title || inv.sender?.title || "Professional",
        senderAvatar: inv.requester?.avatar || inv.sender?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${inv.id}`,
        mutualConnections: Math.floor(Math.random() * 10)
      }));
      
      set({ pendingInvitations: invitations, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  fetchMyConnections: async () => {
    set({ loading: true });
    try {
      const res = await cachedGet('/Connection/all', 15000);
      const data = Array.isArray(res) ? res : (res?.data || []);
      
      const connections = data.map((c: any) => ({
        ...c,
        fullName: c.fullName || c.user?.fullName || "User",
        avatar: c.avatar || c.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.id}`
      }));

      set({ myConnections: connections, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  sendRequest: async (userId: number) => {
    try {
      await api.post(`/Connection/send/${userId}`);
    } catch (err) {
      console.error("Failed to send request", err);
    }
  },

  acceptRequest: async (invitationId: number) => {
    try {
      await api.post(`/Connection/accept/${invitationId}`);
      
      set(state => ({
        pendingInvitations: state.pendingInvitations.filter(inv => inv.id !== invitationId)
      }));
    } catch (err) {
      console.error("Failed to accept request", err);
      set(state => ({
        pendingInvitations: state.pendingInvitations.filter(inv => inv.id !== invitationId)
      }));
    }
  },

  ignoreRequest: async (invitationId: number) => {
    try {
      await api.post(`/Connection/reject/${invitationId}`);
      
      set(state => ({
        pendingInvitations: state.pendingInvitations.filter(inv => inv.id !== invitationId)
      }));
    } catch (err) {
      console.error("Failed to ignore request", err);
      set(state => ({
        pendingInvitations: state.pendingInvitations.filter(inv => inv.id !== invitationId)
      }));
    }
  },

  removeConnection: async (connectionId: number) => {
    try {
      await api.delete(`/Connection/${connectionId}`);
      
      set(state => ({
        myConnections: state.myConnections.filter(conn => conn.id !== connectionId)
      }));
    } catch (err) {
      console.error("Failed to remove connection", err);
      set(state => ({
        myConnections: state.myConnections.filter(conn => conn.id !== connectionId)
      }));
    }
  }
}));
