import React, { useState } from 'react'
import Container from '@mui/material/Container'
import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Stack } from '@mui/material'
import NavigationBar from './NavigationBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { borders } from '@mui/system';




function TopBar(props) {

  const [isLoggedIn, setLoggedIn] = useState(false)

  const handleLogin = (event) => {
    event.preventDefault()
    console.log("Running login button handler, WIP!\nLogged in!")
    setLoggedIn(true)
  }

  return (
    <>
      <AppBar 
        position="static" 
        color="primary"
        >
        <Toolbar>
          <NavigationBar />
          <Typography 
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }} 
          >
            {props.title}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
          >

            {!isLoggedIn ? 
              <>
                <Button color="inherit" onClick={handleLogin}>Login</Button>
                <Button color="inherit">Sign up</Button>
              </> : (
                <Button color="inherit">Account</Button>
              )

            }
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default TopBar