import { api } from './client';

export const getSummaryReport = async (params) => {
  try {
    const response = await api.get('/reports/summary', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTrendsReport = async (params) => {
  try {
    const response = await api.get('/reports/trends', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};