import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useJobStore } from '../../store/useJobStore';
import { useJobs } from '../../hooks/useJobs';

const JobSearchBar: React.FC = () => {
  const { filters, setFilter } = useJobStore();
  const { searchJobs } = useJobs();
  const [localQuery, setLocalQuery] = useState(filters.searchQuery);
  const [localLocation, setLocalLocation] = useState(filters.locationQuery);

  const handleSearch = () => {
    setFilter('searchQuery', localQuery);
    setFilter('locationQuery', localLocation);
    searchJobs(localQuery, localLocation);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Job title, keywords, or company"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:bg-white transition-all text-sm"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="City, state, or zip code"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:bg-white transition-all text-sm"
            value={localLocation}
            onChange={(e) => setLocalLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <button 
          onClick={handleSearch}
          className="bg-[#0a66c2] hover:bg-[#004182] text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center min-w-[120px]"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default JobSearchBar;
