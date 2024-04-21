import React from 'react';
import TopBar from './util/TopBar';
import { Typography, Button } from '@mui/material'; // Assuming you're using Material-UI components
import { useSelector } from 'react-redux';
import { useSnackbar } from './util/SnackBarContext';

function HomeScreen() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { setSnackbarMessage } = useSnackbar();

  const handleClick = () => {
    setSnackbarMessage({ message: "This is a test", isError: false });
  };

  return (
    <>
      <TopBar title='Home Screen' />
      <Typography variant="h4" align="center" style={{ marginTop: 20 }}>
        Welcome to Our Gym Workout Plan App
      </Typography>
      <Typography variant="body1" align="center" style={{ marginTop: 10, marginBottom: 20 }}>
        Your personalized fitness journey starts here!
      </Typography>
      <Typography variant="body1" align="center" style={{ marginBottom: 20 }}>
        Our app allows you to create personalized workout plans tailored to your fitness goals.
      </Typography>
      <Typography variant="body1" align="center" style={{ marginBottom: 20 }}>
        Interact seamlessly with your coaches to receive guidance, track your progress,
        and stay motivated throughout your fitness journey.
      </Typography>
      <Typography variant="body1" align="center" style={{ marginBottom: 20 }}>
        {
          isLoggedIn ? "Hello, logged in user!" : "Please log in to access your personalized content."
        }
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Show Snackbar
        </Button>
      </div>
    </>
  );
}

export default HomeScreen;
