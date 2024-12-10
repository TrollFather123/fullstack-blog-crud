
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { currentUser } from '@/redux/slice/userSlice';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const cookies = parseCookies();
  const userId = cookies["user_id"];
  // const {user} = useAppSelector((s) => s.user);

  // const dispatch = useAppDispatch();

  // useEffect(()=>{
  //   dispatch(currentUser(userId))
  // },[]);


  console.log(userId,"user")
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={()=> router.push("/login")}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
