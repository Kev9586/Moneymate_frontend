import { api } from './client';

export const getGoals = async () => {
  try {
    const response = await api.get('/goals');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addGoal = async (goalData) => {
  try {
    const response = await api.post('/goals', goalData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};