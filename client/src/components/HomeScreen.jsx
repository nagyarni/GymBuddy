import React from 'react';
import TopBar from './util/TopBar';
import { Typography, Button, Box, Stack } from '@mui/material'; // Assuming you're using Material-UI components
import { useSelector } from 'react-redux';
import { useSnackbar } from './util/SnackBarContext';
import { useNavigate } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

function HomeScreen() {
  const navigate = useNavigate()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.user?.name)
  const { setSnackbarMessage } = useSnackbar();
  const isClient = useSelector((state) => state.auth.isClient)
  const isCoach = useSelector((state) => state.auth.isCoach)
  const isAdmin = useSelector((state) => state.auth.isAdmin)
  const userId = useSelector((state) => (state.auth.user?.userId))

  const handleClick = () => {
    setSnackbarMessage({ message: "This is a test", isError: false });
  };

  const mycyclesclick = () => {
    navigate(`/${userId}/cycles`)
  }
  const myclientsclick = () => {
    navigate(`/clients`)

  }

  const notLoggedInContent = 
    <Box p={3} textAlign="center">
      <Typography variant="h4" align="center" style={{ marginTop: 20 }}>
        Welcome to GymBuddy!
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 20, marginTop: 20 }}>
        Our app allows you to work together with a professional coach of your choice, and receive personalized guidance. Track your progress, and stay motivated!
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 20 }}>
        Create an account, or sign in to proceed!
      </Typography>
    </Box>

  const loggedInContent = 
  <Box p={3} textAlign="center">
    <Typography variant="h4" style={{ marginBottom: 20 }}>
      {`Hello, ${name}`}
    </Typography>
    <Typography variant="h5" style={{ marginBottom: 20, marginTop: 40 }}>
      Use the menu on the top left side of the screen to access the features of this app!
    </Typography>

    {
      isClient ?
        <Button variant="contained" onClick={mycyclesclick} startIcon={<FormatListBulletedIcon />}>My cycles</Button>
      : ""
    }
    {
      isCoach ?
        <Button variant="contained" onClick={myclientsclick} startIcon={<FormatListBulletedIcon />}>My clients</Button>
      : ""
    }
  </Box>
  
  return (
    <>
      <TopBar title='Home Screen' />
      {isLoggedIn ? loggedInContent : notLoggedInContent}
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Show Snackbar
        </Button>
      </div> */}
    </>
  );
}

export default HomeScreen;
