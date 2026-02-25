'use client';
import { useUserState } from '@/store/useUserStore';
import { useRef } from 'react';

type User = ReturnType<typeof useUserState.getState>['user'];

export const UserInitializer = ({ user }: { user: User }) => {
  const initialized = useRef(false);
  if (!initialized.current) {
    useUserState.setState({ user });
    initialized.current = true;
  }
  return null;
};
