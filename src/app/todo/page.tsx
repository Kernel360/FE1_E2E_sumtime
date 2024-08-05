import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@/components/SignIn/SignOutButton';

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect('/');
  }

  return (
    <>
      <p>Welcome to the App, {session?.user?.name}!</p>
      {session?.user?.image && <img src={session?.user?.image} alt="프로필" />}
      <SignOutButton />
    </>
  );
}
