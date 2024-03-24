import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../../features/cycles/cycles-slice';

function EditWeightModal(props) {

  const dispatch = useDispatch()

  // Props extraction
  const exerciseIndex = props.exerciseIndex
  const weekIndex = props.weekIndex
  const dayIndex = props.dayIndex - 1
  const modalOpen = props.modalOpen
  const setModalOpen = props.setModalOpen
  const previousWeightData = props.previousWeightData
  const setPreviousWeightData = props.setPreviousWeightData
  const editedWeight = props.editedWeight
  const setEditedWeight = props.setEditedWeight
  const weekCounter = props.weekCounter

  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEditedWeight(value);
    console.log(editedWeight)
    setIsFormFilled(value !== ''); // Set isFormFilled based on whether the input is not empty
  };

  const handleConfirm = (event) => {
    const newWeight = editedWeight; // Replace with the new weight value

    console.log(newWeight)
    dispatch(
      cyclesActions.updateWeight({
        dayIndex,
        exerciseIndex,
        newWeight,
        weekIndex
      }))
    // Close the modal
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} onClose={handleCloseModal}  maxWidth="md">
        <DialogTitle>Edit Weight</DialogTitle>
        {<DialogContentText sx={{ paddingLeft: 3 }}>
          { previousWeightData != 0 ? "Previous weight: " + previousWeightData : "" }
        </DialogContentText>}
        <DialogContent>
          <TextField
            label="Weight"
            type="number"
            fullWidth
            value={editedWeight}
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

export default EditWeightModal