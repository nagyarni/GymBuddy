import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';
import { useLoginMutation } from '../../features/auth/authApi-slice';
import { setCredentials } from '../../features/auth/auth-slice';
import { useSnackbar } from '../util/SnackBarContext';




export default function SignIn() {
  const { setSnackbarMessage } = useSnackbar()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRef = useRef()
  const errRef = useRef()

  const [login, { isLoading }] = useLoginMutation()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    const email = data.get('email')
    const password = data.get('password')

    try {
      const userData = await login({ email, password }).unwrap()
      ////console.log(userData)
      const token = userData.token
      const decodedToken = atob(token.split('.')[1]); // Decode the Payload part
      const parsedToken = JSON.parse(decodedToken);
      ////console.log(parsedToken);
      dispatch(setCredentials({ accessToken: token, user: parsedToken }))
      setSnackbarMessage({ message: "Successfully logged in!", isError: false });
      localStorage.setItem('token', token)
      localStorage.setItem('user', decodedToken)
      navigate("/")
    } catch (error) {
      //console.log(error)
      const errorMessage = error.data ? error.data.message : 'An unexpected error occurred';
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
    
  };

  return (
    <>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}