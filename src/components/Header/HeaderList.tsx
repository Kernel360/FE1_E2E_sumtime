import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { signOut } from 'next-auth/react';

function HeaderList() {
  return (
    <List
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 10,
        backgroundColor: 'white',
        border: '1px solid #dadce0',
        borderRadius: '5px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      }}
    >
      <ListItem disablePadding>
        <ListItemButton component="a" href="/mypage/account">
          <ListItemText primary="Account" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component="a" href="/mypage/category">
          <ListItemText primary="Category" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component="a" href="/mypage/faq">
          <ListItemText primary="FAQ" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={() => signOut({ callbackUrl: '/landing' })}>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default HeaderList;
