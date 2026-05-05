import React from 'react';
import { X, MapPin, Briefcase, Clock, Building2, DollarSign, Calendar, Share2, Bookmark, CheckCircle2, Globe, Users, Trash2, Loader2 } from 'lucide-react';
import { useJobStore } from '../../store/useJobStore';
import { useJobs } from '../../hooks/useJobs';
import { formatTimeAgo } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const JobDetailsModal: React.FC = () => {
  const { selectedJob, setSelectedJob, isLoading } = useJobStore();
  const { deleteJob } = useJobs();

  if (!selectedJob) return null;

  const handleDelete = async () => {
    if (!selectedJob) return;
    
    if (window.confirm('Are you sure you want to delete this job listing? This action cannot be undone.')) {
      try {
        await deleteJob(selectedJob.id);
        // Modal will close automatically because selectedJob becomes null in the hook
      } catch (error: any) {
        // Error is already logged in the hook, we just show the toast here
        const message = error.response?.data?.message || 'Failed to delete job';
        toast.error(message);
      }
    }
  };

  const timeAgo = formatTimeAgo(selectedJob.createdAt);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-2xl shadow-2xl overflow-hidden relative"
        >
          {/* Header Image/Pattern */}
          <div className="h-32 bg-gradient-to-r from-[#0a66c2] to-[#004182] relative">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white backdrop-blur-md z-10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-6 sm:px-10 pb-10 -mt-12 relative">
            {/* Company Logo */}
            <div className="w-24 h-24 bg-white rounded-xl shadow-lg border-4 border-white flex items-center justify-center mb-6 overflow-hidden">
              <Building2 className="w-12 h-12 text-[#0a66c2]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
              {/* Main Details */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{selectedJob.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 font-medium">
                    <div className="flex items-center gap-1">
                      <span className="text-[#0a66c2] hover:underline cursor-pointer font-bold">{selectedJob.companyName}</span>
                      <CheckCircle2 size={14} className="text-[#0a66c2]" />
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Clock size={16} />
                      <span>{timeAgo}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Job Type</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <Briefcase size={14} className="text-[#0a66c2]" />
                      {selectedJob.employmentType || 'Not specified'}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Experience</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <Users size={14} className="text-[#0a66c2]" />
                      {selectedJob.experienceLevel || 'Not specified'}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Salary</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <DollarSign size={14} className="text-green-600" />
                      {selectedJob.salary || 'Competitive'}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Posted</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <Calendar size={14} className="text-[#0a66c2]" />
                      {new Date(selectedJob.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* About the role */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About the role</h3>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {selectedJob.description.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Skills/Tags */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Skills required</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Redux', 'System Design'].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 bg-[#edf3f8] text-[#0a66c2] text-sm font-bold rounded-full border border-[#0a66c2]/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Actions */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                  <button className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg shadow-[#0a66c2]/20 active:scale-95">
                    Apply Now
                  </button>
                  <button className="w-full bg-white border border-[#0a66c2] text-[#0a66c2] font-bold py-3 px-6 rounded-full hover:bg-[#edf3f8] transition-all flex items-center justify-center gap-2">
                    <Bookmark size={18} />
                    Save Job
                  </button>
                  
                  <button 
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="w-full bg-red-50 border border-red-200 text-red-600 font-bold py-3 px-6 rounded-full hover:bg-red-100 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    Delete Job
                  </button>

                  <div className="flex items-center justify-center gap-6 pt-2">
                    <button className="text-gray-500 hover:text-[#0a66c2] transition-colors flex flex-col items-center gap-1">
                      <Share2 size={20} />
                      <span className="text-[10px] font-bold uppercase">Share</span>
                    </button>
                    <button className="text-gray-500 hover:text-[#0a66c2] transition-colors flex flex-col items-center gap-1">
                      <Globe size={20} />
                      <span className="text-[10px] font-bold uppercase">Website</span>
                    </button>
                  </div>
                </div>

                {/* Company Insights */}
                <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-bold text-gray-900">About the company</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {selectedJob.organizationName || selectedJob.companyName} is a leading technology firm specializing in innovative solutions for modern business challenges.
                  </p>
                  <button className="text-[#0a66c2] text-sm font-bold hover:underline">
                    View company profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default JobDetailsModal;
