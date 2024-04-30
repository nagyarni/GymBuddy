import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../../features/cycles/cycles-slice';


function EditCoachDataModal(props) {
  const dispatch = useDispatch()

  // Props extraction
  const exerciseIndex = props.exerciseIndex
  const weekIndex = props.weekIndex
  const dayIndex = props.dayIndex - 1
  const modalOpen = props.modalOpen
  const setModalOpen = props.setModalOpen
  const oldExerciseInfo = props.oldExerciseInfo
  const [editedValue, setEditedValue] = useState(0)

  const [isFormFilled, setIsFormFilled] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEditedValue(value);
    console.log(editedValue)
    setIsFormFilled(value !== ''); // Set isFormFilled based on whether the input is not empty
    setError(!(value === '' || parseFloat(value) >= 0)); // Check if the value is not empty and not a positive number or zero
  };

  const handleConfirm = (event) => {

    let series = [...oldExerciseInfo.series]
    let reps = [...oldExerciseInfo.reps]
    let rpe = [...oldExerciseInfo.rpe]

    console.log(weekIndex)
    if (modalOpen === 1) {
      series[weekIndex] = editedValue
    } else if (modalOpen === 2) {
      reps[weekIndex] = editedValue
    } else if (modalOpen === 3) {
      rpe[weekIndex] = editedValue
    }
    //dayIndex, exerciseIndex, exerciseName, series, reps, rpes
    dispatch(
      cyclesActions.editExercise({
        dayIndex,
        exerciseIndex,
        exerciseName: oldExerciseInfo.name,
        series: series,
        reps: reps,
        rpes: rpe
      }))
    // Close the modal
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setEditedValue(0)
    setError(false)
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
            error={error}
            helperText={error ? "Please enter a positive number or zero" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={!isFormFilled || error}>Confirm</Button>
        </DialogActions>
      </Dialog>
  )
}

export default EditCoachDataModal