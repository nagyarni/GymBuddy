import React, { useState, useEffect } from 'react'
import dummy from '../dummy.json'
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


function WorkoutTable(props) {

  const [isLeftButtonDisabled, setLeftButtonDisabled] = useState(true)
  const [isRightButtonDisabled, setRightButtonDisabled] = useState(false)
  const [weekCounter, setWeekCounter] = useState(0)

  const totalWeeks = dummy.weeks.length

  //console.log(dummy)

  const generateTableDays = function(currentWeek) {
    //console.log(dummy.weeks[currentWeek].days)
    return (dummy.weeks[currentWeek].days).map((data, i) => {
      return (
        <TableDay key={i} day={i} exercises={data.exercises} />
      )
    })
  }

  useEffect(() => {
    console.log("Week counter:" + weekCounter + "\ntotal weeks:" + totalWeeks)
    if (weekCounter == 0) {
      setLeftButtonDisabled(true)
      setRightButtonDisabled(false)
    }
    else if (weekCounter == totalWeeks - 1) {
      setLeftButtonDisabled(false)
      setRightButtonDisabled(true)
    }
    else {
      setLeftButtonDisabled(false)
      setRightButtonDisabled(false)
    }
  }, [weekCounter])


  const handleLeftClick = function() {
    console.log("Moving left")
    setWeekCounter(weekCounter-1)
  }

  const handleRightClick = function() {
    console.log("Moving right")
    setWeekCounter(weekCounter+1)
  }


  
  return (
    <>
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'black', height: '100vh' }}>
        <Typography variant="h3" color="text" textAlign={'center'} padding={2}>
          Week {weekCounter+1}
        </Typography>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Exercise</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Series</TableCell>
                <TableCell>Repetitions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableDay exercises={dummy.weeks[0].days} /> */}
              {
                generateTableDays(weekCounter)
              }
            </TableBody>
          </Table>
        </TableContainer>

        <Grid 
          container 
          spacing={2}
          textAlign="center"
          padding={3}
          height={"5%"}

        >
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={3}>
            <Fab color="primary" aria-label="add" disabled={isLeftButtonDisabled} onClick={handleLeftClick} >
              <AddIcon  />
            </Fab>
          </Grid>
          <Grid item xs={3}>
            <Fab color="primary" aria-label="add" disabled={isRightButtonDisabled} onClick={handleRightClick} >
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  )
}

export default WorkoutTable