'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '@/assets/images/sumtimeLogo.png';
import { signIn } from 'next-auth/react';
import * as S from './Login.styled';

function LoginSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/todo',
    });
  };

  return (
    <S.LoginSection>
      <S.LoginLogo src={logo.src} alt="logo" />

      <S.LoginInputDiv>
        <TextField
          // error={!validation}
          fullWidth
          id="outlined-error-helper-text"
          label="email"
          // helperText={validation ? '' : '올바른 형식의 이메일을 입력해주세요'}
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </S.LoginInputDiv>
      <S.LoginInputDiv>
        <TextField
          // error={!validation}
          fullWidth
          id="outlined-error-helper-text"
          label="비밀번호"
          // helperText={validation ? '' : '올바른 형식의 비밀번호를 입력해주세요'}
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </S.LoginInputDiv>

      <Button variant="outlined" onClick={() => handleSignIn()}>
        로그인
      </Button>

      <Button variant="outlined" onClick={() => signIn('google', { redirect: true, callbackUrl: '/todo' })} type="button">
        구글 로그인
      </Button>
    </S.LoginSection>
  );
}

export default LoginSection;
