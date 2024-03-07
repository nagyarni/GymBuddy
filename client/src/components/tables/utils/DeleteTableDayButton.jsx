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
import DeleteIcon from '@mui/icons-material/Delete';


function DeleteTableDayButton(props) {

  const dispatch = useDispatch()
  const cycleIndex = props.cycleIndex
  const dayIndex = props.dayIndex

  //console.log(cycleIndex)

  const handleDeleteDayClick = () => {
    dispatch(cyclesActions.deleteDay({cycleIndex: cycleIndex, dayIndex}))
  }

  return (
    <>
      <IconButton aria-label="delete" onClick={handleDeleteDayClick}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}

export default DeleteTableDayButton