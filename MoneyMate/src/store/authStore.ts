import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  user: any; // Replace 'any' with a proper user type later
  login: (user: any) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));

export default useAuthStore;