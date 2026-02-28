import { create } from 'zustand';

type User = {
  id: string;
  name: string | null;
};

type State = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserState = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
