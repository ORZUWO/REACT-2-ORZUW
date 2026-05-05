import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import CareerInsights from '../components/profile/CareerInsights';
import ProfileAbout from '../components/profile/ProfileAbout';
import EditAboutModal from '../components/profile/EditAboutModal';
import ProfileExperience from '../components/profile/ProfileExperience';
import ExperienceModal from '../components/profile/ExperienceModal';
import AddEducationModal from '../components/profile/AddEducationModal';
import { useProfileStore } from '../store/useProfileStore';
import type { Experience } from '../store/useProfileStore';
import { ProfileLanguage, ProfileSkills, ProfileEducation, ProfileRecommended } from '../components/profile/ProfileSidebarSections';
import { useProfile } from '../hooks/useProfile';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2, Plus } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { profile, loading, fetchProfile } = useProfile();
  const authUser = useAuthStore((s) => s.user);
   const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  
  const resolvedId = userId === 'me'
    ? (authUser?.id?.toString() || '22')
    : (userId || '22');

  const isOwnProfile = userId === 'me' || authUser?.id?.toString() === resolvedId;

  useEffect(() => {
    fetchProfile(resolvedId);
  }, [resolvedId, fetchProfile]);

  return (
    <div className="min-h-screen bg-[#f4f2ee] font-sans selection:bg-[#0a66c2]/20">
      <Navbar />
      
      <main className="max-w-[1200px] mx-auto pt-[72px] px-4 pb-16">
        {loading && !profile ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-[#0a66c2] animate-spin" />
          </div>
        ) : profile ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            
            
            <div className="col-span-1 lg:col-span-8 flex flex-col">
              <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />
              
              <CareerInsights />
              
              
              {profile.about ? (
                <ProfileAbout about={profile.about} aboutImage={profile.aboutImage} onEdit={() => setIsAboutModalOpen(true)} />
              ) : (
                <EmptySection title="About" hint="Add a summary about yourself" onAdd={() => setIsAboutModalOpen(true)} />
              )}
              
              
              {profile.experiences.length > 0 ? (
                <ProfileExperience 
                  experiences={profile.experiences} 
                  onAdd={() => { setSelectedExp(null); setIsExpModalOpen(true); }} 
                  onEdit={(exp) => { setSelectedExp(exp); setIsExpModalOpen(true); }}
                />
              ) : (
                <EmptySection 
                  title="Experience" 
                  hint="Add your work experience to show your career journey" 
                  onAdd={() => { setSelectedExp(null); setIsExpModalOpen(true); }} 
                />
              )}
            </div>

            
            <div className="col-span-1 lg:col-span-4 flex flex-col">
              <ProfileLanguage />
              {profile.skills.length > 0 ? (
                <ProfileSkills skills={profile.skills} />
              ) : null}
              {profile.education.length > 0 ? (
                <ProfileEducation education={profile.education} onAdd={() => setIsEduModalOpen(true)} />
              ) : (
                <EmptySection title="Education" hint="Add your educational background" small onAdd={() => setIsEduModalOpen(true)} />
              )}
              <ProfileRecommended />
            </div>

          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500">Profile not found</p>
          </div>
        )}
      </main>

      <ExperienceModal 
        isOpen={isExpModalOpen} 
        onClose={() => setIsExpModalOpen(false)} 
        experience={selectedExp}
      />
      <EditAboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
        currentAbout={profile?.about || ''} 
        currentImage={profile?.aboutImage}
      />
      <AddEducationModal isOpen={isEduModalOpen} onClose={() => setIsEduModalOpen(false)} />
    </div>
  );
};

const EmptySection: React.FC<{ title: string; hint: string; small?: boolean; onAdd?: () => void }> = ({ title, hint, small, onAdd }) => (
  <div className={`bg-white rounded-xl border border-gray-200 ${small ? 'p-4' : 'p-6'} mb-4 shadow-sm`}>
    <div className="flex justify-between items-center mb-3">
      <h2 className={`${small ? 'text-[17px]' : 'text-xl'} font-bold text-gray-900`}>{title}</h2>
      <button onClick={onAdd} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-[#0a66c2]">
        <Plus className="w-5 h-5" />
      </button>
    </div>
    <p className="text-sm text-gray-400 italic">{hint}</p>
  </div>
);

export default ProfilePage;

