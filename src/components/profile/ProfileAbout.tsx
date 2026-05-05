import React from 'react';
import { Pencil } from 'lucide-react';

interface ProfileAboutProps {
  about: string;
  aboutImage?: string | null;
  onEdit?: () => void;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({ about, aboutImage, onEdit }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">About</h2>
        <button onClick={onEdit} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
          <Pencil className="w-5 h-5" />
        </button>
      </div>
      <p className="text-[14px] text-gray-800 leading-relaxed mb-4">
        {about}
      </p>
      {aboutImage && (
        <div className="rounded-lg overflow-hidden border border-gray-100 max-w-full">
          <img src={aboutImage} alt="About" className="w-full h-auto max-h-[400px] object-contain bg-gray-50" />
        </div>
      )}
    </div>
  );
};

export default ProfileAbout;
