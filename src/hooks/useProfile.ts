import { useProfileStore } from '../store/useProfileStore';

export const useProfile = () => {
  const {
    profile,
    loading,
    error,
    fetchProfile,
  } = useProfileStore();

  return {
    profile,
    loading,
    error,
    fetchProfile,
  };
};
