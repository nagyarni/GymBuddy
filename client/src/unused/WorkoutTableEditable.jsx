// WorkoutTableEditable.jsx
import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, MenuItem, Fab, Typography  } from '@mui/material';
import TableDay from '../components/util/tablecomponents/TableDay';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TopBar from '../components/util/TopBar';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import { setUnsavedChanges } from './unsavedChanges-slice';
import { cyclesActions } from '../features/cycles/cycles-slice';
import AddTableDayButton from '../components/util/tablecomponents/AddTableDayButton'
import DeleteTableWeekButton from '../components/util/tablecomponents/DeleteTableWeekButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import SaveChangesFab from '../components/util/tablecomponents/SaveChangesFab';


function WorkoutTableEditable(props) {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const isCoach = useSelector((state) => state.auth.isCoach)

  const userid = props.userid

  const [isLeftButtonDisabled, setLeftButtonDisabled] = useState(true)
  const [isRightButtonDisabled, setRightButtonDisabled] = useState(false)
  const [weekCounter, setWeekCounter] = useState(0)

  const dispatch = useDispatch();
  const { id } = useParams()
  // For the sake of naming the variable correctly :D
  const urlId = id
  

  //setting params of the component
  const cycleData = useSelector((state) => state.cycles.cycles)
  const workoutData = cycleData.find(workout => workout._id === urlId);
  //console.log(workoutData)
  // CycleIndex will need to be increased by 1 because old URL ID format was indexed from 1
  const cycleIndex = cycleData.findIndex(workout => workout._id === urlId) + 1
  const unsavedChanges = useSelector((state) => state.unsavedChanges);

  const numOfDays = workoutData.days.length
  ////console.log(numOfDays)

  const totalWeeks = workoutData.weeks
  
  const handleSaveClick = () => {
    // Your custom save function logic here
    //console.log('Save button clicked');
    dispatch(setUnsavedChanges(false))
  };


  useEffect(() => {
    ////console.log("Week counter:" + weekCounter + "\ntotal weeks:" + totalWeeks)
    if (totalWeeks - 1 === 0 && weekCounter === 0) {
      setLeftButtonDisabled(true)
      setRightButtonDisabled(true)
    }
    else if (weekCounter == 0) {
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

    ////console.log("Week counter")
    ////console.log(weekCounter)
    ////console.log("Total weeks")
    ////console.log(totalWeeks)
  }, [weekCounter, totalWeeks])


  const handleLeftClick = function() {
    //console.log("Moving left")
    setWeekCounter(weekCounter-1)
  }

  const handleRightClick = function() {
    //console.log("Moving right")
    setWeekCounter(weekCounter+1)
  }

  const handleAddWeekClick = function() {
    //console.log("Adding new week!")
    dispatch(cyclesActions.addNewWeek({ cycleIndex: id-1 }))
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
          <DeleteTableWeekButton disabled={totalWeeks === 1} cycleIndex={id-1} weekIndex={weekCounter} weekCounter={weekCounter} setWeekCounter={setWeekCounter} totalWeeks={totalWeeks} />
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
                      <TableDay key={index} weekCount={totalWeeks} dayNumber={index+1} day={day} week={weekCounter} cycleIndex={cycleIndex} removable={true} />
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
              {
                isRightButtonDisabled ?
                  <Fab color='success' aria-label='add' onClick={handleAddWeekClick}>
                    <AddCircleOutlineIcon />
                  </Fab>
                :
                  <Fab color="primary" aria-label="add" disabled={isRightButtonDisabled} onClick={handleRightClick} >
                    <ArrowForwardIosIcon />
                  </Fab>
              }
              
            </Grid>
            <Grid item xs={3}  justifyContent="flex-end" textAlign={'end'}>
              <SaveChangesFab userid={userid} cycleid={urlId} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default WorkoutTableEditable