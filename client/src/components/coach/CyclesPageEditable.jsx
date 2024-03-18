import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, MenuItem, Fab, Typography  } from '@mui/material';
import TableDay from '../util/tablecomponents/TableDay';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TopBar from '../util/TopBar';
import { useSelector } from 'react-redux';
import Cycle from '../client/Cycle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../features/cycles/cycles-slice';
import NotLoggedInPage from '../util/tablecomponents/NotLoggedInPage';

function CyclesPageEditable(props) {

  const userid = props.userid

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const isCoach = useSelector((state) => state.auth.isCoach)

  const dispatch = useDispatch()

  const cyclesData = useSelector((state) => state.cycles)
  //console.log(cyclesData)

  const handleAddCycleClick = (event) => {
    //console.log("Add clicked")
    dispatch(cyclesActions.addNewCycle())
  }


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
              cyclesData.cycles.map((cycle, index) => {
                return(
                  <Cycle key={index} userid={userid} data={cycle} removable={true} />
                )
              })
            }
            {/* Add new cycle button area */}
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={handleAddCycleClick}>
                  <CardContent>
                    <AddIcon />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
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

export default CyclesPageEditable