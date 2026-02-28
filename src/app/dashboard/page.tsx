import { SignOut } from '@/components/auth-buttons';
import Tasklist from '@/components/tasklist';

const page = () => {
  return (
    <div>
      <h1>dashboard</h1>
      <SignOut />
      <Tasklist />
    </div>
  );
};

export default page;
