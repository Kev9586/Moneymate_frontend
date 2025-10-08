import { api } from './client';

export const getSummary = async () => {
  try {
    const response = await api.get('/summary');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};