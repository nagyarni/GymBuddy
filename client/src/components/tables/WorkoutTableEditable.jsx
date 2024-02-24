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
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import { setUnsavedChanges } from '../store/unsavedChanges-slice';
import { cyclesActions } from '../store/cycles-slice';
import AddTableDayButton from './utils/AddTableDayButton'


function WorkoutTable(props) {

  const [isLeftButtonDisabled, setLeftButtonDisabled] = useState(true)
  const [isRightButtonDisabled, setRightButtonDisabled] = useState(false)
  const [weekCounter, setWeekCounter] = useState(0)

  const { id } = useParams()

  //setting params of the component
  const workoutData = useSelector((state) => state.cycles.cycles[id-1])
  //console.log(workoutData)
  const unsavedChanges = useSelector((state) => state.unsavedChanges);
  const dispatch = useDispatch();

  const numOfDays = useSelector((state) => state.cycles.cycles[id-1].days.length)
  //console.log(numOfDays)
  
  const totalWeeks = workoutData.weeks

  const handleSaveClick = () => {
    // Your custom save function logic here
    console.log('Save button clicked');
    dispatch(setUnsavedChanges(false))
  };


  useEffect(() => {
    //console.log("Week counter:" + weekCounter + "\ntotal weeks:" + totalWeeks)
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
    <TopBar title={workoutData.name} />
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
                <TableCell>RPE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                workoutData.days.map((day, index) => {
                  return (
                    <TableDay key={index} dayNumber={index+1} day={day} week={weekCounter} cycleIndex={id} />
                  )
                })
              }
              {
                numOfDays < 7 ? 
                  <AddTableDayButton cycleIndex={id-1} />
                : ""
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
              <ArrowBackIosNewIcon  />
            </Fab>
          </Grid>
          <Grid item xs={3}>
            <Fab color="primary" aria-label="add" disabled={isRightButtonDisabled} onClick={handleRightClick} >
              <ArrowForwardIosIcon />
            </Fab>
          </Grid>
          <Grid item xs={3}  justifyContent="flex-end" textAlign={'end'}>
            <Fab
              color="primary"
              disabled={!unsavedChanges}
              style={{
                width: '80px',
                height: '80px',
              }}
              onClick={handleSaveClick}
            >
              <SaveIcon />
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  )
}

export default WorkoutTable