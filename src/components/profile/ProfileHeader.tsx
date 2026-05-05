import React, { useState } from 'react';
import type { UserProfile } from '../../store/useProfileStore';
import { Building2, GraduationCap, MapPin, Edit2, Send, UserPlus } from 'lucide-react';
import EditProfileModal from './EditProfileModal';
import { useNavigate } from 'react-router-dom';
import { useMessageStore } from '../../store/useMessageStore';
import { useConnectionStore } from '../../store/useConnectionStore';
import toast from 'react-hot-toast';

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, isOwnProfile }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const { createConversation, setActiveConversation } = useMessageStore();
  const { sendRequest } = useConnectionStore();
  const [sendingRequest, setSendingRequest] = useState(false);

  const handleMessage = async () => {
    if (!profile.userId) return;
    try {
      
      const convoId = await createConversation(profile.userId.toString());
      if (convoId) {
        setActiveConversation(convoId);
        navigate('/messaging');
      }
    } catch (err) {
      toast.error('Failed to start conversation');
    }
  };

  const handleConnect = async () => {
    setSendingRequest(true);
    try {
      await sendRequest(profile.userId);
      toast.success('Connection request sent!');
    } catch (err) {
      toast.error('Failed to send request');
    } finally {
      setSendingRequest(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 shadow-sm">
        
        <div className="h-48 relative bg-gradient-to-r from-blue-100 to-gray-200 group">
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          {isOwnProfile && (
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="absolute top-4 right-4 p-2 bg-white text-[#0a66c2] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="px-6 pb-6 relative">
          
          <div className="absolute -top-24 border-4 border-white rounded-full overflow-hidden w-36 h-36 bg-gray-100 shadow-sm">
            <img 
              src={profile.avatar} 
              alt={profile.fullName} 
              className="w-full h-full object-cover"
            />
          </div>

          
          {isOwnProfile && (
            <div className="absolute right-6 top-6">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          )}

          
          <div className="flex justify-between items-start pt-16">
            <div className="max-w-[65%]">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{profile.fullName}</h1>
              <p className="text-base text-gray-900 mt-1">{profile.title}</p>
              
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location || 'Location not specified'}
                </span>
                <span>•</span>
                <a href="#" className="font-bold text-[#0a66c2] hover:underline">
                  {profile.connections}+ connections
                </a>
                <span>•</span>
                <a href="#" className="font-bold text-[#0a66c2] hover:underline">
                  Contact info
                </a>
              </div>

              
              <div className="flex gap-2 mt-4">
                {isOwnProfile ? (
                  <>
                    <button className="px-5 py-1.5 bg-[#0a66c2] text-white font-bold rounded-full hover:bg-[#004182] transition-colors">
                      Open to
                    </button>
                    <button className="px-5 py-1.5 border-2 border-[#0a66c2] text-[#0a66c2] font-bold rounded-full hover:bg-blue-50 transition-colors">
                      Add profile section
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={handleConnect}
                      disabled={sendingRequest}
                      className="px-5 py-1.5 bg-[#0a66c2] text-white font-bold rounded-full hover:bg-[#004182] transition-colors flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Connect
                    </button>
                    <button 
                      onClick={handleMessage}
                      className="px-5 py-1.5 border-2 border-[#0a66c2] text-[#0a66c2] font-bold rounded-full hover:bg-blue-50 transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Message
                    </button>
                  </>
                )}
                <button className="px-5 py-1.5 border border-gray-500 text-gray-600 font-bold rounded-full hover:bg-gray-100 hover:border-gray-600 hover:text-gray-900 transition-colors">
                  More
                </button>
              </div>
            </div>

            
            <div className="max-w-[30%] flex flex-col gap-3 mt-1">
              {profile.experiences && profile.experiences.length > 0 && (
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group">
                  <Building2 className="w-6 h-6 text-gray-700 shrink-0" />
                  <span className="truncate">{profile.experiences[0].company}</span>
                </div>
              )}
              {profile.education && profile.education.length > 0 && (
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group">
                  <GraduationCap className="w-6 h-6 text-gray-700 shrink-0" />
                  <span className="truncate">{profile.education[0].institution}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal 
        profile={profile}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};

export default ProfileHeader;
