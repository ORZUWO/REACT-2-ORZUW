import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2 } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';
import { useJobStore } from '../../store/useJobStore';
import { toast } from 'react-hot-toast';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PostJobForm {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salary: string;
  organizationId: number;
}

function PostJobModal({ isOpen, onClose }) {
  const { createJob } = useJobs();
  const { isLoading } = useJobStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PostJobForm>({
    defaultValues: {
      organizationId: 1 // Default as per screenshot
    }
  });

  if (!isOpen) return null;

  const onSubmit = async (data: PostJobForm) => {
    try {
      await createJob(data);
      toast.success('Job posted successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to post job');
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900">Post a New Job</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Job Title</label>
              <input
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g. Senior Frontend Developer"
                className={`w-full p-2.5 bg-gray-50 border ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:bg-white outline-none transition-all`} />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Location</label>
              <input
                {...register('location', { required: 'Location is required' })}
                placeholder="e.g. Dushanbe, TJ"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:bg-white outline-none transition-all" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Employment Type</label>
              <select
                {...register('employmentType')}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0a66c2] outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Experience Level</label>
              <select
                {...register('experienceLevel')}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0a66c2] outline-none"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Mid-Senior">Mid-Senior</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Salary</label>
              <input
                {...register('salary')}
                placeholder="e.g. $120k - $150k"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:bg-white outline-none transition-all" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Organization ID</label>
              <input
                type="number"
                {...register('organizationId', { valueAsNumber: true })}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0a66c2] outline-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              placeholder="Describe the role and responsibilities..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:bg-white outline-none transition-all resize-none" />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-2.5 bg-[#0a66c2] hover:bg-[#004182] text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Job'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJobModal;
