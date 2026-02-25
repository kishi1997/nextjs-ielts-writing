'use client';

import { useUserState } from '@/store/useUserStore';
import { useEffect } from 'react';

type User = ReturnType<typeof useUserState.getState>['user'];

export const UserInitializer = ({ user }: { user: User }) => {
  useEffect(() => {
    useUserState.setState({ user });
  }, [user]);

  return null;
};
