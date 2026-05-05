import React from 'react';
import type { Job } from '../../store/useJobStore';
import { Building2, Sparkles } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';

interface RecommendedJobCardProps {
  job: Job;
}

const RecommendedJobCard: React.FC<RecommendedJobCardProps> = ({ job }) => {
  const { fetchJobById } = useJobs();

  return (
    <div 
      onClick={() => fetchJobById(job.id)}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full min-w-[280px] md:min-w-[320px] shadow-sm hover:shadow-md transition-all cursor-pointer relative group"
    >
      {/* Match Badge */}
      <div className="absolute top-0 right-0 bg-[#0a66c2] text-white px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
        <Sparkles className="w-3 h-3" />
        {job.matchPercentage}% Match
      </div>
      
      <div className="p-4 flex-1">
        <div className="flex gap-3 items-center mb-3">
          <div className="w-12 h-12 bg-[#edf3f8] rounded flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-[#0a66c2]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-[#0a66c2] transition-colors line-clamp-1">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600 truncate">{job.companyName}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-2 py-1 bg-[#edf3f8] text-[#0a66c2] text-[10px] font-bold rounded">Figma</span>
          <span className="px-2 py-1 bg-[#edf3f8] text-[#0a66c2] text-[10px] font-bold rounded">Prototyping</span>
          <span className="px-2 py-1 text-gray-500 text-[10px] font-medium">+3 more</span>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 mt-auto">
        <p className="text-[11px] text-gray-500 font-medium">Based on your skills and experience</p>
      </div>
    </div>
  );
};

export default RecommendedJobCard;
