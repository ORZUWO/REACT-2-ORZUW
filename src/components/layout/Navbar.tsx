import React from 'react';
import { Search, Home, Users, Briefcase, MessageSquare, Bell, User, Grid, Compass, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'My Network', path: '/network' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: MessageSquare, label: 'Messaging', path: '/messaging' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Sparkles, label: 'AI', path: '/ai' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-[100] h-[52px] shadow-sm">
      <div className="max-w-[1400px] mx-auto h-full px-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2 flex-1">
          <div 
            onClick={() => navigate('/')}
            className="bg-[#0a66c2] rounded p-1 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </div>
          <div className="relative max-w-[280px] w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-[#edf3f8] border-none rounded py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black transition-all"
            />
          </div>
        </div>

        
        <div className="flex items-center h-full">
          {navItems.map((item) => (
            <NavLink 
              key={item.label} 
              icon={item.icon} 
              label={item.label} 
              active={location.pathname === item.path} 
              onClick={() => navigate(item.path)}
            />
          ))}
          
          <div className="h-full flex flex-col items-center justify-center px-3 border-r border-gray-100 group cursor-pointer relative">
            <div 
              onClick={() => navigate(`/profile/me`)}
              className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 ring-1 ring-gray-200"
            >
              <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || 'Me'}`} alt="Me" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] text-gray-500 group-hover:text-black hidden md:flex items-center gap-0.5">
              Me <span className="text-[8px]">▼</span>
            </span>
            
            
            <div className="absolute top-[52px] right-0 bg-white border border-gray-200 shadow-xl rounded-b-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 min-w-[160px] p-2 z-[110]">
              <div className="p-2 border-b border-gray-100 mb-2">
                <p className="text-xs font-bold text-gray-900 truncate">{user?.fullName || "Professional Name"}</p>
                <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
              </div>
              <button 
                onClick={() => navigate(`/profile/me`)}
                className="w-full px-2 py-1.5 text-xs text-left text-gray-700 hover:bg-gray-50 rounded transition-colors font-semibold mb-1"
              >
                View Profile
              </button>
              <button 
                onClick={logout}
                className="w-full px-2 py-1.5 text-xs text-left text-red-600 hover:bg-red-50 rounded transition-colors font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center px-3 cursor-pointer text-gray-500 hover:text-black transition-colors group">
            <Grid className="w-6 h-6" />
            <span className="text-[10px] flex items-center gap-0.5">For Business <span className="text-[8px]">▼</span></span>
          </div>

          <div className="hidden xl:flex flex-col items-center justify-center px-3 cursor-pointer text-[#915907] hover:text-[#5c3b06] transition-colors max-w-[100px] text-center">
            <span className="text-[10px] underline leading-tight">Try Premium for free</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ icon: any, label: string, active?: boolean, onClick?: () => void }> = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`h-full flex flex-col items-center justify-center px-4 cursor-pointer relative group transition-colors ${active ? 'text-black' : 'text-gray-500 hover:text-black'}`}
  >
    <div className="relative">
      <Icon className="w-6 h-6" />
      {label === "Notifications" && <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">2</div>}
    </div>
    <span className="text-[11px] hidden lg:block font-medium mt-0.5">{label}</span>
    {active && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />}
  </div>
);

export default Navbar;
