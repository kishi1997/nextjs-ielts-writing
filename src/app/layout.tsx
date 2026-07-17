import './globals.css';
import { auth } from '@/lib/auth';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { prisma } from '@/lib/prisma';
import { UserProvider } from '@/components/userProvider';
import { MoonStar } from 'lucide-react';
import Image from 'next/image';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ⭐ Serverでuser取得
  const session = await auth();
  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });
  }
  return (
    <html lang="ja">
      <body>
        <UserProvider user={user}>
          <SidebarProvider>
            <div className="app-backdrop min-h-screen w-full text-white">
              <AppSidebar />

              <div className="relative flex min-h-screen flex-1 flex-col bg-[#070a0e]/88">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#080b10]/90 px-4 backdrop-blur-xl md:px-7">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger />
                    <div className="hidden items-center gap-2 text-xs font-bold text-white/45 sm:flex">
                      <MoonStar className="h-4 w-4 text-[#ffd43b]" />
                      NIGHT STUDY MODE
                    </div>
                  </div>
                  <a
                    href="/profile"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] transition hover:border-[#58cc02]/40 hover:bg-white/10"
                    aria-label="プロフィール"
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt="ユーザーアイコン"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center text-xs font-black text-[#ffd43b]">
                        ?
                      </span>
                    )}
                  </a>
                </header>

                <main className="flex flex-1 flex-col items-center px-4 py-6 md:px-8 md:py-9">
                  <div className="w-full max-w-7xl">{children}</div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
