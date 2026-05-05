import { Bookmark, MapPin, Clock, Building2 } from 'lucide-react';
import type { Job } from '../../store/useJobStore';
import { formatTimeAgo } from '../../lib/utils';

import { useJobs } from '../../hooks/useJobs';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const timeAgo = formatTimeAgo(job.createdAt);
  const { fetchJobById } = useJobs();

  return (
    <div 
      onClick={() => fetchJobById(job.id)}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group relative"
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0">
          <Building2 className="w-6 h-6 text-gray-500" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#0a66c2] group-hover:underline">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600">{job.companyName}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{job.location}</span>
              {job.employmentType && (
                <>
                  <span className="mx-1">•</span>
                  <span>{job.employmentType}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <Clock className="w-3 h-3" />
              <span>{timeAgo}</span>
            </div>
          </div>
          
          {job.description && (
            <p className="mt-2 text-xs text-gray-500 line-clamp-2">
              {job.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
