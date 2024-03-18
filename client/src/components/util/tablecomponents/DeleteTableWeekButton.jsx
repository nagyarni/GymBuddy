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
import { cyclesActions } from '../../../features/cycles/cycles-slice';
import DeleteIcon from '@mui/icons-material/Delete';


function DeleteTableWeekButton(props) {

  const dispatch = useDispatch()
  const cycleIndex = props.cycleIndex
  const weekIndex = props.weekIndex
  const setWeekCounter = props.setWeekCounter
  const weekCounter = props.weekCounter
  const disabled = props.disabled
  const totalWeeks = props.totalWeeks


  const handleDeleteWeekClick = () => {
    dispatch(cyclesActions.deleteWeek({cycleIndex: cycleIndex, weekIndex: weekIndex}))
    if (weekCounter === totalWeeks - 1) {
      setWeekCounter(weekCounter - 1)
    }
    //console.log("total weeks")
    //console.log(totalWeeks)
  }

  return (
    <>
      {
        !disabled ?
        <IconButton aria-label="delete" onClick={handleDeleteWeekClick}>
          <DeleteIcon />
        </IconButton>
        : ""
      }
    </>
  )
}

export default DeleteTableWeekButton