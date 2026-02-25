import { cache } from 'react';
import { auth } from './auth';

export const GetSession = cache(async () => {
  return await auth();
});
