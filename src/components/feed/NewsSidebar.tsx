import React, { useEffect, useState } from 'react';
import { Info, Plus, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { api } from '../../lib/axios';
import { cachedGet } from '../../lib/apiCache';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

interface DirectoryUser {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  role: string;
}

const NewsSidebar: React.FC = () => {
  const [users, setUsers] = useState<DirectoryUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [sentConnections, setSentConnections] = useState<number[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const currentUser = useAuthStore.getState().user;
        
        const [dirData, allData, pendingData] = await Promise.allSettled([
          cachedGet('/User/directory'),
          cachedGet('/Connection/all'),
          cachedGet('/Connection/pending')
        ]);

        let dirUsers = [];
        if (dirData.status === 'fulfilled') {
          dirUsers = Array.isArray(dirData.value) ? dirData.value : (dirData.value?.data || []);
        }

        const connectedUserIds = new Set<number>();
        if (currentUser?.id) connectedUserIds.add(Number(currentUser.id));

        const extractIds = (list: any[]) => {
          list.forEach(item => {
            if (!item) return;
            if (item.requesterId) connectedUserIds.add(item.requesterId);
            if (item.addresseeId) connectedUserIds.add(item.addresseeId);
            if (item.senderId) connectedUserIds.add(item.senderId);
            if (item.receiverId) connectedUserIds.add(item.receiverId);
            if (item.userId) connectedUserIds.add(item.userId);
            if (item.user?.id) connectedUserIds.add(item.user.id);
            if (item.requester?.id) connectedUserIds.add(item.requester.id);
            // If it seems to be a user object directly
            if (item.fullName || item.email) connectedUserIds.add(item.id);
          });
        };

        if (allData.status === 'fulfilled') {
          const all = Array.isArray(allData.value) ? allData.value : (allData.value?.data || []);
          extractIds(all);
        }

        if (pendingData.status === 'fulfilled') {
          const pending = Array.isArray(pendingData.value) ? pendingData.value : (pendingData.value?.data || []);
          extractIds(pending);
        }

        const filteredUsers = dirUsers.filter((u: any) => !connectedUserIds.has(u.id));
        setUsers(filteredUsers.slice(0, 5));
      } catch (err) {
        console.error("Failed to load users for sidebar", err);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (userId: number) => {
    setLoadingId(userId);
    try {
      await api.post(`/Connection/send/${userId}`);
      setSentConnections((prev) => [...prev, userId]);
      
      // Optionally remove them completely from the list right away
      setTimeout(() => {
        setUsers(prev => prev.filter(u => u.id !== userId));
      }, 1000);
    } catch (error: any) {
      console.error("Failed to send connection request", error);
      // If it's a 409, it means they are already followed, so just remove them
      if (error.response?.status === 409) {
        setUsers(prev => prev.filter(u => u.id !== userId));
      }
    } finally {
      setLoadingId(null);
    }
  };

  // Generate a color based on user id for the avatar background
  const getColor = (id: number) => {
    const colors = ['#0a66c2', '#057642', '#c37d16', '#b24020', '#7a3e98', '#004182'];
    return colors[id % colors.length];
  };

  return (
    <div className="flex flex-col gap-2">
      {/* LinkedIn News */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3">
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">LinkedIn News</h3>
          <Info className="w-4 h-4 text-gray-500 cursor-help" />
        </div>
        
        <ul className="space-y-3">
          <NewsItem 
            title="The most in-demand skills in 2024" 
            time="Top news" 
            readers="4,284 readers" 
          />
          <NewsItem 
            title="AI ethics: What you need to know" 
            time="2h ago" 
            readers="1,142 readers" 
          />
          <NewsItem 
            title="Hybrid work: The new normal" 
            time="5h ago" 
            readers="892 readers" 
          />
          <NewsItem 
            title="Fintech startups to watch" 
            time="1d ago" 
            readers="12,402 readers" 
          />
        </ul>

        <button className="mt-4 flex items-center gap-1 text-sm font-bold text-gray-500 hover:bg-gray-100 w-full px-2 py-1.5 rounded transition-all group">
          Show more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Add to your feed — Real Users */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sticky top-[68px]">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">Add to your feed</h3>
          <Info className="w-4 h-4 text-gray-500 cursor-help" />
        </div>

        {loadingUsers ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-5 h-5 text-[#0a66c2] animate-spin" />
          </div>
        ) : users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="flex gap-3 px-1">
                <div 
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="w-12 h-12 rounded-full overflow-hidden shrink-0 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: getColor(user.id) }}
                >
                  {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <h5 
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="text-[13px] font-bold text-gray-900 truncate cursor-pointer hover:text-[#0a66c2] hover:underline"
                  >
                    {user.fullName}
                  </h5>
                  <p className="text-[11px] text-gray-500 leading-tight line-clamp-1">
                    {user.role} • {user.userName}
                  </p>
                  {!sentConnections.includes(user.id) && (
                    <button 
                      onClick={() => handleFollow(user.id)}
                      disabled={loadingId === user.id}
                      className="mt-1 self-start inline-flex items-center gap-1.5 px-4 py-1 border-2 border-gray-500 text-gray-500 font-bold text-[13px] rounded-full hover:bg-gray-100 hover:border-gray-600 hover:text-gray-600 transition-all disabled:opacity-50"
                    >
                      {loadingId === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      Follow
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 italic px-1">No users found</p>
        )}

        <a href="#" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors px-1 group">
          View all recommendations <ExternalLink className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Footer Links */}
      <div className="px-4 py-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-gray-500">
        <FooterLink label="About" />
        <FooterLink label="Accessibility" />
        <FooterLink label="Help Center" />
        <FooterLink label="Privacy & Terms" />
        <FooterLink label="Ad Choices" />
        <FooterLink label="Advertising" />
        <FooterLink label="Business Services" />
        <FooterLink label="Get the LinkedIn app" />
        <FooterLink label="More" />
      </div>
    </div>
  );
};

const NewsItem: React.FC<{ title: string, time: string, readers: string }> = ({ title, time, readers }) => (
  <li className="cursor-pointer group px-1">
    <h4 className="text-[13px] font-bold text-gray-900 group-hover:text-[#0a66c2] leading-snug line-clamp-2">
      • {title}
    </h4>
    <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-2">
      {time} <span>•</span> {readers}
    </p>
  </li>
);

const FooterLink: React.FC<{ label: string }> = ({ label }) => (
  <a href="#" className="hover:text-[#0a66c2] hover:underline transition-colors">{label}</a>
);

export default NewsSidebar;
