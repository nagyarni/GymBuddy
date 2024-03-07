import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { cyclesActions } from '../../store/cycles-slice';

const EditExerciseModal = (props) => {
  const info = props.info;
  const exerciseIndex = props.exerciseIndex;
  const cycleData = useSelector((state) => state.cycles.cycles[info.cycleIndex]);
  const rpeCount = cycleData.weeks;
  const dispatch = useDispatch();
  const initialValues = cycleData.days[info.dayIndex][exerciseIndex];

  const [exerciseName, setExerciseName] = useState(initialValues.name);
  const [series, setSeries] = useState(initialValues.series);
  const [reps, setReps] = useState(initialValues.reps);
  const [rpes, setRPEs] = useState(initialValues.rpe || Array(rpeCount).fill(''));

  const EditExerciseModalOpen = props.editExerciseModalOpen;
  const setEditExerciseModalOpen = props.setEditExerciseModalOpen;

  const handleSave = () => {
    console.log({ exerciseName, series, reps, rpes });
    dispatch(cyclesActions.editExercise({ info, exerciseIndex, exerciseName, series, reps, rpes }));
    handleClose();
  };

  const handleClose = () => {
    setEditExerciseModalOpen(false);
    setRPEs(initialValues.rpe);
    setReps(initialValues.reps);
    setSeries(initialValues.series);
    setExerciseName(initialValues.name);
  };

  useEffect(() => {
    setRPEs(initialValues.rpe || Array(rpeCount).fill(''));
    setReps(initialValues.reps);
    setSeries(initialValues.series);
    setExerciseName(initialValues.name);
  }, [EditExerciseModalOpen]);

  return (
    <Modal open={EditExerciseModalOpen} onClose={handleClose}>
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
        <h2>Edit Exercise</h2>
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
              {rpes[index] !== undefined && (
                <Select
                  value={rpes[index]}
                  onChange={(e) => {
                    const updatedRpes = [...rpes];
                    updatedRpes[index] = e.target.value;
                    setRPEs(updatedRpes);
                  }}
                >
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="8.5">8.5</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                </Select>
              )}
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

export default EditExerciseModal;
