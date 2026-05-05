import { create } from 'zustand';

export type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  employmentType: string | null;
  experienceLevel: string | null;
  salary: string | null;
  organizationId: number;
  organizationName: string;
  companyName: string;
  createdAt: string;
  matchPercentage?: number;
};

interface JobState {
  jobs: Job[];
  recommendedJobs: Job[];
  isLoading: boolean;
  selectedJob: Job | null;
  error: string | null;
  filters: {
    jobType: string[];
    experience: string[];
    salaryRange: string | null;
    searchQuery: string;
    locationQuery: string;
  };
  setJobs: (jobs: Job[]) => void;
  setRecommendedJobs: (jobs: Job[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (key: keyof JobState['filters'], value: any) => void;
  setSelectedJob: (job: Job | null) => void;
  removeJob: (id: number) => void;
  addJob: (job: Job) => void;
  resetFilters: () => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  recommendedJobs: [],
  isLoading: false,
  selectedJob: null,
  error: null,
  filters: {
    jobType: [],
    experience: [],
    salaryRange: null,
    searchQuery: '',
    locationQuery: '',
  },
  setJobs: (jobs) => set({ jobs }),
  setRecommendedJobs: (recommendedJobs) => set({ recommendedJobs }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  setSelectedJob: (selectedJob) => set({ selectedJob }),
  removeJob: (id) => set((state) => ({
    jobs: state.jobs.filter(j => j.id !== id),
    recommendedJobs: state.recommendedJobs.filter(j => j.id !== id)
  })),
  addJob: (job) => set((state) => ({
    jobs: [job, ...state.jobs]
  })),
  resetFilters: () => set({
    filters: {
      jobType: [],
      experience: [],
      salaryRange: null,
      searchQuery: '',
      locationQuery: '',
    }
  }),
}));
