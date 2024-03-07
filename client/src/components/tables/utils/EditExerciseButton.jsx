import { current } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import {
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  IconButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../store/cycles-slice';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';



function EditExerciseButton(props) {

  const dispatch = useDispatch()
  const info = props.info
  const exerciseIndex = props.exerciseIndex
  const openModal = props.openModal
  const setExerciseIndex = props.setExerciseIndex


  const handleEditExerciseClick = () => {
    //dispatch(cyclesActions.deleteExercise({ info, exerciseIndex: exerciseIndex }))
    setExerciseIndex(exerciseIndex)
    openModal()
    //console.log(info)
  }

  return (
    <>
          <IconButton aria-label="edit" onClick={handleEditExerciseClick}>
            <EditIcon />
          </IconButton>
    </>
  )
}

export default EditExerciseButton