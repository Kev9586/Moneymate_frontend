import axios from 'axios';
import { API_URL } from '@env';
import { useAuthStore } from '../store/useAuthStore';

const apiClient = axios.create({ baseURL: API_URL, timeout: 10000 });

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) useAuthStore.getState().logout();
    return Promise.reject(err);
  }
);

export default apiClient;
