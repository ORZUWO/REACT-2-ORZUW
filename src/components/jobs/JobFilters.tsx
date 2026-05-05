import React from 'react';
import { useJobStore } from '../../store/useJobStore';

const JobFilters: React.FC = () => {
  const { filters, setFilter } = useJobStore();

  const handleCheckboxChange = (category: 'jobType' | 'experience', value: string) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFilter(category, newValues);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Job Type</h3>
        <div className="space-y-2">
          {['Full-time', 'Contract', 'Remote'].map((type) => (
            <label key={type} className="flex items-center gap-3 group cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#0a66c2] focus:ring-[#0a66c2]"
                checked={filters.jobType.includes(type)}
                onChange={() => handleCheckboxChange('jobType', type)}
              />
              <span className="text-sm text-gray-700 group-hover:text-black transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-gray-100" />

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Experience</h3>
        <div className="space-y-2">
          {['Entry Level', 'Mid-Senior', 'Executive'].map((level) => (
            <label key={level} className="flex items-center gap-3 group cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#0a66c2] focus:ring-[#0a66c2]"
                checked={filters.experience.includes(level)}
                onChange={() => handleCheckboxChange('experience', level)}
              />
              <span className="text-sm text-gray-700 group-hover:text-black transition-colors">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-gray-100" />

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Salary Range</h3>
        <select 
          className="w-full bg-gray-50 border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
          value={filters.salaryRange || ''}
          onChange={(e) => setFilter('salaryRange', e.target.value)}
        >
          <option value="">Any</option>
          <option value="40-60k">$40k - $60k</option>
          <option value="60-100k">$60k - $100k</option>
          <option value="100-150k">$100k - $150k</option>
          <option value="150k+">$150k+</option>
        </select>
      </div>
    </div>
  );
};

export default JobFilters;
