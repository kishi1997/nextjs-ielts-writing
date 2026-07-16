import { signIn, signOut } from '@/lib/auth';
import { LogIn } from 'lucide-react';

export function SignIn({ provider = 'google' }: { provider?: string }) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider, {
          redirectTo: '/dashboard',
        });
      }}
    >
      <button className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#58cc02] px-5 font-black text-[#092100] shadow-[0_6px_0_#2c7100] transition hover:-translate-y-0.5 hover:bg-[#7be338]">
        <LogIn className="h-5 w-5" />
        Googleでログイン
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
      <button className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
        Sign Out
      </button>
    </form>
  );
}
