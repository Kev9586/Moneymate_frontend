import { create } from 'zustand';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

interface AuthState {
  isAuthenticated: boolean;
  isUnlocked: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  setUnlocked: (unlocked: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!storage.getString('firebaseToken'),
  isUnlocked: false,
  token: storage.getString('firebaseToken') || null,
  login: (token) => {
    storage.set('firebaseToken', token);
    set({ isAuthenticated: true, token });
  },
  logout: () => {
    storage.delete('firebaseToken');
    set({ isAuthenticated: false, token: null, isUnlocked: false });
  },
  setUnlocked: (unlocked) => {
    set({ isUnlocked: unlocked });
  },
}));

export default useAuthStore;
