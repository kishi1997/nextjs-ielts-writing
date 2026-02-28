import { SignIn } from '@/components/auth-buttons';

const page = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-4xl">LOGIN PAGE</h1>
      <SignIn />
    </div>
  );
};

export default page;
