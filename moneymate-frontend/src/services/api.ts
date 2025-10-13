import axios from 'axios';
import { authClient } from './firebase';
import { getIdToken } from 'firebase/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject Firebase ID token when available
api.interceptors.request.use(
  async (config) => {
    try {
      const user = authClient.currentUser;
      if (user) {
        const token = await getIdToken(user, /* forceRefresh */ false);
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      // ignore token errors; request will be unauthenticated
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Simple response interceptor to forward errors (refresh logic handled server-side)
api.interceptors.response.use((r) => r, (e) => Promise.reject(e));