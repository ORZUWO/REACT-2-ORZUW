import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import { useMessageStore } from '../store/useMessageStore';
import type { Conversation } from '../store/useMessageStore';
import { useAuthStore } from '../store/useAuthStore';
import {
  MessageSquare, Users, Edit3, Search, Video, Phone, MoreVertical,
  Image, Paperclip, Smile, LayoutList, Send, Loader2, Trash2
} from 'lucide-react';
import { UserDirectoryDialog } from '../components/messaging/UserDirectoryDialog';

const MessagingPage: React.FC = () => {
  const {
    conversations,
    messages,
    activeConversationId,
    loading,
    loadingMessages,
    fetchConversations,
    setActiveConversation,
    sendMessage,
    deleteMessage,
    deleteConversation,
  } = useMessageStore();

  const authUser = useAuthStore((s) => s.user);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  
  useEffect(() => {
    if (conversations.length > 0 && !activeConversationId) {
      setActiveConversation(conversations[0].id);
    }
  }, [conversations, activeConversationId, setActiveConversation]);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeConvo = conversations.find(c => c.id === activeConversationId || c.participantId === activeConversationId);

  const handleSend = () => {
    if (!messageText.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, messageText.trim());
    setMessageText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ee] font-sans">
      <Navbar />

      <main className="max-w-[1200px] mx-auto pt-[72px] px-4 pb-8">
        <div className="grid grid-cols-12 gap-4 mt-4" style={{ height: 'calc(100vh - 100px)' }}>

          
          <div className="col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">Messaging</h2>
                  {conversations.length > 0 && (
                    <span className="bg-[#cc1016] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {conversations.length}
                    </span>
                  )}
                </div>
                <UserDirectoryDialog />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                  <Users className="w-4 h-4" /> Network
                </button>
              </div>

              
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/30 focus:border-[#0a66c2] transition-all"
                />
              </div>
            </div>

            
            <div className="px-4 pt-3 pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-700">Recent Chats</h3>
            </div>

            
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 text-[#0a66c2] animate-spin" />
                </div>
              ) : conversations.length > 0 ? (
                conversations.map((convo) => (
                  <ConversationItem
                    key={convo.id}
                    convo={convo}
                    isActive={convo.id === activeConversationId}
                    onClick={() => setActiveConversation(convo.id)}
                    onDelete={(e) => {
                      e.stopPropagation();
                      deleteConversation(convo.id);
                    }}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400 px-4 py-6 text-center italic">No conversations yet</p>
              )}
            </div>
          </div>

          
          <div className="col-span-6 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            {activeConvo ? (
              <>
                
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      <img src={activeConvo.participantAvatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900">{activeConvo.participantName}</h3>
                      <p className="text-[12px] text-gray-500">{activeConvo.participantTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[#f9fafb]">
                  {loadingMessages ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-6 h-6 text-[#0a66c2] animate-spin" />
                    </div>
                  ) : messages.length > 0 ? (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        {!msg.isOwn && (
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 mr-2 shrink-0 mt-1">
                            <img src={activeConvo.participantAvatar} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div
                          className={`group relative max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.isOwn
                              ? 'bg-[#0a66c2] text-white rounded-br-md'
                              : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md shadow-sm'
                          }`}
                        >
                          {msg.isOwn && (
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="absolute top-2 -left-8 p-1.5 bg-white border border-gray-200 text-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                              title="Delete message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <p>{msg.content}</p>
                          <p className={`text-[10px] mt-1 ${msg.isOwn ? 'text-white/70 text-right' : 'text-gray-400'}`}>
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-10 h-10 text-gray-300" />
                      </div>
                      <p className="text-gray-500 font-semibold">No messages yet</p>
                      <p className="text-sm text-gray-400 mt-1">Start a conversation with {activeConvo.participantName}</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                
                <div className="px-4 py-3 border-t border-gray-100">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl focus-within:border-[#0a66c2] focus-within:ring-2 focus-within:ring-[#0a66c2]/20 transition-all">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Write a message..."
                      rows={2}
                      className="w-full px-4 py-3 bg-transparent text-sm resize-none focus:outline-none placeholder:text-gray-400"
                    />
                    <div className="flex items-center justify-between px-3 pb-2">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500">
                          <Image className="w-5 h-5" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500">
                          <Paperclip className="w-5 h-5" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500">
                          <Smile className="w-5 h-5" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500">
                          <LayoutList className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        onClick={handleSend}
                        disabled={!messageText.trim()}
                        className="px-5 py-1.5 bg-[#0a66c2] text-white font-bold text-sm rounded-full hover:bg-[#004182] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>

          
          <div className="col-span-3 flex flex-col gap-4">
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[15px] font-bold text-gray-900">Pending Requests</h3>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Omar" alt="" className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900">Omar Kareem</h4>
                  <p className="text-[11px] text-gray-500 truncate">UX Lead at CreatiSoft</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2 ml-13">
                <button className="px-4 py-1 border-2 border-gray-400 text-gray-600 font-bold text-[13px] rounded-full hover:bg-gray-100 transition-colors">
                  Ignore
                </button>
                <button className="px-4 py-1 bg-[#0a66c2] text-white font-bold text-[13px] rounded-full hover:bg-[#004182] transition-colors">
                  Accept
                </button>
              </div>
            </div>

            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[15px] font-bold text-gray-900">Suggested</h3>
                <button className="text-sm font-bold text-[#0a66c2] hover:underline">VIEW ALL</button>
              </div>

              <div className="space-y-3">
                <SuggestedUser name="Elena Rodriguez" subtitle="Common: 12 connections" />
                <SuggestedUser name="Thomas Wright" subtitle="Software Eng at Stacked" />
              </div>
            </div>

            
            <div className="text-center text-[11px] text-gray-400 mt-2">
              <p>© 2024 PROCONNECT CORPORATION</p>
              <p className="mt-1">About · Privacy · Policy · Guidelines</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};



const ConversationItem: React.FC<{
  convo: Conversation;
  isActive: boolean;
  onClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}> = ({ convo, isActive, onClick, onDelete }) => (
  <div
    onClick={onClick}
    className={`group flex gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 relative ${
      isActive
        ? 'bg-blue-50/60 border-l-[#0a66c2]'
        : 'border-l-transparent hover:bg-gray-50'
    }`}
  >
    {onDelete && (
      <button
        onClick={onDelete}
        className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 text-red-500 bg-white shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
        title="Delete conversation"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    )}
    <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 shrink-0">
      <img src={convo.participantAvatar} alt="" className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <h4 className={`text-[13px] truncate ${isActive ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
          {convo.participantName}
        </h4>
        <span className="text-[11px] text-gray-400 shrink-0 ml-2">
          {convo.lastMessageTime ? formatTime(convo.lastMessageTime) : ''}
        </span>
      </div>
      <p className="text-[12px] text-gray-500 truncate mt-0.5 leading-tight">
        {convo.lastMessage || convo.participantTitle || 'Start chatting...'}
      </p>
    </div>
  </div>
);

const SuggestedUser: React.FC<{ name: string; subtitle: string }> = ({ name, subtitle }) => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden shrink-0">
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="" className="w-full h-full" />
    </div>
    <div className="min-w-0">
      <h4 className="text-sm font-semibold text-gray-900 truncate">{name}</h4>
      <p className="text-[11px] text-gray-500 truncate">{subtitle}</p>
    </div>
  </div>
);

function formatTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffH = Math.floor(diffMs / 3600000);

    if (diffH < 1) return 'Just now';
    if (diffH < 24) return `${diffH}h ago`;

    const diffD = Math.floor(diffH / 24);
    if (diffD === 1) return 'Yesterday';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export default MessagingPage;
