import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
import { BASE_API_URL } from '@env';

const storage = new MMKV();

const api = axios.create({
  baseURL: BASE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = storage.getString('firebaseToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
