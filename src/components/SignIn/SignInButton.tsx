'use client';

import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { Button } from '@mui/material';

interface IProps {
  providers: Record<LiteralUnion<string, string>, ClientSafeProvider>;
}

export function SignInButton({ providers }: IProps) {
  return Object.values(providers).map((provider) => (
    <div key={provider.name}>
      <Button variant="outlined" onClick={() => signIn(provider.id)} type="button">
        구글 로그인
      </Button>
    </div>
  ));
}
