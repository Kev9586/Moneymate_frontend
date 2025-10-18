import api from './api';

export const sendOtp = (email: string) => {
  return api.post('/api/v1/auth/send-otp', { email });
};

export const signup = (data: any) => {
  return api.post('/api/v1/auth/signup', data);
};

export const login = (data: any) => {
  return api.post('/api/v1/auth/login', data);
};
