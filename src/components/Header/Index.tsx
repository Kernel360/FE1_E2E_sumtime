import * as S from '@/components/Header/Header.styled';
import logo from '@/assets/images/sumtimeRowLogo.png';
import { useSession, signOut } from 'next-auth/react';
import signOutIcon from '@/assets/icons/signOut.svg';

function Header() {
  const { data: session } = useSession();

  return (
    <S.Container>
      <S.Logo src={logo.src} alt="logo" />

      <S.ProfileDiv $align="center">
        <S.UserName>{session?.user.name}</S.UserName>
        <S.UserP>님의 하루를 더해보세요!</S.UserP>
        <S.SignOutBtn onClick={() => signOut({ callbackUrl: '/' })}>
          <img src={signOutIcon.src} alt="로그아웃" />
        </S.SignOutBtn>
      </S.ProfileDiv>
    </S.Container>
  );
}

export default Header;
