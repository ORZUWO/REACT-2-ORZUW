import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { useAIStore } from '../store/useAIStore';
import type { AIConversation } from '../store/useAIStore';
import { useAuthStore } from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Send, Plus, MessageSquare, Trash2, Loader2,
  Bot, User, Zap, BookOpen, Briefcase, Code, PenLine, FileText,
  ChevronRight, BrainCircuit, FileSearch, Mail, Target,
} from 'lucide-react';


type AITool = 'chat' | 'analyze-cv' | 'skill-gap' | 'improve-job' | 'cover-letter' | 'draft-message';

const toolTabs: { id: AITool; label: string; icon: any; description: string }[] = [
  { id: 'chat', label: 'Ask AI', icon: BrainCircuit, description: 'Ask any career question' },
  { id: 'analyze-cv', label: 'Analyze CV', icon: FileSearch, description: 'Get CV feedback' },
  { id: 'cover-letter', label: 'Cover Letter', icon: PenLine, description: 'Generate cover letter' },
  { id: 'improve-job', label: 'Improve Job', icon: Briefcase, description: 'Optimize job posting' },
  { id: 'skill-gap', label: 'Skill Gap', icon: Target, description: 'Find missing skills' },
  { id: 'draft-message', label: 'Draft Message', icon: Mail, description: 'Write a message' },
];

