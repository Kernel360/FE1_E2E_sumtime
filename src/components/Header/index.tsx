'use client';

import * as S from '@/components/Header/Header.styled';
import logo from '@/assets/images/sumtimeRowLogo.png';
import { useSession } from 'next-auth/react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRef, useState } from 'react';
import HeaderList from './HeaderList';

function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current && !containerRef.current.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <S.Container>
      <S.Logo src={logo.src} alt="logo" onClick={() => router.push('/')} />
      <S.ProfileDiv $align="center">
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <S.UserNameButton>
            <S.UserName>{session?.user.name}</S.UserName>
          </S.UserNameButton>
          {isOpen && <HeaderList />}
        </div>
        <S.UserP>님의 하루를 더해보세요!</S.UserP>
        <Link href="/mypage/account">
          <S.IconWrapper>
            <SettingsOutlinedIcon />
          </S.IconWrapper>
        </Link>
      </S.ProfileDiv>
    </S.Container>
  );
}

export default Header;
