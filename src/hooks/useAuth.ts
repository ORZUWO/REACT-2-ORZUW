import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
  const {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  } = useAuthStore();

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  };
};