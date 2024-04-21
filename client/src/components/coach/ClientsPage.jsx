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
import Client from './Client';

import { clientsActions } from '../../features/clients/clients-slice';
import { useGetClientsByUserIdQuery } from '../../features/clients/clientsApi-slice';
import { useSnackbar } from '../util/SnackBarContext';
import LoadingSpinner from '../util/LoadingSpinner';


function ClientsPage() {
  // Fetch clients data from store
  const clientsData = useSelector((state) => state.clients.clients)

  // Import update cycle store reducer
  const { updateClientsStore } = clientsActions;

  // Declare dispatch
  const dispatch = useDispatch()

  // Access specific values from the state
  const userInfo = useSelector((state) => state.auth.user);

  const coachUserId = userInfo.userId
  if (!coachUserId) {
    //console.log("Coach user ID is undefined therefore user is not logged in (this is only here for debugging this should not appear if protected routes work properly")
  }

  const { setSnackbarMessage } = useSnackbar()

  // Call API fetch hook to get clients info
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetClientsByUserIdQuery({ id: coachUserId })

  let content

  if (isLoading) {
    content = <LoadingSpinner />
  } 
  else if (isSuccess) {
    // Table week edit buttons can only be visible if user has a coach login
    content = 
        <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'black', height: '100vh' }}>
          <Typography variant="h3" color="text" textAlign={'center'} padding={2}>
            My Clients
          </Typography> 
          <Grid container spacing={2} sx={{ flexGrow: 1, padding: 4 }}>
            {
              clientsData?.map((client, index) => {
                return(
                  <Client key={index} data={client} />
                )
              })
            }
          </Grid>
        </Box>
        </Container>
  } else if (isError) {
    //setSnackbarMessage({ message: "Error while fetching data, please reload page!", isError: true });
    console.log(error)
    content = <LoadingSpinner />
  }

  // UseEffect for setting store data on successful fetch
  useEffect(() => {
    if (isSuccess && data) {
      // Dispatch store changes
      dispatch(updateClientsStore({ clients: data }))

    }
  }, [isSuccess])



  return (
    <>
      <TopBar title="My Clients" />
      { content }
    </>
  )
}

export default ClientsPage