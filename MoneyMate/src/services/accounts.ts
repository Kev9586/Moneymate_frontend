import api from './api';

export const getAccounts = () => {
  return api.get('/api/v1/accounts');
};
