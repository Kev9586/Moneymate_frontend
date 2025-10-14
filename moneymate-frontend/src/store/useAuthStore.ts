import { create } from 'zustand';
import auth from '../services/auth';

type AuthState = {
  token: string | null;
  firstRun: boolean;
  initialized: boolean;
  loading: boolean;
  error: string | null;
  setToken: (t: string | null) => void;
  setFirstRun: (v: boolean) => void;
  bootstrap: () => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  firstRun: true,
  initialized: false,
  loading: false,
  error: null,
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
  login: async (email, pass) => {
    set({ loading: true, error: null });
    try {
      const { token } = await auth.login(email, pass);
      set({ token, loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },
  signup: async (email, pass) => {
    set({ loading: true, error: null });
    try {
      const { token } = await auth.signup(email, pass);
      set({ token, loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },
}));

export default useAuthStore;
