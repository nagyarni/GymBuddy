import { IconButton, TableCell, TableRow, Typography } from '@mui/material'
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

  const generateDay = function() {
    return (day).map((exercise, index) => {
      return (
        <>
          <TableRow key={index} >
            <TableCell>
              <Typography variant="body1" color="text.primary">{ exercise.name }</Typography>
              {
                isCoach ?
                <>
                  <IconButton aria-label="delete" onClick={handleDeleteExerciseClick}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={() => {handleEditExerciseClick({ exerciseIndexParam: index })}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="move up" onClick={() => {handleMoveExerciseUp({ exerciseIndexParam: index })}} disabled={index === 0}>
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton aria-label="move down" onClick={() => {handleMoveExerciseDown({ exerciseIndexParam: index })}} disabled={index === day.length - 1}>
                    <ArrowDownwardIcon />
                  </IconButton>
                </>
                : ""
              }
            </TableCell>
            <TableCell>
              { exercise.weight[weekCounter] }
            {
              isCoach ? 
              // Edit weight button
              <IconButton aria-label="edit" onClick={() => {handleEditWeightClick({ exerciseIndexParam: index })}}>
                <EditIcon />
              </IconButton>
              : ""
            }
            </TableCell>
            <TableCell>
              { exercise.series }
            </TableCell>
            <TableCell>
              { exercise.reps }
            </TableCell>
            <TableCell>
              { exercise.rpe[weekCounter] }
            </TableCell>
          </TableRow>
        </>
      )
    })
  }

  return (
    <>
      <TableRow>
        <TableCell rowSpan={isCoach ? day.length + 2 : day.length + 1}>
          <Typography variant="h5" color="text.primary">{"Day " + dayIndex}</Typography>
          {isCoach &&
            <IconButton aria-label="delete" onClick={handleDeleteDayClick}>
              <DeleteIcon />
            </IconButton>
          }
        </TableCell>
      </TableRow>
      <AnimatePresence>
      {generateDay()}
      </AnimatePresence>
      {isCoach &&
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
    </>
  )
}

export default TableDayNew
