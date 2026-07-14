import { create } from 'zustand';
import { MOCK_USER } from '../data/mock';

interface AppState {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  user: typeof MOCK_USER | null;
  login: () => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  isOnboarded: false,
  user: null,
  login: () => set({ isAuthenticated: true, user: MOCK_USER }),
  logout: () => set({ isAuthenticated: false, user: null, isOnboarded: false }),
  completeOnboarding: () => set({ isOnboarded: true }),
}));
