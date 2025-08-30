import axios, {AxiosInstance, AxiosResponse} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const BASE_URL = 'https://bank-expense-tracker.onrender.com/api/v1';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async config => {
        try {
          const token = await EncryptedStorage.getItem('auth_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.log('Token retrieval error:', error);
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Clear stored token
          await EncryptedStorage.removeItem('auth_token');

          // Redirect to login or refresh token logic here
          // For now, just reject the promise
          return Promise.reject(error);
        }

        // Handle network errors
        if (!error.response) {
          return Promise.reject(
            new Error('Network error. Please check your connection.'),
          );
        }

        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get(url, {params});
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete(url);
    return response.data;
  }
}

export const apiClient = new ApiClient();
