import api from './api';
import { Transaction } from '../types';

export const getRecentTransactions = () => {
  return api.get('/api/v1/transactions/recent');
};

export const getTransactionsByAccount = (accountId: string) => {
  return api.get(`/api/v1/accounts/${accountId}/transactions`);
};

export const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
  return api.post('/api/v1/transactions', transaction);
};

export const updateTransaction = (
  id: string,
  transaction: Partial<Transaction>
) => {
  return api.patch(`/api/v1/transactions/${id}`, transaction);
};

export const deleteTransaction = (id: string) => {
  return api.delete(`/api/v1/transactions/${id}`);
};
