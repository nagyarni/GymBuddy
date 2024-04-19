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
import { useSnackbar } from '../util/SnackBarContext';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi-slice';
import { Switch } from '@mui/material';
import { setCredentials } from '../../features/auth/auth-slice';


export default function RegisterPage() {

  const { setSnackbarMessage } = useSnackbar()
  
  const [isCoach, setIsCoach] = React.useState(false); // State to track the position of the Switch

  const handleSwitchChange = (event) => {
    setIsCoach(event.target.checked); // Update the state based on the position of the Switch
  };

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      allowExtraEmails: data.get('allowExtraEmails') === 'true',
      name: data.get('name'),
      userType: data.get('userType') === null ? 0 : 1,
      coachID: data.get('coachID')
    });

    const email = data.get('email')
    const password = data.get('password')
    const name = data.get('name')
    const allowExtraEmails = data.get('allowExtraEmails') === 'true'
    const type = data.get('userType') === null ? 0 : 1
    const coachID = data.get('coachID')

    // Send register user request, save received credentials for further use and navigate to '/'
    try {
      const userData = await register({ email, password, name, type, coachID, allowExtraEmails }).unwrap()
      console.log(userData)
      const token = userData.token
      const decodedToken = atob(token.split('.')[1]); // Decode the Payload part
      const parsedToken = JSON.parse(decodedToken);
      console.log(parsedToken);
      dispatch(setCredentials({ accessToken: token, user: parsedToken }))
      setSnackbarMessage({ message: "Successfully registered account!", isError: false });
      localStorage.setItem('token', token)
      localStorage.setItem('user', decodedToken)
      navigate("/")
    } catch (error) {
      console.error('Registration Error:', error);

      let errorMessage = error.data ? error.data.error : 'An unexpected error occurred';
      if (error.data.message) {
        errorMessage = error.data.message
      }
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
  };

  return (
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="family-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch onChange={handleSwitchChange} />} label={isCoach ? "Coach" : "Client"} name='userType' id='userType' />
              </Grid>
              { !isCoach ? 
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="coachID"
                    label="CoachID (optional)"
                    id="coachID"
                  />
                </Grid>
                : ""
              }
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='true' color="primary" name='allowExtraEmails' id='allowExtraEmails' />}
                  label="I want to receive notifications via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}