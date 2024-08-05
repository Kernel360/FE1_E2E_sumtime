'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@mui/material';

export function SignOutButton() {
  return (
    <Button variant="outlined" onClick={() => signOut()} type="button">
      로그아웃
    </Button>
  );
}
