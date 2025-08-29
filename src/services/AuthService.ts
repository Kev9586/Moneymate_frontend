import {apiClient} from './ApiClient';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      // Store token securely
      await EncryptedStorage.setItem('auth_token', response.token);
      await EncryptedStorage.setItem(
        'user_data',
        JSON.stringify(response.user),
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  static async signup(
    email: string,
    password: string,
    name: string,
  ): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/register', {
        email,
        password,
        name,
      });

      // Store token securely
      await EncryptedStorage.setItem('auth_token', response.token);
      await EncryptedStorage.setItem(
        'user_data',
        JSON.stringify(response.user),
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  }

  static async logout(): Promise<void> {
    try {
      // Call logout endpoint if available
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continue with local logout even if API call fails
      console.log('Logout API call failed:', error);
    } finally {
      // Clear stored data
      await EncryptedStorage.removeItem('auth_token');
      await EncryptedStorage.removeItem('user_data');
    }
  }

  static async forgotPassword(email: string): Promise<void> {
    try {
      await apiClient.post('/auth/forgot-password', {email});
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to send reset email',
      );
    }
  }

  static async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    try {
      await apiClient.post('/auth/reset-password', {
        token,
        password: newPassword,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to reset password',
      );
    }
  }

  static async getStoredToken(): Promise<string | null> {
    try {
      return await EncryptedStorage.getItem('auth_token');
    } catch (error) {
      return null;
    }
  }

  static async getStoredUser(): Promise<any | null> {
    try {
      const userData = await EncryptedStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }
}
