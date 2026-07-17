import { create } from 'zustand';
import type { AppUser } from '@/types/user';

type State = {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
};

export const useUserState = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
