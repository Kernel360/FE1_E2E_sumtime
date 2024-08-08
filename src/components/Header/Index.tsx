import * as S from '@/components/Header/Header.styled';
import logo from '@/assets/images/sumtimeRowLogo.png';
import { useSession } from 'next-auth/react';

function Header() {
  const { data: session } = useSession();

  return (
    <S.Container>
      <S.Logo src={logo.src} alt="logo" />

      <S.ProfileDiv $align="center">
        <p>{session?.user.name}님의 하루를 더해보세요!</p>
      </S.ProfileDiv>
    </S.Container>
  );
}

export default Header;
