import React from 'react'
import TopBar from './TopBar'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

function HomeScreen() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)


  return (
    <>
      <TopBar title='Home Screen' />
      <Typography>
        {
          isLoggedIn? "Hello logged in user!" : "Please Log in!" 
        }
      </Typography>
    </>
  )
}

export default HomeScreen