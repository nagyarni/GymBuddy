import React, { useState } from 'react'
import Container from '@mui/material/Container'
import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Stack } from '@mui/material'
import NavigationBar from './NavigationBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { borders } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/auth-slice';




function TopBar(props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    //dispatch(authActions.login())
    navigate("/login")
  }

  const handleRegister = (event) => {
    event.preventDefault()
    navigate("/register")
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    navigate("/")
  }

  const handleAccount = (event) => {
    event.preventDefault()
    navigate("/account")
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

              <>
                <Button color="inherit" onClick={handleLogin}>Login</Button>
                <Button color="inherit" onClick={handleRegister}>Sign up</Button>
              </> : <>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                <Button color="inherit" onClick={handleAccount}>Account</Button>
              </>

          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default TopBar