import { api } from './client';

export const getAccounts = async () => {
  try {
    const response = await api.get('/accounts');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addAccount = async (accountData) => {
  try {
    const response = await api.post('/accounts', accountData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateAccount = async (id, accountData) => {
  try {
    const response = await api.patch(`/accounts/${id}`, accountData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteAccount = async (id) => {
  try {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};