const AIPage: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    streaming,
    createConversation,
    setActiveConversation,
    deleteConversation,
    askQuestion,
    analyzeCv,
    getSkillGap,
    improveJob,
    draftCoverLetter,
    draftMessage,
  } = useAIStore();

  const authUser = useAuthStore((s) => s.user);
  const userId = authUser?.id || authUser?.userId;

  const [activeTool, setActiveTool] = useState<AITool>('chat');
  const [input, setInput] = useState('');

  
  const [jobId, setJobId] = useState('');
  const [toUserId, setToUserId] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeConvo = conversations.find(c => c.id === activeConversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConvo?.messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeConversationId, activeTool]);

  const handleSend = async () => {
    if (streaming) return;

    switch (activeTool) {
      case 'chat':
        if (!input.trim()) return;
        await askQuestion(input.trim());
        break;

      case 'analyze-cv':
        if (!input.trim()) return;
        await analyzeCv(input.trim());
        break;

      case 'improve-job':
        if (!input.trim()) return;
        await improveJob(input.trim());
        break;

      case 'skill-gap':
        if (!jobId.trim() || !userId) return;
        await getSkillGap(Number(userId), Number(jobId));
        break;

      case 'cover-letter':
        if (!jobId.trim() || !userId) return;
        await draftCoverLetter(Number(jobId), Number(userId));
        break;

      case 'draft-message':
        if (!toUserId.trim() || !input.trim()) return;
        await draftMessage(Number(toUserId), input.trim());
        break;
    }

    setInput('');
    setJobId('');
    setToUserId('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    createConversation();
  };

  const getPlaceholder = (): string => {
    switch (activeTool) {
      case 'chat': return 'Ask any career question...';
      case 'analyze-cv': return 'Paste your CV/resume text here...';
      case 'improve-job': return 'Paste job description to improve...';
      case 'draft-message': return 'Describe the context for the message...';
      default: return 'Type here...';
    }
  };

  const needsJobId = activeTool === 'skill-gap' || activeTool === 'cover-letter';
  const needsToUserId = activeTool === 'draft-message';
  const needsTextInput = activeTool === 'chat' || activeTool === 'analyze-cv' || activeTool === 'improve-job' || activeTool === 'draft-message';

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="pt-[52px] flex h-[calc(100vh-52px)]">
        
        <div className="w-[300px] bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-sm z-10">
          
          <div className="p-4">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#0a66c2] text-white rounded-xl hover:bg-[#004182] 
                         transition-all duration-300 group shadow-md shadow-blue-500/10 active:scale-95"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center transition-transform group-hover:rotate-90">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight">New Conversation</span>
            </button>
          </div>

          
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
            {conversations.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-xs font-semibold text-gray-400">Your history will appear here</p>
              </div>
            ) : (
              conversations.map(convo => (
                <SidebarConvo
                  key={convo.id}
                  convo={convo}
                  isActive={convo.id === activeConversationId}
                  onClick={() => setActiveConversation(convo.id)}
                  onDelete={() => deleteConversation(convo.id)}
                />
              ))
            )}
          </div>

          
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0a66c2] to-[#378fe9] flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-gray-900 leading-tight">AI Assistant</p>
                <p className="text-[11px] text-gray-500 font-medium">Pro Version Active</p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="flex-1 flex flex-col bg-white relative">
          
          <div className="h-16 border-b border-gray-100 flex items-center px-6 gap-2 bg-white/80 backdrop-blur-md sticky top-0 z-20 shrink-0 overflow-x-auto no-scrollbar">
            {toolTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTool(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-[13px] font-bold transition-all whitespace-nowrap border ${
                  activeTool === tab.id
                    ? 'bg-[#0a66c2] text-white border-[#0a66c2] shadow-sm shadow-blue-500/20'
                    : 'text-gray-600 hover:bg-gray-100 border-gray-200'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTool === tab.id ? 'text-white' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeConvo && activeConvo.messages.length > 0 ? (
            <>
              
              <div className="flex-1 overflow-y-auto bg-gray-50/30">
                <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
                  {activeConvo.messages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className={`flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${
                        msg.role === 'user'
                          ? 'bg-white border-gray-200'
                          : 'bg-gradient-to-br from-[#0a66c2] to-[#004182] border-transparent'
                      }`}>
                        {msg.role === 'user' 
                          ? <User className="w-5 h-5 text-gray-600" />
                          : <Bot className="w-5 h-5 text-white" />
                        }
                      </div>

                      <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                        <div className={`px-5 py-4 rounded-3xl shadow-sm border ${
                          msg.role === 'user' 
                            ? 'bg-[#0a66c2] text-white border-[#0a66c2] rounded-tr-none' 
                            : 'bg-white text-gray-800 border-gray-200 rounded-tl-none'
                        }`}>
                          <div className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">
                            {msg.content}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 px-2">
                          {msg.role === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {streaming && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center shrink-0 shadow-sm">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-3xl rounded-tl-none px-6 py-4 flex items-center gap-3 shadow-sm">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-[#0a66c2] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-[#0a66c2] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-[#0a66c2] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-xs font-bold text-gray-500">Processing response...</span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
            </>
          ) : (
            
            <div className="flex-1 flex items-center justify-center overflow-auto bg-gray-50/50">
              <div className="max-w-3xl mx-auto px-6 py-12 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-[#0a66c2]/10 rounded-[2.5rem] rotate-12 blur-sm" />
                    <div className="relative w-24 h-24 bg-gradient-to-br from-[#0a66c2] to-[#378fe9] rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-blue-500/20">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">AI-JOB Assistant</h1>
                  <p className="text-gray-500 text-lg mb-12 max-w-lg mx-auto font-medium">
                    Your intelligent career partner. Select a tool above to start transforming your career journey.
                  </p>
                </motion.div>

                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {toolTabs.map((tool, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveTool(tool.id); if (!activeConversationId) createConversation(); }}
                      className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-3xl 
                                 hover:border-[#0a66c2] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 text-left"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 
                                      group-hover:bg-[#0a66c2]/10 transition-all">
                        <tool.icon className="w-6 h-6 text-[#0a66c2]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[15px] font-bold text-gray-900 group-hover:text-[#0a66c2] transition-colors">{tool.label}</p>
                        <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">{tool.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#0a66c2] transition-colors shrink-0 mt-1" />
                    </button>
                  ))}
                </motion.div>
              </div>
            </div>
          )}

          
          <div className="shrink-0 bg-white border-t border-gray-100 p-6 z-20">
            <div className="max-w-4xl mx-auto space-y-4">

              
              {(needsJobId || needsToUserId) && (
                <div className="flex gap-4">
                  {needsJobId && (
                    <div className="flex-1">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block px-1">Job ID</label>
                      <input
                        type="number"
                        value={jobId}
                        onChange={e => setJobId(e.target.value)}
                        placeholder="Enter job ID..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm 
                                   text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#0a66c2] transition-all"
                      />
                    </div>
                  )}
                  {needsToUserId && (
                    <div className="flex-1">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block px-1">Recipient ID</label>
                      <input
                        type="number"
                        value={toUserId}
                        onChange={e => setToUserId(e.target.value)}
                        placeholder="Enter user ID..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm 
                                   text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#0a66c2] transition-all"
                      />
                    </div>
                  )}
                </div>
              )}

              
              {needsTextInput && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#0a66c2]/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-[2rem]" />
                  <div className="relative flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-[2rem] 
                                  group-focus-within:border-[#0a66c2] group-focus-within:bg-white transition-all duration-300 p-2 shadow-sm">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={getPlaceholder()}
                      rows={activeTool === 'analyze-cv' || activeTool === 'improve-job' ? 4 : 1}
                      className="flex-1 bg-transparent text-gray-800 placeholder:text-gray-400 px-6 py-4 
                                 resize-none focus:outline-none text-[16px] max-h-[300px] font-medium"
                      style={{ minHeight: '56px' }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={streaming || (!input.trim() && needsTextInput)}
                      className="w-12 h-12 bg-[#0a66c2] text-white rounded-full flex items-center justify-center 
                                 disabled:opacity-30 disabled:grayscale transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                      {streaming ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 translate-x-0.5 -translate-y-0.5 rotate-[15deg]" />}
                    </button>
                  </div>
                </div>
              )}

              {!needsTextInput && (
                <button
                  onClick={handleSend}
                  disabled={streaming || !jobId.trim()}
                  className="w-full py-4 bg-[#0a66c2] text-white font-bold rounded-2xl 
                             disabled:opacity-30 hover:bg-[#004182] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
                >
                  {streaming ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {activeTool === 'skill-gap' ? 'Run Skill Gap Analysis' : 'Generate Premium Cover Letter'}
                </button>
              )}

              <p className="text-[11px] font-bold text-gray-400 text-center uppercase tracking-widest">
                AI Assistant • Powered by Deep Learning • Use with human review
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};



const SidebarConvo: React.FC<{
  convo: AIConversation;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}> = ({ convo, isActive, onClick, onDelete }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 border ${
        isActive 
          ? 'bg-blue-50 border-blue-100 text-[#0a66c2]' 
          : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className={`w-2 h-2 rounded-full shrink-0 transition-all ${isActive ? 'bg-[#0a66c2] scale-100' : 'bg-gray-200 scale-50 group-hover:scale-75'}`} />
      <span className="text-[13.5px] truncate flex-1 font-bold tracking-tight">{convo.title}</span>
      
      <AnimatePresence>
        {hovering && (
          <motion.button
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIPage;
