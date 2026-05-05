import React from 'react';
import { Pencil, Plus, GraduationCap, Building2 } from 'lucide-react';
import type { Education, Skill } from '../../store/useProfileStore';

export const ProfileLanguage: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4 shadow-sm">
    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Profile Language</h3>
        <p className="text-sm text-gray-500">English</p>
      </div>
      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
        <Pencil className="w-4 h-4" />
      </button>
    </div>
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Public Profile & URL</h3>
        <p className="text-sm text-gray-500 truncate w-48">proconnect.com/in/msterling</p>
      </div>
      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  </div>
);

interface ProfileSkillsProps {
  skills: Skill[];
}

export const ProfileSkills: React.FC<ProfileSkillsProps> = ({ skills }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-[17px] font-bold text-gray-900">Skills</h2>
      <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
        <Plus className="w-5 h-5" />
      </button>
    </div>

    <div className="flex flex-col gap-4">
      {skills.map((skill, i) => (
        <div key={i} className={i !== skills.length - 1 ? 'border-b border-gray-100 pb-4' : ''}>
          <h3 className="text-[15px] font-semibold text-gray-900">{skill.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex -space-x-1">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=a" className="w-5 h-5 rounded-full border border-white bg-gray-100" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=b" className="w-5 h-5 rounded-full border border-white bg-gray-100" />
            </div>
            <p className="text-[12px] text-gray-500">Endorsed by {skill.endorsements} colleagues</p>
          </div>
        </div>
      ))}
    </div>

    <div className="border-t border-gray-200 mt-4 pt-3 -mx-5 px-5">
      <button className="w-full text-center text-sm font-semibold text-gray-500 hover:bg-gray-100 py-1.5 rounded transition-colors">
        Show all 18 skills
      </button>
    </div>
  </div>
);

interface ProfileEducationProps {
  education: Education[];
  onAdd?: () => void;
}

export const ProfileEducation: React.FC<ProfileEducationProps> = ({ education, onAdd }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-[17px] font-bold text-gray-900">Education</h2>
      <button onClick={onAdd} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
        <Plus className="w-5 h-5" />
      </button>
    </div>

    <div className="flex flex-col gap-4">
      {education.map((edu) => (
        <div key={edu.id} className="flex gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center shrink-0 border border-gray-200">
            <GraduationCap className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">{edu.institution}</h3>
            <p className="text-[13px] text-gray-800">{edu.degree}{edu.field ? ` • ${edu.field}` : ''}</p>
            <p className="text-[13px] text-gray-500 mt-0.5">{edu.startDate} - {edu.endDate || 'Present'}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ProfileRecommended: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4 shadow-sm">
    <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-4">
      Recommended For You
    </h2>
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center group cursor-pointer">
        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center shrink-0 border border-gray-200">
          <Building2 className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#0a66c2] leading-tight">Director of Product Strategy</h4>
          <p className="text-[12px] text-gray-500">ScaleUp Global • San Francisco (Hybrid)</p>
        </div>
      </div>
      <div className="flex gap-3 items-center group cursor-pointer">
        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center shrink-0 border border-gray-200">
          <Building2 className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#0a66c2] leading-tight">VP of Digital Innovation</h4>
          <p className="text-[12px] text-gray-500">Horizon Dynamics • London</p>
        </div>
      </div>
    </div>
  </div>
);
