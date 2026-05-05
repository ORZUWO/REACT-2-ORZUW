import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { useConnectionStore } from '../store/useConnectionStore';
import { useMessageStore } from '../store/useMessageStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Users, 
  UserPlus, 
  Contact, 
  Group, 
  Calendar, 
  FileText, 
  ChevronRight,
  MoreHorizontal,
  Loader2,
  UserCheck
} from 'lucide-react';

const NetworkPage: React.FC = () => {
  const { 
    directoryUsers, 
    pendingInvitations, 
    myConnections,
    loading, 
    fetchDirectory, 
    fetchPendingInvitations,
    fetchMyConnections,
    acceptRequest,
    ignoreRequest,
    sendRequest,
    removeConnection
  } = useConnectionStore();

  const { createConversation, setActiveConversation } = useMessageStore();
  const navigate = useNavigate();

  const handleMessage = async (userId: string) => {
    try {
      const convoId = await createConversation(userId.toString());
      if (convoId) {
        setActiveConversation(convoId);
        navigate('/messaging');
      }
    } catch (err) {
      toast.error('Failed to start conversation');
    }
  };

  const [view, setView] = React.useState<'discover' | 'connections'>('discover');

  useEffect(() => {
    fetchDirectory();
    fetchPendingInvitations();
    fetchMyConnections();
  }, [fetchDirectory, fetchPendingInvitations, fetchMyConnections]);

  return (
    <div className="min-h-screen bg-[#f4f2ee] font-sans selection:bg-[#0a66c2]/20">
      <Navbar />
      
      <main className="max-w-[1200px] mx-auto pt-[72px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
          
          
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900">Manage my network</h2>
              </div>
              
              <nav className="p-2">
                <SidebarLink 
                  icon={<Users className="w-5 h-5" />} 
                  label="Connections" 
                  count={myConnections.length} 
                  active={view === 'connections'} 
                  onClick={() => setView('connections')}
                />
                <SidebarLink 
                  icon={<UserPlus className="w-5 h-5" />} 
                  label="Discover & Invitations" 
                  count={pendingInvitations.length} 
                  active={view === 'discover'}
                  onClick={() => setView('discover')}
                />
                <SidebarLink icon={<Contact className="w-5 h-5" />} label="Contacts" />
                <SidebarLink icon={<Group className="w-5 h-5" />} label="Groups" />
                <SidebarLink icon={<FileText className="w-5 h-5" />} label="Pages" />
                <SidebarLink icon={<Calendar className="w-5 h-5" />} label="Events" />
              </nav>

              <div className="p-4 border-t border-gray-100">
                <button className="w-full py-2 bg-[#0a66c2]/5 hover:bg-[#0a66c2]/10 text-[#0a66c2] font-bold rounded-full transition-colors text-sm">
                  Grow Network
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
              <p className="text-xs text-gray-500 mb-2">Get the latest business news</p>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#0a66c2]" />
                </div>
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">Follow industry leaders</p>
              <button className="text-[#0a66c2] text-sm font-bold hover:underline">Explore</button>
            </div>
          </div>

          
          <div className="lg:col-span-9 space-y-6">
            
            {view === 'discover' && (
              <>
                
                {pendingInvitations.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-base font-semibold text-gray-900">
                        Pending Invitations ({pendingInvitations.length})
                      </h3>
                      <button className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
                        Manage all
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {pendingInvitations.map((inv) => (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key={inv.id} 
                          className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={inv.senderAvatar} 
                              className="w-14 h-14 rounded-full border border-gray-100 shadow-sm object-cover bg-white" 
                              alt={inv.senderName} 
                            />
                            <div>
                              <h4 className="font-bold text-gray-900 hover:underline cursor-pointer">
                                {inv.senderName}
                              </h4>
                              <p className="text-xs text-gray-500 line-clamp-1">{inv.senderTitle}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Users className="w-3 h-3 text-gray-400" />
                                <p className="text-[11px] text-gray-400">{inv.mutualConnections} mutual connections</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => ignoreRequest(inv.id)}
                              className="px-4 py-1.5 text-gray-500 font-bold hover:bg-gray-200 rounded-full transition-colors text-sm"
                            >
                              Ignore
                            </button>
                            <button 
                              onClick={() => acceptRequest(inv.id)}
                              className="px-6 py-1.5 border-2 border-[#0a66c2] text-[#0a66c2] font-bold rounded-full hover:bg-[#0a66c2]/5 transition-all text-sm"
                            >
                              Accept
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-semibold text-gray-900">People you may know</h3>
                    <button className="text-sm font-bold text-gray-500 hover:text-gray-800">See all</button>
                  </div>

                  {loading && directoryUsers.length === 0 ? (
                    <div className="flex justify-center py-20">
                      <Loader2 className="w-10 h-10 text-[#0a66c2] animate-spin" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {directoryUsers.map((user, idx) => (
                        <UserCard 
                          key={user.id} 
                          user={user} 
                          onConnect={() => sendRequest(user.id)}
                          delay={idx * 0.05}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {view === 'connections' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-900">
                    {myConnections.length} Connections
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
                      Search
                    </button>
                    <button className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
                      Sort by: Recently added
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-100 min-h-[400px]">
                  {loading && myConnections.length === 0 ? (
                    <div className="flex justify-center py-20">
                      <Loader2 className="w-10 h-10 text-[#0a66c2] animate-spin" />
                    </div>
                  ) : myConnections.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                      <Users className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">You don't have any connections yet</p>
                      <p className="text-sm">Connect with people you know to see their updates here.</p>
                      <button 
                        onClick={() => setView('discover')}
                        className="mt-6 px-6 py-2 border-2 border-[#0a66c2] text-[#0a66c2] font-bold rounded-full hover:bg-[#0a66c2]/5 transition-all text-sm"
                      >
                        Find connections
                      </button>
                    </div>
                  ) : (
                    myConnections.map((user: any) => (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={user.id} 
                        className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <img 
                            src={user.avatar} 
                            className="w-16 h-16 rounded-full border border-gray-100 shadow-sm object-cover bg-white" 
                            alt={user.fullName} 
                          />
                          <div>
                            <h4 className="font-bold text-lg text-gray-900 hover:text-[#0a66c2] hover:underline cursor-pointer">
                              {user.fullName}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{user.title}</p>
                            <p className="text-xs text-gray-400 mt-1">Connected recently</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleMessage(user.id)}
                            className="px-4 py-1.5 text-[#0a66c2] font-bold border border-[#0a66c2] rounded-full hover:bg-[#0a66c2]/5 transition-colors text-sm"
                          >
                            Message
                          </button>
                          <button 
                            onClick={() => removeConnection(user.id)}
                            className="px-4 py-1.5 text-red-600 font-bold border border-red-600 rounded-full hover:bg-red-50 transition-colors text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, count, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex justify-between items-center px-3 py-2.5 rounded-lg cursor-pointer group transition-colors ${active ? 'bg-blue-50/50' : 'hover:bg-gray-100'}`}
  >
    <div className="flex items-center gap-3">
      <span className={`${active ? 'text-[#0a66c2]' : 'text-gray-500 group-hover:text-black'}`}>{icon}</span>
      <span className={`text-sm ${active ? 'text-[#0a66c2] font-bold' : 'text-gray-600 font-medium group-hover:text-black'}`}>{label}</span>
    </div>
    {count !== undefined && (
      <span className="text-xs text-gray-500 font-medium">{count.toLocaleString()}</span>
    )}
  </div>
);

const UserCard: React.FC<{ user: any, onConnect: () => void, delay: number }> = ({ user, onConnect, delay }) => {
  const [connected, setConnected] = React.useState(false);

  const handleConnect = () => {
    onConnect();
    setConnected(true);
  };


  const gradients = [
    'from-slate-800 to-slate-900',
    'from-blue-800 to-indigo-900',
    'from-emerald-800 to-teal-900',
    'from-amber-700 to-orange-800',
    'from-purple-800 to-fuchsia-900',
    'from-rose-800 to-pink-900'
  ];
  const bgGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all h-full"
    >
      <div className={`h-16 bg-gradient-to-br ${bgGradient} relative`}>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      <div className="px-4 pb-4 flex flex-col items-center flex-grow">
        <div className="relative -mt-8 mb-3">
          <img 
            src={user.avatar} 
            className="w-18 h-18 rounded-full border-[3px] border-white shadow-sm object-cover bg-white" 
            alt={user.fullName} 
          />
        </div>
        
        <h4 className="text-[15px] font-bold text-gray-900 hover:underline cursor-pointer text-center w-full truncate px-2">
          {user.fullName}
        </h4>
        <p className="text-[13px] text-gray-500 text-center leading-tight mt-1 line-clamp-2 h-8 px-2">
          {user.title}
        </p>
        
        <div className="flex items-center gap-1 mt-3 mb-4">
          <Users className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-xs text-gray-400 font-medium">{user.mutualConnections} mutual connections</p>
        </div>

        <button 
          onClick={handleConnect}
          disabled={connected}
          className={`w-full py-1.5 mt-auto border-2 rounded-full font-bold transition-all flex items-center justify-center gap-2 text-sm ${
            connected 
              ? 'border-gray-200 text-gray-500 bg-gray-50 cursor-default' 
              : 'border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2]/5 active:scale-95'
          }`}
        >
          {connected ? (
            <>
              <UserCheck className="w-4 h-4" />
              <span>Pending</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Connect</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default NetworkPage;
