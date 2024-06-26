import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, MenuItem, Fab, Typography, CircularProgress  } from '@mui/material';
import TableDay from '../components/util/tablecomponents/TableDay';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TopBar from '../components/util/TopBar';
import { useSelector } from 'react-redux';
import Cycle from './Cycle';


import { useSnackbar } from '../components/util/SnackBarContext';
import { useGetCyclesByUserIdQuery } from '../features/cycles/cyclesApi-slice';


function CyclesPage(props) {

  const cyclesData = useSelector((state) => state.cycles)
  //console.log(cyclesData)

  //const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  
  //const { clientUserId } = useSelector((state) => state.auth.user.userId)

  return (
    <>
      <>
        <TopBar title="Training cycles" />
        <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'black', height: '100vh' }}>
          <Typography variant="h3" color="text" textAlign={'center'} padding={2}>
            Hello world
          </Typography> 
          <Grid container spacing={2} sx={{ flexGrow: 1, padding: 4 }}>
            {
              cyclesData.cycles.map((cycle, index) => {
                return(
                  <Cycle key={index} data={cycle} />
                )
              })
            }
          </Grid>
        </Box>
        </Container>
      </>
    </>
  )
}

export default CyclesPage