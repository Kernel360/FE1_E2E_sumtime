'use client';

import Header from '@/components/Header';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { signOut } from 'next-auth/react';
import * as S from '@/app/mypage/MyPage.styled';

interface MyPageLayoutProps {
  children: ReactNode;
}

const MENU_ITEM = [
  { href: '/mypage/account', icon: <AccountCircleOutlinedIcon color="action" />, text: '계정' },
  { href: '/mypage/category', icon: <CategoryOutlinedIcon />, text: '카테고리' },
  { href: '/mypage/faq', icon: <LiveHelpOutlinedIcon />, text: 'FAQ' },
];

function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <>
      <Header />
      <S.Container>
        <Box display="flex" flexDirection="column" gap="30px" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {MENU_ITEM.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton href={item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={() => signOut({ callbackUrl: '/landing' })}>
              <ListItemIcon>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="로그아웃" />
            </ListItemButton>
          </ListItem>
        </Box>
        <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
      </S.Container>
    </>
  );
}

export default MyPageLayout;
