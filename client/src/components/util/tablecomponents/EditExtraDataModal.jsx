import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../../features/cycles/cycles-slice';

function EditExtraDataModal(props) {
  const dispatch = useDispatch()

  // Props extraction
  const exerciseIndex = props.exerciseIndex
  const weekIndex = props.weekIndex
  const dayIndex = props.dayIndex - 1
  const modalOpen = props.modalOpen
  const setModalOpen = props.setModalOpen
  const oldExtraInfo = props.oldExtraInfo
  const [editedValue, setEditedValue] = useState("")

  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEditedValue(value);
    console.log(editedValue)
    setIsFormFilled(value !== ''); // Set isFormFilled based on whether the input is not empty
  };

  const handleConfirm = (event) => {


    const extraInfo = {
      ...oldExtraInfo
    }
    if (modalOpen === 1) {
      extraInfo.series = editedValue
    } else if (modalOpen === 2) {
      extraInfo.reps = editedValue
    } else if (modalOpen === 3) {
      extraInfo.rpe = editedValue
    }
    console.log(extraInfo)
    dispatch(
      cyclesActions.updateExtraInfo({
        dayIndex,
        exerciseIndex,
        weekIndex,
        newExtraInfo: extraInfo
      }))
    // Close the modal
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setEditedValue(0)
    setModalOpen(0);
  };

  return (
    <Dialog open={modalOpen !== 0} onClose={handleCloseModal}  maxWidth="md">
        <DialogTitle>Edit Data</DialogTitle>
        {<DialogContentText sx={{ paddingLeft: 3 }}>
        </DialogContentText>}
        <DialogContent>
          <TextField
            label="Value"
            type="number"
            fullWidth
            value={editedValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={!isFormFilled}>Confirm</Button>
        </DialogActions>
      </Dialog>
  )
}

export default EditExtraDataModal