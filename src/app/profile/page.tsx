'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useUserState } from '@/store/useUserStore';

export default function Page() {
  const user = useUserState((state) => state.user);
  if (user == null) {
    return (
      <div className="flex flex-col justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-8">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image!} />
          </Avatar>
          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 pt-6">
          <div>
            <p className="text-muted-foreground text-sm">Name</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Email</p>
            <p>{user.email}</p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
