import './globals.css';
import { auth } from '@/lib/auth';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { prisma } from '@/lib/prisma';
import { UserProvider } from '@/components/userProvider';

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
    <html lang="en">
      <body>
        <UserProvider user={user}>
          <SidebarProvider>
            <div className="flex min-h-screen w-full bg-black text-white">
              <AppSidebar />

              <div className="flex flex-1 flex-col">
                <header className="p-4">
                  <SidebarTrigger />
                </header>

                <main className="flex flex-1 flex-col items-center justify-center p-8">
                  <div className="w-full max-w-3xl">{children}</div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
