'use server';
import { signIn, signOut } from '@/lib/auth';

export const SignIn = async () => {
  await signIn('google');
};
export const SignOut = async () => {
  await signOut();
};
