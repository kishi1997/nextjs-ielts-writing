import { signIn, signOut } from '@/lib/auth';

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider, {
          redirectTo: '/dashboard',
        });
      }}
    >
      <button className="rounded-md bg-neutral-700 p-2 text-white">
        Sign In with {provider}
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          redirectTo: '/login',
        });
      }}
      className="w-full"
    >
      <button className="rounded-md bg-neutral-700 p-2 text-white">
        Sign Out
      </button>
    </form>
  );
}
