'use client';

import { useUserState } from '@/store/useUserStore';
import { useEffect } from 'react';

type User = ReturnType<typeof useUserState.getState>['user'];

export const UserProvider = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    useUserState.setState({ user });
  }, [user]);

  return children;
};
