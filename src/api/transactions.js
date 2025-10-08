import { api } from './client';

export const getTransactions = async (params) => {
  try {
    const response = await api.get('/transactions', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await api.patch(`/transactions/${id}`, transactionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};