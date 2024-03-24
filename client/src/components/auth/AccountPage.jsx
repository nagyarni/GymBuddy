import React, { useState } from 'react';
import { Typography, Container, Grid, TextField, Button, FormControlLabel, Switch, Paper, Divider, Box, Checkbox, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../util/TopBar';
import { useSnackbar } from '../util/SnackBarContext';
import { useUpdateUserMutation } from '../../features/auth/authApi-slice';
import { setCredentials } from '../../features/auth/auth-slice';

function AccountPage() {

  const dispatch = useDispatch();
  const { setSnackbarMessage } = useSnackbar()

  // Using the mutation
  const [updateUser, updateUserResult] = useUpdateUserMutation();

  const [name, setName] = useState(useSelector((state) => state.auth.user.name));
  const userData = {
    email: useSelector((state) => state.auth.user.email),
    userId: useSelector((state) => state.auth.user.userId),
    isClient: useSelector((state) => state.auth.isClient),
    isCoach: useSelector((state) => state.auth.isCoach),
    isAdmin: useSelector((state) => state.auth.isAdmin),
    coachName: useSelector((state) => state.auth.user.coachName.coachName),
    coachId: useSelector((state) => state.auth.user.coachName?.coachId),
    joinDate: useSelector((state) => state.auth.user.joinDate),
    numCycles: useSelector((state) => state.auth.user.client?.cycles?.length),
    numClients: useSelector((state) => state.auth.user.coach?.clients?.length),
    clientEmailNotifications: useSelector((state) => state.auth.user.client?.emailnotif),
    coachEmailNotifications: useSelector((state) => state.auth.user.coach?.emailnotif),
  };

  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [clientEmailNotif, setClientEmailNotif] = useState(userData.clientEmailNotifications ? true : false);
  const [coachEmailNotif, setCoachEmailNotif] = useState(userData.coachEmailNotifications ? true : false);

  const handleSubmit = async () => {
    console.log('Form submitted');
    console.log('Name:', name);
    console.log('Old Password:', passwords.oldPassword);
    console.log('New Password:', passwords.newPassword);
    console.log('Client Email Notifications:', clientEmailNotif);
    console.log('Coach Email Notifications:', coachEmailNotif);

    const body = {
      name: name,
    }

    if (passwords.newPassword !== '') {
      console.log("Password changing")
      body.password = passwords.newPassword
    }
    if (userData.isClient) {
      body._client = {}
      body._client.emailnotif = clientEmailNotif
    }
    if (userData.isCoach) {
      body._coach = {}
      body._coach.emailnotif = coachEmailNotif
    }
    console.log(body)

    try {
      const data = await updateUser({ userid: userData.userId, oldPassword: passwords.oldPassword, email: userData.email, newUserInfo: body }).unwrap()
      console.log(data.token)
      const token = data.token
      const decodedToken = atob(token.split('.')[1]); // Decode the Payload part
      const parsedToken = JSON.parse(decodedToken);
      dispatch(setCredentials({ accessToken: token, user: parsedToken }))
      localStorage.setItem('token', token)
      localStorage.setItem('user', decodedToken)
      setSnackbarMessage({ message: "Successfully saved!", isError: false });
      setPasswords({ ...passwords, oldPassword: "" })
    } catch (error) {
      const errorMessage = error.data ? error.data.message : 'Saving failed!';
      console.log(error)
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
  };

  return (
    <>
      <TopBar title="Account" />
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Account Details
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Account Information
                </Typography>
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField sx={{ marginTop: 3 }} fullWidth label="Email" value={userData.email} disabled />
                <TextField sx={{ marginTop: 3 }} fullWidth label="Join Date" value={userData.joinDate} disabled />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Account Type
                </Typography>
                <FormControlLabel
                  control={<Checkbox checked={userData.isClient} />}
                  label="Client"
                  disabled
                />
                <FormControlLabel
                  control={<Checkbox checked={userData.isCoach} />}
                  label="Coach"
                  disabled
                />
                <FormControlLabel
                  control={<Checkbox checked={userData.isAdmin} />}
                  label="Admin"
                  disabled
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 4, mt: 4 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Additional Information
                </Typography>
                {userData.isClient && (
                  <>
                    <Typography gutterBottom>Your Coach: {userData.coachName}</Typography>
                    <Typography gutterBottom>Number of Cycles: {userData.numCycles}</Typography>
                  </>
                )}
                { userData.isClient && userData.isCoach ? <Divider sx={{ mb: 3, mt: 2 }} /> : "" }
                {(userData.isCoach) && (
                  <>
                    <Typography gutterBottom>My Coach Code: {userData.userId}</Typography>
                    <Typography gutterBottom>Number of Clients: {userData.numClients}</Typography>
                  </>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Account Options
                </Typography>
                {
                  userData.isClient ? 
                  <FormControlLabel
                    control={<Switch checked={clientEmailNotif} onChange={(e) => setClientEmailNotif(e.target.checked)} />}
                    label="Client Email Notifications"
                  />
                  : ""
                }
                {
                  userData.isCoach ?
                    <FormControlLabel
                      control={<Switch checked={coachEmailNotif} onChange={(e) => setCoachEmailNotif(e.target.checked)} />}
                      label="Coach Email Notifications"
                    />
                  : ""
                }
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 4, mt: 4 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Change Password
                </Typography>
                <TextField
                  fullWidth
                  label="Old Password"
                  type="password"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Tooltip title={passwords.oldPassword === '' ? "Please provide your password!" : ""}>
                <span>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={handleSubmit} 
                  disabled={!passwords.oldPassword}
                >
                  Save Changes
                </Button>  
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default AccountPage;
