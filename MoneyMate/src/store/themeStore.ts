import { create } from 'zustand';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: (storage.getString('theme') as 'light' | 'dark') || 'light',
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      storage.set('theme', newTheme);
      return { theme: newTheme };
    });
  },
}));

export default useThemeStore;
