import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, MessageSquare } from 'lucide-react';
import { api } from '@/lib/axios';
import { useMessageStore } from '@/store/useMessageStore';
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

interface User {
  id: string;
  fullName: string;
  role: string;
  avatarUrl?: string;
}

export function UserDirectoryDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const { createConversation, setActiveConversation } = useMessageStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/User/directory');
        const data = response.data?.data || response.data || [];
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [open]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const organizations = filteredUsers.filter((u) => u.role === 'Organization');
  const candidates = filteredUsers.filter((u) => u.role === 'Candidate');

  const handleSelectUser = async (userId: string) => {
    console.log("Opening chat with:", userId);
    setOpen(false);
    const newConvoId = await createConversation(userId);
    if (newConvoId) {
      setActiveConversation(newConvoId);
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

  const renderUserItem = (user: User) => (
    <div
      key={user.id}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 cursor-pointer transition-all duration-200 group"
      onClick={() => handleSelectUser(user.id)}
    >
      <Avatar className="h-10 w-10 border border-muted/50 group-hover:border-[#0a66c2]/20 transition-colors">
        <AvatarImage src={user.avatarUrl} alt={user.fullName} />
        <AvatarFallback className="bg-[#0a66c2]/5 text-[#0a66c2] text-xs font-medium">
          {getInitials(user.fullName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-[#0a66c2] transition-colors">
          {user.fullName}
        </p>
      </div>
      <Badge 
        variant={user.role === 'Organization' ? 'default' : 'secondary'} 
        className={`shrink-0 shadow-sm ${user.role === 'Organization' ? 'bg-[#0a66c2] hover:bg-[#004182]' : ''}`}
      >
        {user.role}
      </Badge>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl border-gray-200 shadow-xl bg-white">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100 bg-gray-50/50">
          <DialogTitle className="text-xl font-bold text-gray-900 tracking-tight">New Message</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Select a connection to start a conversation.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 bg-gray-50/30 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-gray-200 shadow-sm focus-visible:ring-[#0a66c2]/30 focus-visible:border-[#0a66c2] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 min-h-[350px]">
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
              <p className="text-sm text-gray-500 mt-1 max-w-[200px]">
                We couldn't find anyone matching "{search}"
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {organizations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-3 flex items-center gap-2">
                    Organizations
                    <span className="h-px flex-1 bg-gray-100"></span>
                  </h4>
                  <div className="space-y-1">
                    {organizations.map(renderUserItem)}
                  </div>
                </div>
              )}
              
              {candidates.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-3 flex items-center gap-2">
                    Candidates
                    <span className="h-px flex-1 bg-gray-100"></span>
                  </h4>
                  <div className="space-y-1">
                    {candidates.map(renderUserItem)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
