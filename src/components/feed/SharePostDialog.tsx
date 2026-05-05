import React, { useState, useEffect, useMemo } from 'react';
import { Search, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '@/lib/axios';
import { cachedGet } from '@/lib/apiCache';
import { useMessageStore } from '@/store/useMessageStore';
import type { Post } from '@/store/usePostStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  fullName: string;
  role: string;
  avatarUrl?: string;
}

interface SharePostDialogProps {
  post: Post;
  children: React.ReactNode;
}

export function SharePostDialog({ post, children }: SharePostDialogProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  
  const { createConversation, sendMessage } = useMessageStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await cachedGet('/User/directory');
        const usersList = Array.isArray(data) ? data : (data?.data || []);
        setUsers(usersList);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchUsers();
      setSentIds(new Set());
    }
  }, [open]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleShare = async (user: User) => {
    if (sentIds.has(user.id)) return;
    
    setSendingId(user.id);
    try {
      // 1. Create or get conversation
      const convoId = await createConversation(user.id);
      
      // 2. Format the message content
      const postPreview = post.content.length > 50 
        ? post.content.substring(0, 50) + "..." 
        : post.content;
        
      const shareMessage = `Check out this post from ${post.author?.name || 'someone'}:\n\n"${postPreview}"\n\nView post: /feed#post-${post.id}`;
      
      // 3. Send message
      await sendMessage(convoId, shareMessage);
      
      // 4. Update state
      setSentIds(prev => new Set(prev).add(user.id));
      toast.success(`Post shared with ${user.fullName}`);
    } catch (error) {
      console.error("Failed to share post:", error);
      toast.error("Failed to share post. Please try again.");
    } finally {
      setSendingId(null);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderUserItem = (user: User) => {
    const isSent = sentIds.has(user.id);
    const isSending = sendingId === user.id;

    return (
      <div
        key={user.id}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-all duration-200 group"
      >
        <Avatar className="h-10 w-10 border border-muted/50 group-hover:border-[#0a66c2]/20 transition-colors">
          <AvatarImage src={user.avatarUrl} alt={user.fullName} />
          <AvatarFallback className="bg-[#0a66c2]/5 text-[#0a66c2] text-xs font-medium">
            {getInitials(user.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-[#0a66c2] transition-colors">
            {user.fullName}
          </p>
          <p className="text-[11px] text-gray-500 truncate">{user.role}</p>
        </div>
        
        <button
          onClick={() => handleShare(user)}
          disabled={isSent || isSending}
          className={`
            px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2
            ${isSent 
              ? 'bg-green-50 text-green-600 border border-green-200' 
              : 'bg-white border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2]/5 active:scale-95 disabled:opacity-50'}
          `}
        >
          {isSending ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : isSent ? (
            <>
              <CheckCircle2 className="h-3 w-3" />
              Sent
            </>
          ) : (
            'Send'
          )}
        </button>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl border-gray-200 shadow-xl bg-white">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100 bg-gray-50/50">
          <DialogTitle className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Send className="w-5 h-5 text-[#0a66c2]" />
            Send Post
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Share this post with your connections.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 bg-gray-50/30 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-gray-200 shadow-sm focus-visible:ring-[#0a66c2]/30 focus-visible:border-[#0a66c2] transition-all rounded-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 min-h-[350px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 gap-4">
              <div className="h-8 w-8 rounded-full border-2 border-[#0a66c2]/30 border-t-[#0a66c2] animate-spin" />
              <span className="text-sm font-medium text-gray-500 animate-pulse">Loading directory...</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
              <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3 text-gray-400 shadow-sm">
                <Search className="h-5 w-5" />
              </div>
              <p className="text-base font-bold text-gray-900">No users found</p>
            </div>
          ) : (
            <div className="py-2">
               {filteredUsers.map(renderUserItem)}
            </div>
          )}
        </div>
        
        {/* Footer with a preview of what's being sent */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm">
             {post.image || post.imageUrl ? (
               <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  <img src={post.image || post.imageUrl} className="w-full h-full object-cover" alt="Post preview" />
               </div>
             ) : (
               <div className="w-12 h-12 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center shrink-0">
                  <Send className="w-6 h-6 text-[#0a66c2]" />
               </div>
             )}
             <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sharing Post</p>
                <p className="text-[12px] text-gray-700 truncate font-medium">
                  {post.content || "No content"}
                </p>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
