import { create } from "zustand";
import { api } from "../lib/axios";
import { cachedGet } from "../lib/apiCache";
import { useAuthStore } from "./useAuthStore";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName?: string;
  content: string;
  createdAt: string;
  isOwn?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantTitle?: string;
  participantAvatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface MessageState {
  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  loading: boolean;
  loadingMessages: boolean;
  error: string | null;

  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  setActiveConversation: (id: string) => void;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  createConversation: (participantId: string) => Promise<string>;
  deleteConversation: (id: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: [],
  messages: [],
  activeConversationId: null,
  loading: false,
  loadingMessages: false,
  error: null,

  fetchConversations: async () => {
    set({ loading: true });
    try {
      const data = await cachedGet('/Conversation');
      const rawData = Array.isArray(data) ? data : (data?.data || []);

      const currentUser = useAuthStore.getState().user;
      

      let directory: any[] = [];
      try {
        const dirData = await cachedGet('/User/directory');
        directory = Array.isArray(dirData) ? dirData : (dirData?.data || []);
      } catch (e) {
        console.error("Could not fetch directory for names", e);
      }

      const convos: Conversation[] = rawData.map((c: any) => {
        const currentUser = useAuthStore.getState().user;
        

        const otherUser = c.otherUser || c.participant || 
                         (c.user1?.id?.toString() === currentUser?.id?.toString() ? c.user2 : c.user1) ||
                         c.user;
                         
        const otherId = c.otherUserId || otherUser?.id || c.participantId || c.receiverId;
        

        const dirUser = directory.find(u => u.id?.toString() === otherId?.toString());

        const name = otherUser?.fullName || otherUser?.name || dirUser?.fullName || c.participantName || `User ${otherId || ''}`.trim();
        const title = otherUser?.title || otherUser?.role || dirUser?.title || c.participantTitle || "";
        const avatar = otherUser?.avatarUrl || otherUser?.avatar || dirUser?.avatarUrl || c.participantAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
        
        return {
          id: c.id?.toString(),
          participantId: otherId?.toString() || c.userId?.toString(),
          participantName: name,
          participantTitle: title,
          participantAvatar: avatar,
          lastMessage: c.lastMessage?.content || c.lastMessage || c.lastMessageContent || "",
          lastMessageTime: c.lastMessage?.createdAt || c.lastMessageTime || c.updatedAt || "",
          unreadCount: c.unreadCount ?? 0,
        };
      });

    
      const currentActiveId = get().activeConversationId;
      const currentConvos = get().conversations;
      const activeTemp = currentConvos.find(c => (c.id === currentActiveId || c.participantId === currentActiveId) && !convos.find(nc => nc.id === c.id || nc.participantId === c.participantId));
      
      const finalConvos = activeTemp ? [activeTemp, ...convos] : convos;

      set({ conversations: finalConvos, loading: false });
    } catch {
      
      try {
        const userRes = await cachedGet('/User/directory');
        const users = Array.isArray(userRes) ? userRes : (userRes?.data || []);

        const convos: Conversation[] = users.slice(0, 6).map((u: any, i: number) => ({
          id: u.id?.toString(),
          participantId: u.id?.toString(),
          participantName: u.fullName || u.userName || "User",
          participantTitle: u.role || "Professional",
          participantAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.fullName || u.id}`,
          lastMessage: "",
          lastMessageTime: "",
          unreadCount: 0,
        }));

        set({ conversations: convos, loading: false });
      } catch {
        set({ conversations: [], loading: false });
      }
    }
  },

  fetchMessages: async (conversationId: string) => {
    set({ loadingMessages: true, activeConversationId: conversationId });
    try {
      const res = await api.get(`/Message/by-conversation/${conversationId}`);
      const rawData = Array.isArray(res.data) ? res.data : (res.data?.data || []);

      const msgs: Message[] = rawData.map((m: any) => ({
        id: m.id?.toString(),
        conversationId: m.conversationId?.toString() || conversationId,
        senderId: m.senderId?.toString() || m.userId?.toString(),
        senderName: m.senderName || m.user?.fullName,
        content: m.content || m.text || m.body || "",
        createdAt: m.createdAt || m.sentAt || "",
        isOwn: m.isOwn ?? m.isMine ?? false,
      }));

      set({ messages: msgs, loadingMessages: false });
    } catch {
      set({ messages: [], loadingMessages: false });
    }
  },

  setActiveConversation: (id: string) => {
    set({ activeConversationId: id });
    get().fetchMessages(id);
  },

  sendMessage: async (conversationId: string, content: string) => {
    let actualConvoId = conversationId;
    
    
    const convo = get().conversations.find(c => c.id === conversationId);
    if (convo && convo.id === convo.participantId) {
      try {
        const res = await api.post('/Conversation', { otherUserId: parseInt(convo.participantId) });
        actualConvoId = (res.data?.id || res.data?.conversationId || conversationId).toString();
      } catch (e) {
        console.error("Still failed to create conversation on backend, sending with temp ID", e);
      }
    }

    try {
      
      const res = await api.post('/Message', {
        conversationId: parseInt(actualConvoId),
        content: content,
        text: content,
        body: content,
        receiverId: parseInt(convo?.participantId || "0")
      });

      const newMsg: Message = {
        id: res.data?.id?.toString() || Date.now().toString(),
        conversationId: actualConvoId,
        senderId: "me",
        content,
        createdAt: new Date().toISOString(),
        isOwn: true,
      };

      set((state) => ({
        messages: [...state.messages, newMsg],
        conversations: state.conversations.map(c => 
          c.id === conversationId ? { ...c, id: actualConvoId, lastMessage: content, lastMessageTime: new Date().toISOString() } : c
        ),
        activeConversationId: state.activeConversationId === conversationId ? actualConvoId : state.activeConversationId
      }));
    } catch (err) {
      console.error('Failed to send message:', err);
      const newMsg: Message = {
        id: Date.now().toString(),
        conversationId: actualConvoId,
        senderId: "me",
        content,
        createdAt: new Date().toISOString(),
        isOwn: true,
      };
      set((state) => ({
        messages: [...state.messages, newMsg],
      }));
    }
  },

  deleteMessage: async (messageId: string) => {
    try {
      await api.delete(`/Message/${messageId}`);
      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== messageId),
      }));
    } catch (err) {
      console.error('Failed to delete message:', err);
      
      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== messageId),
      }));
    }
  },

  createConversation: async (participantId: string) => {
    try {
      
      if (get().conversations.length === 0) {
        await get().fetchConversations();
      }
      
      const existing = get().conversations.find(c => c.participantId === participantId);
      if (existing) return existing.id;

      
      let newConvoId = null;
      try {
        
        const res = await api.post('/Conversation', { 
          otherUserId: parseInt(participantId),
          userId: parseInt(participantId),
          participantId: parseInt(participantId)
        });
        newConvoId = res.data?.id?.toString() || res.data?.conversationId?.toString();
        // Refresh conversations list to include the new one
        await get().fetchConversations();
      } catch (e) {
        console.error("Backend failed to create conversation, using temporary logic", e);
      }
      
      
      const alreadyInList = get().conversations.find(c => c.participantId === participantId || c.id === newConvoId);
      if (alreadyInList) return alreadyInList.id;

      
      let tempUser: any = null;
      try {
        const dirData = await cachedGet('/User/directory');
        const dir = Array.isArray(dirData) ? dirData : (dirData?.data || []);
        tempUser = dir.find((u: any) => u.id?.toString() === participantId);
      } catch {}

      const tempConvo: Conversation = {
        id: newConvoId || participantId,
        participantId: participantId,
        participantName: tempUser?.fullName || "User",
        participantTitle: tempUser?.role || "Professional",
        participantAvatar: tempUser?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${participantId}`,
        lastMessage: "",
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0
      };

      set(state => ({
        conversations: [tempConvo, ...state.conversations]
      }));

      return tempConvo.id;
    } catch (err) {
      console.error('Critical failure in createConversation:', err);
      return participantId;
    }
  },

  deleteConversation: async (id: string) => {
    try {
      await api.delete(`/Conversation/${id}`);
      set((state) => ({
        conversations: state.conversations.filter((c) => c.id !== id),
        activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
        messages: state.activeConversationId === id ? [] : state.messages
      }));
    } catch (err) {
      console.error('Failed to delete conversation:', err);
      
      set((state) => ({
        conversations: state.conversations.filter((c) => c.id !== id),
        activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
        messages: state.activeConversationId === id ? [] : state.messages
      }));
    }
  },
}));
