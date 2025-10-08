import { api } from './client';

export const updatePreferences = async (preferences) => {
  try {
    const response = await api.patch('/user/preferences', preferences);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateSecurity = async (securityData) => {
  try {
    const response = await api.patch('/user/security', securityData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};