import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { selectIsAuthorised, signOut } from './features/sign-in/signInSlice';
import { selfThink } from './features/users/usersSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { useEffect } from 'react';

import './App.css';

function App() {
  const isAuthorised = useAppSelector(selectIsAuthorised);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(signOut());
    Cookies.remove('connect.sid');
  }

  useEffect(() => {
    if (isAuthorised) {
      dispatch(selfThink());
    }
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Files Upload App
          </Typography>
          {isAuthorised &&
            <>
              <Button color="inherit"><NavLink to={'/'}>Upload file</NavLink></Button>
              <Button color="inherit"><NavLink to={'/files'}>My files</NavLink></Button>
              <Button onClick={handleLogout} color="inherit">Logout</Button>
            </>
          }
          {!isAuthorised &&
            <>
              <Button color="inherit"><NavLink to={'/sign-in'}>Sign in</NavLink></Button>
              <Button color="inherit"><NavLink to={'/sign-up'}>Sign up</NavLink></Button>
            </>
          }
        </Toolbar>
      </AppBar>
      <Container component='main' maxWidth='sm'>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}

export default App;