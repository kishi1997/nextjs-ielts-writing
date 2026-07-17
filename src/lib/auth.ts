import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { D1Adapter } from '@auth/d1-adapter';
import { getDatabase } from './db';

export const { handlers, auth, signIn, signOut } = NextAuth(() => ({
  adapter: D1Adapter(getDatabase()),
  providers: [Google],
  trustHost: true,
}));
