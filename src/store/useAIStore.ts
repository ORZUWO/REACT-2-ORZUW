import { create } from 'zustand';
import { api } from '../lib/axios';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  type?: 'ask' | 'analyze-cv' | 'skill-gap' | 'improve-job' | 'cover-letter' | 'draft-message';
}

export interface AIConversation {
  id: string;
  title: string;
  messages: AIMessage[];
  createdAt: string;
}

interface AIState {
  conversations: AIConversation[];
  activeConversationId: string | null;
  loading: boolean;
  streaming: boolean;

  createConversation: () => string;
  setActiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  clearAll: () => void;

    
  askQuestion: (question: string) => Promise<void>;
  analyzeCv: (cvText: string) => Promise<void>;
  getSkillGap: (userId: number, jobId: number) => Promise<void>;
  improveJob: (description: string) => Promise<void>;
  draftCoverLetter: (jobId: number, userId: number) => Promise<void>;
  draftMessage: (toUserId: number, context: string) => Promise<void>;
}


const STORAGE_KEY = 'ai-conversations';
const loadConversations = (): AIConversation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};
const saveConversations = (convos: AIConversation[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(convos));
};


function addUserMessage(set: any, get: any, content: string, type: AIMessage['type']): string {
  let convoId = get().activeConversationId;
  if (!convoId) {
    convoId = get().createConversation();
  }

  const userMsg: AIMessage = {
    id: `msg-${Date.now()}`,
    role: 'user',
    content,
    timestamp: new Date().toISOString(),
    type,
  };

  set((s: any) => {
    const convos = s.conversations.map((c: AIConversation) =>
      c.id === convoId
        ? { ...c, messages: [...c.messages, userMsg], title: c.messages.length === 0 ? content.slice(0, 50) : c.title }
        : c
    );
    saveConversations(convos);
    return { conversations: convos, streaming: true };
  });

  return convoId;
}


function addAssistantMessage(set: any, get: any, convoId: string, content: string) {
  const assistantMsg: AIMessage = {
    id: `msg-${Date.now() + 1}`,
    role: 'assistant',
    content,
    timestamp: new Date().toISOString(),
  };

  set((s: any) => {
    const convos = s.conversations.map((c: AIConversation) =>
      c.id === convoId ? { ...c, messages: [...c.messages, assistantMsg] } : c
    );
    saveConversations(convos);
    return { conversations: convos, streaming: false };
  });
}


function extractResponse(data: any): string {
  if (typeof data === 'string') return data;
  return data?.response || data?.result || data?.answer || data?.content || 
         data?.message || data?.text || data?.data?.response || data?.data?.result ||
         data?.data?.answer || data?.data?.content || data?.data?.message ||
         (typeof data?.data === 'string' ? data.data : null) ||
         JSON.stringify(data, null, 2);
}

export const useAIStore = create<AIState>((set, get) => ({
  conversations: loadConversations(),
  activeConversationId: null,
  loading: false,
  streaming: false,

  createConversation: () => {
    const newId = `ai-${Date.now()}`;
    const newConvo: AIConversation = {
      id: newId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
    };
    const updated = [newConvo, ...get().conversations];
    saveConversations(updated);
    set({ conversations: updated, activeConversationId: newId });
    return newId;
  },

  setActiveConversation: (id) => set({ activeConversationId: id }),

  deleteConversation: (id) => {
    const convos = get().conversations.filter(c => c.id !== id);
    saveConversations(convos);
    set({
      conversations: convos,
      activeConversationId: get().activeConversationId === id ? null : get().activeConversationId,
    });
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ conversations: [], activeConversationId: null });
  },

  
  askQuestion: async (question: string) => {
    const convoId = addUserMessage(set, get, question, 'ask');
    try {
      const res = await api.post('/Ai/ask', { question });
      addAssistantMessage(set, get, convoId, extractResponse(res.data));
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to get AI response';
      addAssistantMessage(set, get, convoId, `⚠️ Error: ${errMsg}\n\nThe AI service may be temporarily unavailable. Please try again later.`);
    }
  },

  
  analyzeCv: async (cvText: string) => {
    const convoId = addUserMessage(set, get, `📄 Analyze my CV:\n\n${cvText.slice(0, 200)}...`, 'analyze-cv');
    try {
      const res = await api.post('/Ai/analyze-cv', { cvText });
      addAssistantMessage(set, get, convoId, extractResponse(res.data));
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to analyze CV';
      addAssistantMessage(set, get, convoId, `⚠️ Error: ${errMsg}\n\nCould not analyze the CV. Please try again.`);
    }
  },

  
  getSkillGap: async (userId: number, jobId: number) => {
    const convoId = addUserMessage(set, get, `🔍 Analyze skill gap for Job #${jobId}`, 'skill-gap');
    try {
      const res = await api.get(`/Ai/skill-gap/${userId}/${jobId}`);
      addAssistantMessage(set, get, convoId, extractResponse(res.data));
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to analyze skill gap';
      addAssistantMessage(set, get, convoId, `⚠️ Error: ${errMsg}\n\nCould not perform skill gap analysis. Please try again.`);
    }
  },

  
  improveJob: async (description: string) => {
    const convoId = addUserMessage(set, get, `✏️ Improve job description:\n\n${description.slice(0, 200)}...`, 'improve-job');
    try {
      const res = await api.post('/Ai/improve-job', { description });
      addAssistantMessage(set, get, convoId, extractResponse(res.data));
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to improve job description';
      addAssistantMessage(set, get, convoId, `⚠️ Error: ${errMsg}\n\nCould not improve the description. Please try again.`);
    }
  },

  
  draftCoverLetter: async (jobId: number, userId: number) => {
    const convoId = addUserMessage(set, get, `📝 Draft cover letter for Job #${jobId}`, 'cover-letter');
    try {
      const res = await api.post('/Ai/draft-cover-letter', { jobId, userId });
      addAssistantMessage(set, get, convoId, extractResponse(res.data));
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to draft cover letter';
      addAssistantMessage(set, get, convoId, `⚠️ Error: ${errMsg}\n\nCould not generate the cover letter. Please try again.`);
    }
  },

  
  draftMessage: async (toUserId: number, context: string) => {
    const convoId = addUserMessage(set, get, `💬 Draft message to User #${toUserId}: "${context.slice(0, 100)}"`, 'draft-message');
    try {
      const res = await api.post('/Ai/draft-message', { toUserId, context });
      addAssistantMessage(set, get, convoId, extractResponse(res.data));
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to draft message';
      addAssistantMessage(set, get, convoId, `⚠️ Error: ${errMsg}\n\nCould not draft the message. Please try again.`);
    }
  },
}));
