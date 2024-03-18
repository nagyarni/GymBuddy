import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, MenuItem, Fab, Typography, CircularProgress  } from '@mui/material';
import TableDay from '../util/tablecomponents/TableDay';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TopBar from '../util/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import Cycle from '../client/Cycle';
import Client from './Client';
import NotLoggedInPage from '../util/tablecomponents/NotLoggedInPage';
import { clientsActions } from '../../features/clients/clients-slice';
import { useGetClientsByUserIdQuery } from '../../features/clients/clientsApi-slice';
import { useSnackbar } from '../util/SnackBarContext';


function ClientsPage() {
  // Fetch clients of current user (coach) on render
  const [dataLoaded, setDataLoaded] = useState(false)

  // Import update cycle store reducer
  const { updateClientsStore } = clientsActions;

  // Declare dispatch
  const dispatch = useDispatch()

  // Access specific values from the state
  const userInfo = useSelector((state) => state.auth.user);
  ////console.log(userInfo)

  const coachUserId = userInfo.userId
  if (!coachUserId) {
    //console.log("Coach user ID is undefined therefore user is not logged in (this is only here for debugging this should not appear if protected routes work properly")
  }

  const { setSnackbarMessage } = useSnackbar()

  const { data, error, isLoading } = useGetClientsByUserIdQuery({ id: coachUserId });
  //console.log("Fetching clients via query")

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    setSnackbarMessage(error)
    return <CircularProgress />;
  }

  ////console.log(data)

  dispatch(updateClientsStore(data))

  //console.log(coachUserId)

  const clientsData = data
  //console.log(clientsData)





  return (
    <>
      <TopBar title="Training cycles" />
      <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'black', height: '100vh' }}>
        <Typography variant="h3" color="text" textAlign={'center'} padding={2}>
          Hello world
        </Typography> 
        <Grid container spacing={2} sx={{ flexGrow: 1, padding: 4 }}>
          {
            clientsData.map((client, index) => {
              return(
                <Client key={index} data={client} />
              )
            })
          }
        </Grid>
      </Box>
      </Container>
    </>
  )
}

export default ClientsPage