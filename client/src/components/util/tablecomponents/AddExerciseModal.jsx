import React, { useState } from 'react';
import { Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { cyclesActions } from '../../../features/cycles/cycles-slice';
import { useParams } from 'react-router-dom';
import { useSnackbar } from '../SnackBarContext';

const AddExerciseModal = (props) => {
  const modalOpen = props.modalOpen
  const setModalOpen = props.setModalOpen
  const dayIndex = props.dayIndex - 1

  const cycleData = useSelector((state) => state.cycles.cycleData)
  const rpeCount = cycleData.weeks
  const dispatch = useDispatch()


  const [exerciseName, setExerciseName] = useState('');
  const [series, setSeries] = useState(0);
  const [reps, setReps] = useState(0);
  const [rpes, setRPEs] = useState(Array(rpeCount).fill(''));

  const { setSnackbarMessage } = useSnackbar()

  const handleSave = () => {
    // Handle saving the form data or perform any desired action
    dispatch(cyclesActions.addNewExercise({ dayIndex, exerciseName, series, reps, rpes }))
    setSnackbarMessage({ message: "Exercise added", isError: false });
    handleClose();
  };

  const handleClose = () => {
    setModalOpen(false)
    setRPEs(Array(rpeCount).fill(''))
    setReps(0)
    setSeries(0)
    setExerciseName('')
  }

  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#1e1e1e',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h2>Add Exercise</h2>
        <form>
          <TextField
            label="Exercise Name"
            fullWidth
            margin="normal"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <TextField
            type="number"
            label="Series"
            fullWidth
            margin="normal"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          />
          <TextField
            type="number"
            label="Reps"
            fullWidth
            margin="normal"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          {Array.from({ length: rpeCount }, (_, index) => (
            <FormControl key={index} fullWidth margin="normal">
              <InputLabel>RPE {index + 1}</InputLabel>
              <Select
                value={rpes[index]}
                onChange={(e) => {
                  const updatedRpes = [...rpes];
                  updatedRpes[index] = e.target.value;
                  setRPEs(updatedRpes);
                }}
              >
                {/* Add your RPE options here */}
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="8.5">8.5</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddExerciseModal;