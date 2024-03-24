import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../../features/cycles/cycles-slice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useSnackbar } from '../SnackBarContext';

const AddWeekConfirmationDialog = ({ open, handleClose, handleConfirm, actionType }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { actionType > 0 ?
              "Are you sure you want to add a new week to the cycle?"
            : 
              "Are you sure you want to remove a week from the cycle?"
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function AddDeleteWeekConfirmationDialog(props) {
  const dispatch = useDispatch();
  const openDialog = props.openDialog
  const setOpenDialog = props.setOpenDialog
  const weekCounter = props.weekCounter
  const setWeekCounter = props.setWeekCounter
  const actionType = props.actionType
  const weekIndex = props.weekIndex
  const totalWeeks = props.totalWeeks

  const { setSnackbarMessage } = useSnackbar()

  const handleConfirm = () => {
    if (actionType > 0) {
      dispatch(cyclesActions.addNewWeek())
      setWeekCounter(weekCounter + 1)
    }
    else {
      dispatch(cyclesActions.deleteWeek({ weekIndex: weekIndex}))
      setSnackbarMessage({ message: "Week deleted", isError: false });
      if (weekCounter === totalWeeks - 1) {
        setWeekCounter(weekCounter - 1)
      }
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <AddWeekConfirmationDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirm}
        actionType={actionType}
      />
    </div>
  );
}

export default AddDeleteWeekConfirmationDialog