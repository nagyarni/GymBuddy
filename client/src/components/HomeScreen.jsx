import React from 'react'
import TopBar from './util/TopBar'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useSnackbar } from './util/SnackBarContext'


function HomeScreen() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const { setSnackbarMessage } = useSnackbar()

  const handleClick = () => {
    setSnackbarMessage({ message: "This is a test", isError: false });
  };

  return (
    <>
      <TopBar title='Home Screen' />
      <Typography>
        {
          isLoggedIn? "Hello logged in user!" : "Please Log in!" 
        }
      </Typography>
      <button onClick={handleClick}>Show Snackbar</button>;
    </>
  )
}

export default HomeScreen