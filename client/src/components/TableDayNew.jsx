import { IconButton, TableCell, TableRow, Typography, FormControlLabel, Radio, Chip, Grid, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditExerciseModal from './util/tablecomponents/EditExerciseModal'
import AddExerciseModal from './util/tablecomponents/AddExerciseModal'
import EditWeightModal from './util/tablecomponents/EditWeightModal'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { cyclesActions } from '../features/cycles/cycles-slice';
import { useSnackbar } from './util/SnackBarContext';
import { AnimatePresence, motion } from 'framer-motion';
import EditExtraDataModal from './util/tablecomponents/EditExtraDataModal';
import EditCoachDataModal from './util/tablecomponents/EditCoachDataModal';

function TableDayNew(props) {
  const dispatch = useDispatch()
  const { setSnackbarMessage } = useSnackbar()

  const [isFormFilled, setIsFormFilled] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [previousWeightData, setPreviousWeightData] = useState(0);
  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
  const [editExerciseModalOpen, setEditExerciseModalOpen] = useState(false);
  const [editWeightmodalOpen, setEditWeightModalOpen] = useState(false);
  const [editedWeight, setEditedWeight] = useState('')
  const [editExtraDataModalOpen, setEditExtraDataModalOpen] = useState(0)
  const [oldExtraInfo, setOldExtraInfo] = useState(null)
  const [editCoachDataModalOpen, setEditCoachDataModalOpen] = useState(0)
  const [oldExerciseInfo, setOldExerciseInfo] = useState(null)

  const isCoach = useSelector((state) => state.auth.isCoach)
  const active = props.active
  const day = props.day
  const weekCounter = props.weekCounter
  const dayIndex = props.index

  const handleAddExerciseClick = () => {
    setAddExerciseModalOpen(true)
  }

  const handleEditExerciseClick = ({ event, exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    setEditExerciseModalOpen(true)
  }

  const handleEditWeightClick = ({ event, exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    setEditedWeight('')
    setPreviousWeightData(day[exerciseIndexParam].weight[weekCounter])
    setEditWeightModalOpen(true)
  }

  const handleDeleteExerciseClick = () => {
    setSnackbarMessage({ message: "Exercise deleted", isError: false });
    dispatch(cyclesActions.deleteExercise({ dayIndex: dayIndex - 1, exerciseIndex: exerciseIndex }))
  }

  const handleDeleteDayClick = () => {
    setSnackbarMessage({ message: "Day deleted", isError: false });
    dispatch(cyclesActions.deleteDay({ dayIndex: dayIndex - 1 }))
  }

  const handleMoveExerciseUp = ({ exerciseIndexParam }) => {
    if (exerciseIndexParam > 0) {
      dispatch(cyclesActions.moveExercise({ dayIndex: dayIndex - 1, fromIndex: exerciseIndexParam, toIndex: exerciseIndexParam - 1 }))
    }
  }

  const handleMoveExerciseDown = ({ exerciseIndexParam }) => {
    if (exerciseIndexParam < day.length - 1) {
      dispatch(cyclesActions.moveExercise({ dayIndex: dayIndex - 1, fromIndex: exerciseIndexParam, toIndex: exerciseIndexParam + 1 }))
    }
  }

  // Handlers for extra info feature
  const handleEditSeriesClick = ({ exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    setOldExtraInfo(day[exerciseIndexParam].extraInfo[weekCounter])
    setEditExtraDataModalOpen(1)
  }
  const handleDeleteSeriesClick = ({ exerciseIndexParam }) => {
    const newExtraInfo = {
      ...day[exerciseIndexParam].extraInfo[weekCounter],
      series: null
    }
    dispatch(cyclesActions.updateExtraInfo({ dayIndex: dayIndex - 1, exerciseIndex: exerciseIndexParam, weekIndex: weekCounter, newExtraInfo: newExtraInfo }))
    setSnackbarMessage({ message: "Series extra information deleted!", isError: false });
  }

  const handleEditRepsClick = ({ exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    setOldExtraInfo(day[exerciseIndexParam].extraInfo[weekCounter])
    setEditExtraDataModalOpen(2)
  }
  const handleDeleteRepsClick = ({ exerciseIndexParam }) => {
    const newExtraInfo = {
      ...day[exerciseIndexParam].extraInfo[weekCounter],
      reps: null
    }
    dispatch(cyclesActions.updateExtraInfo({ dayIndex: dayIndex - 1, exerciseIndex: exerciseIndexParam, weekIndex: weekCounter, newExtraInfo: newExtraInfo }))
    setSnackbarMessage({ message: "Reps extra information deleted!", isError: false });
  }

  const handleEditRpeClick = ({ exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    setOldExtraInfo(day[exerciseIndexParam].extraInfo[weekCounter])
    setEditExtraDataModalOpen(3)
  }
  const handleDeleteRpeClick = ({ exerciseIndexParam }) => {
    const newExtraInfo = {
      ...day[exerciseIndexParam].extraInfo[weekCounter],
      rpe: null
    }
    dispatch(cyclesActions.updateExtraInfo({ dayIndex: dayIndex - 1, exerciseIndex: exerciseIndexParam, weekIndex: weekCounter, newExtraInfo: newExtraInfo }))
    setSnackbarMessage({ message: "Rpe extra information deleted!", isError: false });
  }

  // Handle coach info edit functions
  const handleEditSeriesClickCoach = ({ exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    setOldExerciseInfo(day[exerciseIndexParam])
    setEditCoachDataModalOpen(1)
  }
  const handleEditRepsClickCoach = ({ exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    setOldExerciseInfo(day[exerciseIndexParam])
    setEditCoachDataModalOpen(2)
  }
  const handleEditRpeClickCoach = ({ exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    setOldExerciseInfo(day[exerciseIndexParam])
    setEditCoachDataModalOpen(3)
  }

  const generateDay = function() {
    return (day).map((exercise, index) => {
      const seriesExtra = exercise.extraInfo[weekCounter].series !== null;
      const repsExtra = exercise.extraInfo[weekCounter].reps !== null;
      const rpeExtra = exercise.extraInfo[weekCounter].rpe !== null;
  
      return (
        <TableRow key={index}>
          <TableCell style={{ borderRight: '1px solid #e0e0e0' }}>
            <Typography variant="h5" color="text.primary">{ exercise.name }</Typography>
            {isCoach && active &&
              <>
                <IconButton aria-label="delete" onClick={handleDeleteExerciseClick} color='error'>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" color='info' onClick={() => {handleEditExerciseClick({ exerciseIndexParam: index })}}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="move up" onClick={() => {handleMoveExerciseUp({ exerciseIndexParam: index })}} disabled={index === 0}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="move down" onClick={() => {handleMoveExerciseDown({ exerciseIndexParam: index })}} disabled={index === day.length - 1}>
                  <ArrowDownwardIcon />
                </IconButton>
              </>
            }
          </TableCell>
          <TableCell style={{ borderRight: '1px solid #e0e0e0' }}>
            <Grid container spacing={0} alignItems={'center'}>
              <Grid item xs={6}>
                <Typography variant="h6">{ exercise.weight[weekCounter] }</Typography>
              </Grid>
              {active && 
                <Grid item xs={6}>
                  <IconButton aria-label="edit" color='info' onClick={() => {handleEditWeightClick({ exerciseIndexParam: index })}}>
                    <EditIcon />
                  </IconButton>
                </Grid>
              }
            </Grid>
          </TableCell>
          <TableCell style={{ borderRight: '1px solid #e0e0e0' }}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography variant="h6" color={ seriesExtra ? '#c9335c' : 'text.primary' }>{ exercise.series[weekCounter] }</Typography>
              </Grid>
              <Grid item xs={6} alignContent={'center'}>
                { seriesExtra &&
                  <Typography variant="h6">{ exercise.extraInfo[weekCounter].series }</Typography>
                }
              </Grid>
              {active && !isCoach &&
                <Grid item xs={6}>
                  <Tooltip title="Edit completed series value for current week">
                    <IconButton aria-label="edit" color='info' onClick={() => {handleEditSeriesClick({ exerciseIndexParam: index })}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
              {
                active && isCoach &&
                <Grid item xs={6}>
                  <Tooltip title="Edit series value for current week">
                    <IconButton aria-label="edit" color='info' onClick={() => {handleEditSeriesClickCoach({ exerciseIndexParam: index })}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
              {active && seriesExtra && !isCoach &&
                <Grid item xs={6}>
                  <IconButton aria-label="delete" color='warning' onClick={() => {handleDeleteSeriesClick({ exerciseIndexParam: index })}}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              }
            </Grid>
          </TableCell>
          <TableCell style={{ borderRight: '1px solid #e0e0e0' }}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography variant="h6" color={ repsExtra ? '#c9335c' : 'text.primary' }>{ exercise.reps[weekCounter] }</Typography>
              </Grid>
              <Grid item xs={6}>
                { repsExtra &&
                  <Typography variant="h6">{ exercise.extraInfo[weekCounter].reps }</Typography>
                }
              </Grid>
              {
                active && isCoach &&
                <Grid item xs={6}>
                  <Tooltip title="Edit reps value for current week">
                    <IconButton aria-label="edit" color='info' onClick={() => {handleEditRepsClickCoach({ exerciseIndexParam: index })}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
              {active && !isCoach &&
                <Grid item xs={6}>
                  <Tooltip title="Edit completed reps value for current week">
                    <IconButton aria-label="edit" color='info' onClick={() => {handleEditRepsClick({ exerciseIndexParam: index })}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
              {active && repsExtra && !isCoach &&
                <Grid item xs={6}>
                  <IconButton aria-label="delete" color='warning' onClick={() => {handleDeleteRepsClick({ exerciseIndexParam: index })}}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              }
            </Grid>
          </TableCell>
          <TableCell>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography variant="h6" color={ rpeExtra ? '#c9335c' : 'text.primary' }>{ exercise.rpe[weekCounter] }</Typography>
              </Grid>
              <Grid item xs={6}>
                { rpeExtra &&
                  <Typography variant="h6">{ exercise.extraInfo[weekCounter].rpe }</Typography>
                }
              </Grid>
              {active && !isCoach &&
                <Grid item xs={6}>
                  <Tooltip title="Edit completed rpe value for current week">
                    <IconButton aria-label="edit" color='info' onClick={() => {handleEditRpeClick({ exerciseIndexParam: index })}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
              {
                active && isCoach &&
                <Grid item xs={6}>
                  <Tooltip title="Edit rpe value for current week">
                    <IconButton aria-label="edit" color='info' onClick={() => {handleEditRpeClickCoach({ exerciseIndexParam: index })}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
              {active && rpeExtra && !isCoach &&
                <Grid item xs={6}>
                  <IconButton aria-label="delete" color='warning' onClick={() => {handleDeleteRpeClick({ exerciseIndexParam: index })}}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              }
            </Grid>
          </TableCell>
        </TableRow>
      );
    });
  }

  return (
    <>
      <TableRow>
        <TableCell rowSpan={isCoach && active ? day.length + 2 : day.length + 1}>
          <Typography variant="h5" color="text.primary">{"Day " + dayIndex}
          {isCoach && active &&
            <IconButton aria-label="delete" onClick={handleDeleteDayClick} color='error'>
              <DeleteIcon />
            </IconButton>
          }
          </Typography>
        </TableCell>
      </TableRow>
      {generateDay()}
      {isCoach && active &&
        <TableRow>
          <TableCell>
            <IconButton aria-label="add" onClick={handleAddExerciseClick} >
              <AddIcon />
            </IconButton>
          </TableCell>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
      }
      
      <EditWeightModal weekIndex={weekCounter} modalOpen={editWeightmodalOpen} setModalOpen={setEditWeightModalOpen} exerciseIndex={exerciseIndex} dayIndex={dayIndex} previousWeightData={previousWeightData} setPreviousWeightData={setPreviousWeightData} editedWeight={editedWeight} setEditedWeight={setEditedWeight} />
      <AddExerciseModal modalOpen={addExerciseModalOpen} setModalOpen={setAddExerciseModalOpen} dayIndex={dayIndex} />
      <EditExerciseModal modalOpen={editExerciseModalOpen} setModalOpen={setEditExerciseModalOpen} dayIndex={dayIndex} exerciseIndex={exerciseIndex} />
      <EditExtraDataModal modalOpen={editExtraDataModalOpen} setModalOpen={setEditExtraDataModalOpen} dayIndex={dayIndex} exerciseIndex={exerciseIndex} weekIndex={weekCounter} oldExtraInfo={oldExtraInfo} />
      <EditCoachDataModal modalOpen={editCoachDataModalOpen} setModalOpen={setEditCoachDataModalOpen} dayIndex={dayIndex} exerciseIndex={exerciseIndex} weekIndex={weekCounter} oldExerciseInfo={oldExerciseInfo}/>
    </>
  )
}

export default TableDayNew
