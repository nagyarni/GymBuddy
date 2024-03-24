import { IconButton, TableCell, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditExerciseModal from './util/tablecomponents/EditExerciseModal'
import AddExerciseModal from './util/tablecomponents/AddExerciseModal'
import EditWeightModal from './util/tablecomponents/EditWeightModal'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { cyclesActions } from '../features/cycles/cycles-slice';
import { useSnackbar } from './util/SnackBarContext';

function TableDayNew(props) {

  const dispatch = useDispatch()
  const { setSnackbarMessage } = useSnackbar()

  // Use states for modals
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0); // Initialize with a default value
  const [previousWeightData, setPreviousWeightData] = useState(0);
  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
  const [editExerciseModalOpen, setEditExerciseModalOpen] = useState(false);
  const [editWeightmodalOpen, setEditWeightModalOpen] = useState(false);
  const [editedWeight, setEditedWeight] = useState('')

  // Get user login state
  // If user is coach, there will be extra features on this page available
  // to edit cycle data
  const isCoach = useSelector((state) => state.auth.isCoach)

  // Extract day data from props
  const day = props.day
  const weekCounter = props.weekCounter
  const dayIndex = props.index

  // Click handlers for modals and buttons
  const handleAddExerciseClick = (event) => {
    setAddExerciseModalOpen(true)
  }
  const handleEditExerciseClick = ({ event, exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    setEditExerciseModalOpen(true)
  }
  const handleEditWeightClick = ({ event, exerciseIndexParam }) => {
    setExerciseIndex(exerciseIndexParam)
    console.log(exerciseIndexParam)
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


  // Generate day function
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
        <TableCell rowSpan={ isCoach ? day.length+2 : day.length+1 } >
          { "Day " + dayIndex }
          {
            <IconButton aria-label="delete" onClick={handleDeleteDayClick}>
              <DeleteIcon />
            </IconButton>
          }
        </TableCell>
      </TableRow>
      {
        generateDay()
      }
      {
        isCoach ? 
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
        : ""
      }
      
      <EditWeightModal weekIndex={weekCounter} modalOpen={editWeightmodalOpen} setModalOpen={setEditWeightModalOpen} exerciseIndex={exerciseIndex} dayIndex={dayIndex} previousWeightData={previousWeightData} setPreviousWeightData={setPreviousWeightData} editedWeight={editedWeight} setEditedWeight={setEditedWeight} />
      <AddExerciseModal modalOpen={addExerciseModalOpen} setModalOpen={setAddExerciseModalOpen} dayIndex={dayIndex} />
      <EditExerciseModal modalOpen={editExerciseModalOpen} setModalOpen={setEditExerciseModalOpen} dayIndex={dayIndex} exerciseIndex={exerciseIndex} />
    </>
  )
}

export default TableDayNew