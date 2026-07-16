import { create } from 'zustand';
import type { User } from '@prisma/client';

type State = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserState = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
