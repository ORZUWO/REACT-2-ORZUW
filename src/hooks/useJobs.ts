import { useCallback } from 'react';
import { api } from '../lib/axios';
import { useJobStore } from '../store/useJobStore';
import type { Job } from '../store/useJobStore';
import { toast } from 'react-hot-toast';
import { invalidateCache } from '../lib/apiCache';

export const useJobs = () => {
  const { setJobs, setRecommendedJobs, setLoading, setError, filters } = useJobStore();

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<Job[]>('/Job');
      
      const allJobs = response.data;
      
      const recommended = allJobs.slice(0, 4).map(job => ({
        ...job,
        matchPercentage: Math.floor(Math.random() * (99 - 90 + 1)) + 90
      }));

      setJobs(allJobs);
      setRecommendedJobs(recommended);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [setJobs, setRecommendedJobs, setLoading, setError]);

  const searchJobs = useCallback(async (title: string, location: string) => {
    
    if (!title && !location) {
      return fetchJobs();
    }

    setLoading(true);
    try {
      console.log('Searching jobs with:', { title, location });
      const response = await api.get<Job[]>('/Job/search', {
        params: { 
          title: title || '', 
          location: location || '' 
        }
      });
      console.log('Search response:', response.data);
      setJobs(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err: any) {
      console.error('Search error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Search failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [setJobs, setLoading, setError, fetchJobs]);

  const createJob = useCallback(async (jobData: Omit<Job, 'id' | 'createdAt'>) => {
    setLoading(true);
    try {
      const response = await api.post<Job>('/Job', jobData);
      useJobStore.getState().addJob(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const fetchJobById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await api.get<Job>(`/Job/${id}`);
      useJobStore.getState().setSelectedJob(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch job details');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const deleteJob = useCallback(async (id: number) => {
    setLoading(true);
    try {
      console.log(`Executing DELETE request for Job ID: ${id}`);
      await api.delete(`/Job/${id}`);
      
      
      useJobStore.getState().removeJob(id);
      useJobStore.getState().setSelectedJob(null);
      
      
      invalidateCache('/Job');
      
      toast.success('Job listing removed successfully');
    } catch (err: any) {
      console.error('Delete Job Error:', err.response?.data || err);
      const errorMsg = err.response?.data?.message || 'Failed to delete job listing';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  return {
    fetchJobs,
    searchJobs,
    createJob,
    fetchJobById,
    deleteJob
  };
};
