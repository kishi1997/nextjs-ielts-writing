'use server';
import { GetSession } from '../session';

export async function requireUser() {
  const session = await GetSession();
  if (!session) {
    throw new Error('Unauthorised');
  }
  return session;
}
