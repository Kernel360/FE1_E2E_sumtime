import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { SignInButton } from '@/components/SignIn/SignInButton';

export default async function Page() {
  const session = await getServerSession();
  const providers = await getProviders();

  if (session) {
    redirect('/todo');
  }

  if (!providers) {
    return <div>Sign in is not available</div>;
  }

  return <SignInButton providers={providers} />;
}
