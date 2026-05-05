import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bookmark, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileSidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      {/* Profile Summary */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative">
        <div className="h-[72px] relative overflow-hidden bg-slate-100">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-300 via-blue-100 to-slate-200 opacity-60"></div>
          {/* Optional: Add a subtle mesh or pattern here */}
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex flex-col items-center -mt-9 mb-4 relative z-10">
            <Link to="/profile/me" className="block relative group">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-white shadow-sm border-[3px] border-white transition-transform group-hover:scale-105 duration-200">
                <img 
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || 'User'}`} 
                  alt={user?.fullName || "Me"} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </Link>
            
            <Link to="/profile/me" className="mt-3 text-base font-bold text-gray-900 hover:underline hover:text-[#0a66c2] tracking-tight transition-colors text-center w-full truncate">
              {user?.fullName || "Professional"}
            </Link>
            
            <p className="text-xs text-gray-500 text-center leading-relaxed mt-0.5 px-2 line-clamp-2">
              {user?.title || user?.role || "Software Engineer at Professional Corp"}
            </p>
          </div>
          
          <div className="border-t border-gray-100 py-3 -mx-4 px-4 hover:bg-gray-50 cursor-pointer group transition-colors">
            <div className="flex justify-between items-center text-[12px] font-semibold">
              <span className="text-gray-500 group-hover:text-black">Connections</span>
              <span className="text-[#0a66c2]">1,284</span>
            </div>
            <p className="text-[12px] font-bold text-gray-900 mt-1 group-hover:text-[#0a66c2] transition-colors">Grow your network</p>
          </div>

          <div className="border-t border-gray-100 py-3 -mx-4 px-4 hover:bg-gray-50 cursor-pointer group transition-colors">
            <div className="flex justify-between items-center text-[12px] font-semibold">
              <span className="text-gray-500 group-hover:text-black">Who's viewed your profile</span>
              <span className="text-[#0a66c2]">142</span>
            </div>
          </div>

          <div className="border-t border-gray-100 py-3 -mx-4 px-4 hover:bg-gray-50 cursor-pointer transition-colors group">
            <p className="text-[11px] text-gray-500">Access exclusive tools & insights</p>
            <p className="text-[12px] font-bold text-gray-900 flex items-center gap-1.5 mt-1 group-hover:text-[#0a66c2]">
              <span className="w-3.5 h-3.5 bg-gradient-to-tr from-[#d9b300] to-[#f8c77e] rounded-sm shadow-sm"></span>
              Try Premium for free
            </p>
          </div>

          <div className="border-t border-gray-100 py-3 -mx-4 px-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-2.5">
            <Bookmark className="w-[18px] h-[18px] text-gray-500 fill-gray-500" />
            <span className="text-[12px] font-bold text-gray-900">My items</span>
          </div>
        </div>
      </div>

      {/* Community Panel */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sticky top-[68px]">
        <div className="flex flex-col gap-3.5">
          <div>
            <h4 className="text-[12px] font-semibold text-gray-900 mb-2.5 px-2">Recent</h4>
            <ul className="space-y-1">
              <CommunityItem label="React Developers" />
              <CommunityItem label="UI/UX Design Trends" />
              <CommunityItem label="Remote Work 2024" />
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-[#0a66c2] hover:underline cursor-pointer mb-2.5 px-2">Groups</h4>
            <ul className="space-y-1">
              <CommunityItem label="Next.js Enthusiasts" />
              <CommunityItem label="Frontend Masters" />
            </ul>
          </div>
          <div className="flex justify-between items-center group cursor-pointer px-2 py-1 hover:bg-gray-50 rounded-md transition-colors">
            <h4 className="text-[12px] font-bold text-[#0a66c2] group-hover:underline">Events</h4>
            <Plus className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
          </div>
          <div className="border-t border-gray-100 pt-2 text-center mt-1">
            <button className="text-sm font-semibold text-gray-600 hover:bg-gray-100 w-full py-2 rounded-md transition-colors">
              Discover more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunityItem: React.FC<{ label: string }> = ({ label }) => (
  <li className="flex items-center gap-2.5 text-[13px] font-bold text-gray-600 hover:bg-gray-100 -mx-1 px-3 py-1.5 rounded-md cursor-pointer transition-all group">
    <span className="text-[14px] text-gray-400 font-normal group-hover:text-gray-700">#</span>
    <span className="group-hover:text-black truncate">{label}</span>
  </li>
);

export default ProfileSidebar;
