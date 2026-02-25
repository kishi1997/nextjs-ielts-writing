import { auth } from '@/lib/auth';
import { SignIn, SignOut } from '@/components/auth-buttons';
import { Tasklist } from '@/components/tasklist';
import { prisma } from '@/lib/prisma';
import { UserInitializer } from '@/components/userInitializer';

export default async function Home() {
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
    <div className="flex items-center justify-center">
      {!session ? (
        <div>
          <SignIn />
          <Tasklist />
        </div>
      ) : (
        <div>
          <UserInitializer user={user} />
          <div className="text-center">
            <p className="text-gray-300">Signed in as:</p>
            <p className="text-white">{user?.email}</p>
            <SignOut />
          </div>
          <Tasklist />
        </div>
      )}
    </div>
  );
}
