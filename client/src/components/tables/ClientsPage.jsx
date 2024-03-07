import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, MenuItem, Fab, Typography  } from '@mui/material';
import TableDay from './tablecomponents/TableDay';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TopBar from '../layout/TopBar';
import { useSelector } from 'react-redux';
import Cycle from './tablecomponents/Cycle';
import Client from './tablecomponents/Client';
import NotLoggedInPage from './utils/NotLoggedInPage';


function ClientsPage() {

  const clientsData = useSelector((state) => state.clients)
  console.log(clientsData)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const isCoach = useSelector((state) => state.auth.isCoach)


  return (
    <>
    {
      isLoggedIn && isCoach ?
        <>
        <TopBar title="Training cycles" />
        <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'black', height: '100vh' }}>
          <Typography variant="h3" color="text" textAlign={'center'} padding={2}>
            Hello world
          </Typography> 
          <Grid container spacing={2} sx={{ flexGrow: 1, padding: 4 }}>
            {
              clientsData.clients.map((client, index) => {
                return(
                  <Client key={index} data={client} />
                )
              })
            }
          </Grid>
        </Box>
        </Container>
      </>
      :
      <NotLoggedInPage />
    }
      
    </>
  )
}

export default ClientsPage