import { create } from 'zustand';
import auth from '../services/auth';

type AuthState = {
  token: string | null;
  firstRun: boolean;
  initialized: boolean;
  setToken: (t: string | null) => void;
  setFirstRun: (v: boolean) => void;
  bootstrap: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  firstRun: true,
  initialized: false,
  setToken: (t: string | null) => set({ token: t }),
  setFirstRun: (v: boolean) => set({ firstRun: v }),
  bootstrap: async () => {
    try {
      const res = await auth.bootstrap();
      set({ token: res.token, firstRun: res.firstRun ?? true, initialized: true });
    } catch (e) {
      set({ token: null, initialized: true });
    }
  },
}));

export default useAuthStore;
