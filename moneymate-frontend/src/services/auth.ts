import { authClient } from './firebase';
import type { User } from '../types';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';

const storage = window.localStorage;

export const auth = {
  async bootstrap(): Promise<{ firstRun: boolean; token: string | null }> {
    const firstRun = storage.getItem('firstRun') !== 'false';

    // If there's a Firebase user, get ID token
    return new Promise((resolve) => {
      onAuthStateChanged(authClient, async (user) => {
        if (user) {
          const token = await getIdToken(user);
          resolve({ firstRun, token });
        } else {
          const token = storage.getItem('token');
          resolve({ firstRun, token });
        }
      });
    });
  },

  setFirstRun(val: boolean) {
    storage.setItem('firstRun', val ? 'true' : 'false');
  },

  setUser(user: User) {
    storage.setItem('user', JSON.stringify(user));
  },

  setToken(token: string) {
    storage.setItem('token', token);
  },

  clear() {
    storage.removeItem('token');
    storage.removeItem('refreshToken');
    storage.removeItem('user');
    storage.removeItem('firstRun');
  },
};

export default auth;
