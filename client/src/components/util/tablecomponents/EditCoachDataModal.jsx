import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../../features/cycles/cycles-slice';

function EditCoachDataModal(props) {
  const dispatch = useDispatch();

  // Props extraction
  const exerciseIndex = props.exerciseIndex;
  const weekIndex = props.weekIndex;
  const dayIndex = props.dayIndex - 1;
  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const oldExerciseInfo = props.oldExerciseInfo;
  const [editedValue, setEditedValue] = useState('');

  const [isFormFilled, setIsFormFilled] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEditedValue(value);
    setIsFormFilled(value !== ''); // Set isFormFilled based on whether the input is not empty
    setError(!(value === '' || parseFloat(value) >= 0) || value > 100); // Check if the value is not empty and not a positive number or zero
  };

  const handleConfirm = () => {
    let series = [...oldExerciseInfo.series];
    let reps = [...oldExerciseInfo.reps];
    let rpe = [...oldExerciseInfo.rpe];

    if (modalOpen === 1) {
      series[weekIndex] = editedValue;
    } else if (modalOpen === 2) {
      reps[weekIndex] = editedValue;
    } else if (modalOpen === 3) {
      rpe[weekIndex] = editedValue;
    }
    
    dispatch(
      cyclesActions.editExercise({
        dayIndex,
        exerciseIndex,
        exerciseName: oldExerciseInfo.name,
        series: series,
        reps: reps,
        rpes: rpe,
      })
    );

    // Close the modal
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setEditedValue('');
    setError(false);
    setModalOpen(0);
  };

  return (
    <Dialog open={modalOpen !== 0} onClose={handleCloseModal} maxWidth="md">
      <DialogTitle>Edit Data</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ paddingLeft: 3 }}></DialogContentText>
        {modalOpen === 3 ? (
          <FormControl fullWidth>
            <InputLabel>RPE</InputLabel>
            <Select
              value={editedValue || '5'} // Set '5' as the default selection
              onChange={handleInputChange}
              error={error}
            >
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="8.5">8.5</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10">10</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <TextField
            label="Value"
            type="number"
            fullWidth
            value={editedValue}
            onChange={handleInputChange}
            error={error}
            helperText={error ? "Please enter a positive number less than 100" : ""}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleConfirm} disabled={!isFormFilled || error}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCoachDataModal;
