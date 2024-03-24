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
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from '../SnackBarContext';



function AddTableDayButton(props) {

  const dispatch = useDispatch()
  const cycleIndex = props.cycleIndex

  const { setSnackbarMessage } = useSnackbar()

  const handleAddDayClick = () => {
    setSnackbarMessage({ message: "Day added", isError: false });
    dispatch(cyclesActions.addNewDay({cycleIndex: cycleIndex}))
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="add" onClick={handleAddDayClick}>
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

export default AddTableDayButton