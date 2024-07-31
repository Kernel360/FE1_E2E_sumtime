'use client';

import SignupSection from '@/components/signup/index';
import * as S from './SignupPage.styled';

export default function Signup() {
  return (
    <S.SignupPage>
      <SignupSection />
    </S.SignupPage>
  );
}
