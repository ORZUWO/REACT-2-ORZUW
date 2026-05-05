import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    
    
    if (
      err.response?.status === 401 && 
      !original._retry && 
      !original.url?.includes('/Auth/login') &&
      !original.url?.includes('/Auth/refresh')
    ) {
      original._retry = true;
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/Auth/refresh`, {
          token: useAuthStore.getState().token
        });
        
        const token = data.data?.token || data.token || (typeof data.data === 'string' ? data.data : null);
        
        if (token) {
          useAuthStore.getState().loginSuccess(token, data.data?.user || data.user);
          return api(original);
        }
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(err);
  }
);

