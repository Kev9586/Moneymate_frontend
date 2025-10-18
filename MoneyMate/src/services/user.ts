import api from './api';

export const getMe = () => {
  return api.get('/api/v1/users/me');
};
