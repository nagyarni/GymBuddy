import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from './util/SnackBarContext'
import { useGetCycleDataByCycleIdQuery } from '../features/cycles/cyclesApi-slice'
import LoadingSpinner from './util/LoadingSpinner'
import TopBar from './util/TopBar'
import { cyclesActions } from '../features/cycles/cycles-slice'
import { Box, Container, Fab, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteTableWeekButton from './util/tablecomponents/DeleteTableWeekButton'
import TableDayNew from './TableDayNew'
import AddTableDayButton from './util/tablecomponents/AddTableDayButton'
import SaveChangesFab from './util/tablecomponents/SaveChangesFab'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddDeleteWeekConfirmationDialog from './util/tablecomponents/AddDeleteWeekConfirmationDialog'
import DeleteIcon from '@mui/icons-material/Delete';

function WorkoutTableNew() {

  const dispatch = useDispatch()

  // topBarTitle hook
  const [topBarTitle, setTopBarTitle] = useState("Workout Table")


  // Get user login state
  // If user is coach, there will be extra features on this page available
  // to edit cycle data
  const isCoach = useSelector((state) => state.auth.isCoach)

  // Select cycleData from store
  const cycleData = useSelector((state) => state.cycles.cycleData)

  // Get userId and cycleId from url
  const { clientid, cycleid } = useParams()

  // Snackbar message hook
  const { setSnackbarMessage } = useSnackbar()

  // Pagination utility
  const [isLeftButtonDisabled, setLeftButtonDisabled] = useState(true)
  const [isRightButtonDisabled, setRightButtonDisabled] = useState(false)
  const [weekCounter, setWeekCounter] = useState(0)
  const totalWeeks = cycleData?.weeks
  const numOfDays = cycleData?.days.length
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [confirmationDialogActionType, setConfirmationDialogActionType] = useState(0)

  useEffect(() => {
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
  }, [weekCounter, totalWeeks])


  // Click handlers
  const handleLeftClick = function() {
    //console.log("Moving left")
    setWeekCounter(weekCounter - 1)
  }

  const handleRightClick = function() {
    //console.log("Moving right")
    setWeekCounter(weekCounter + 1)
  }

  const handleAddWeekClick = function() {
    //console.log("Adding new week!")
    // dispatch(cyclesActions.addNewWeek())
    // setWeekCounter(weekCounter + 1)
    setConfirmationDialogActionType(1)
    setOpenConfirmationDialog(true)
  }

  const handleDeleteWeekClick = () => {
    setConfirmationDialogActionType(-1)
    setOpenConfirmationDialog(true)
  }

  // Call API fetch hook to get cycle info
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCycleDataByCycleIdQuery({ id: clientid, cycleid: cycleid })

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
            Week {weekCounter + 1}
          </Typography>
          {
            isCoach && totalWeeks !== 1 ?
            <IconButton aria-label="delete" onClick={handleDeleteWeekClick}>
              <DeleteIcon />
            </IconButton>
            : ""
          }
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
                  cycleData?.days.map((day, index) => {
                    return (
                      <TableDayNew index={index + 1} key={index} day={day} weekCounter={weekCounter} />
                    )
                  })
                }
                {
                  numOfDays < 7 && isCoach ? 
                     <AddTableDayButton />
                  : ""
                }
                
              </TableBody>
            </Table>
          </TableContainer>
          
          { /* Fab Buttons */ }
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
                isRightButtonDisabled && isCoach ?
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
              <SaveChangesFab userid={clientid} cycleid={cycleid} />
            </Grid>
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
    if (isSuccess && data.cycle) {

      // Set topbar title
      setTopBarTitle(data.userName + "'s " + data.cycle.name)

      // Dispatch store changes
      dispatch(cyclesActions.updateCycleDataStore({ cycle: data.cycle }))

      
    }
  }, [isSuccess])

  
  return (
    <>
      <TopBar title={topBarTitle} />
      { content }
      <AddDeleteWeekConfirmationDialog totalWeeks={totalWeeks} weekIndex={weekCounter} openDialog={openConfirmationDialog} setOpenDialog={setOpenConfirmationDialog} weekCounter={weekCounter} setWeekCounter={setWeekCounter} actionType={confirmationDialogActionType} />
    </>
  )
}

export default WorkoutTableNew