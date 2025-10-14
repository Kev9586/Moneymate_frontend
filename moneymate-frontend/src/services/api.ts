import axios from 'axios';
import { auth } from '@/lib/firebase';
import { env } from '@/lib/env';

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
