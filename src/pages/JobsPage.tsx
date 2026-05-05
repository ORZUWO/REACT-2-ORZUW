import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import JobSearchBar from '../components/jobs/JobSearchBar';
import JobFilters from '../components/jobs/JobFilters';
import JobCard from '../components/jobs/JobCard';
import RecommendedJobCard from '../components/jobs/RecommendedJobCard';
import PremiumJobsCard from '../components/jobs/PremiumJobsCard';
import PostJobModal from '../components/jobs/PostJobModal';
import JobDetailsModal from '../components/jobs/JobDetailsModal';
import { useJobStore } from '../store/useJobStore';
import { useJobs } from '../hooks/useJobs';
import { Loader2, Sparkles, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const JobsPage: React.FC = () => {
  const { jobs, recommendedJobs, isLoading, error } = useJobStore();
  const { fetchJobs } = useJobs();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="min-h-screen bg-[#f4f2ee] pt-[52px] pb-10">
      <Navbar />
      
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          
          
          <aside className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-6 flex items-center justify-between">
                Filter Jobs
              </h2>
              <JobFilters />
            </div>
            
            <PremiumJobsCard />
          </aside>

          
          <main className="space-y-6 min-w-0">
            <JobSearchBar />

            
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0a66c2]" />
                  AI Job Matching
                </h2>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-1 px-1">
                {isLoading ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="min-w-[300px] h-48 bg-gray-200 animate-pulse rounded-lg" />
                  ))
                ) : (
                  recommendedJobs.map((job) => (
                    <motion.div 
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RecommendedJobCard job={job} />
                    </motion.div>
                  ))
                )}
              </div>
            </section>

            
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Recent Opportunities</h2>
                  <p className="text-xs text-gray-500">Based on your activity and preferences</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsPostModalOpen(true)}
                    className="flex items-center gap-2 bg-[#0a66c2] hover:bg-[#004182] text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95"
                  >
                    <Plus size={18} />
                    Post Job
                  </button>
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-600 cursor-pointer hover:text-black">
                    Sort by: <span className="text-[#0a66c2]">Most Recent ▼</span>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  <div className="p-10 flex flex-col items-center justify-center text-gray-400">
                    <Loader2 className="w-10 h-10 animate-spin mb-2" />
                    <p>Finding the best roles for you...</p>
                  </div>
                ) : error ? (
                  <div className="p-10 text-center text-red-500">{error}</div>
                ) : jobs.length === 0 ? (
                  <div className="p-10 text-center text-gray-500">No jobs found matching your criteria.</div>
                ) : (
                  jobs.map((job, index) => (
                    <motion.div 
                      key={job.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <JobCard job={job} />
                    </motion.div>
                  ))
                )}
              </div>
              
              {jobs.length > 0 && (
                <div className="p-4 bg-gray-50 text-center">
                  <button className="text-[#0a66c2] font-bold text-sm hover:underline flex items-center gap-1 mx-auto">
                    Show more results <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>

      <PostJobModal 
        isOpen={isPostModalOpen} 
        onClose={() => setIsPostModalOpen(false)} 
      />

      <JobDetailsModal />
    </div>
  );
};

export default JobsPage;
