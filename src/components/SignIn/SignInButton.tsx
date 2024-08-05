import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@mui/material';

export default function SignInButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <Button variant="outlined" onClick={() => signOut()} type="button">
          로그아웃
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button variant="outlined" onClick={() => signIn('google')} type="button">
        로그인
      </Button>
    </>
  );
}
