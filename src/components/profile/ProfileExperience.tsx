import React from 'react';
import { Pencil, Plus, Building2, Zap } from 'lucide-react';
import type { Experience } from '../../store/useProfileStore';

interface ProfileExperienceProps {
  experiences: Experience[];
  onAdd?: () => void;
  onEdit?: (exp: Experience) => void;
}

const ProfileExperience: React.FC<ProfileExperienceProps> = ({ experiences, onAdd, onEdit }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Experience</h2>
        <div className="flex gap-2">
          <button onClick={onAdd} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <div key={exp.id} className={`flex gap-4 ${index !== experiences.length - 1 ? 'border-b border-gray-100 pb-6' : ''}`}>
            {/* Company Logo Placeholder */}
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden shadow-sm">
              {(exp as any).imageUrl ? (
                <img src={(exp as any).imageUrl} alt={exp.company} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-6 h-6 text-gray-300" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="text-[16px] font-bold text-gray-900 leading-tight truncate">{exp.title}</h3>
                {onEdit && (
                  <button 
                    onClick={() => onEdit(exp)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-[#0a66c2]"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-[14px] text-gray-800 font-medium">{exp.company} • Full-time</p>
              <p className="text-[13px] text-gray-500 mt-0.5">
                {exp.startDate} - {exp.endDate || 'Present'} • {exp.location}
              </p>
              
              <p className="text-[14px] text-gray-700 mt-3 leading-relaxed line-clamp-3">
                {exp.description}
              </p>
              
              {exp.skills && exp.skills.length > 0 && (
                <div className="mt-3 flex items-start gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100 w-fit">
                  <Zap className="w-3.5 h-3.5 text-[#0a66c2] mt-1 shrink-0" />
                  <p className="text-[13px] text-gray-700 font-semibold">
                    Skills: <span className="font-normal">{exp.skills.join(', ')}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileExperience;
