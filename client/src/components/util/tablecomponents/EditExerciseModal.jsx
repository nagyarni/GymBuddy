import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { cyclesActions } from '../../../features/cycles/cycles-slice';
import { useParams } from 'react-router-dom';
import { useSnackbar } from '../SnackBarContext';

const EditExerciseModal = (props) => {
  // Extract props
  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const dayIndex = props.dayIndex - 1;
  const exerciseIndex = props.exerciseIndex;

  const cycleData = useSelector((state) => state.cycles.cycleData);
  const rpeCount = cycleData.weeks;
  const dispatch = useDispatch();
  const initialValues =
    cycleData.days.length > dayIndex && cycleData.days[dayIndex]?.[exerciseIndex];

  const [exerciseName, setExerciseName] = useState(initialValues?.name || '');
  const [series, setSeries] = useState(
    initialValues?.series ? initialValues.series : Array(rpeCount).fill('')
  );
  const [reps, setReps] = useState(
    initialValues?.reps ? initialValues.reps : Array(rpeCount).fill('')
  );
  const [rpes, setRPEs] = useState(
    initialValues?.rpe ? initialValues.rpe : Array(rpeCount).fill('')
  );

  const [perWeekInput, setPerWeekInput] = useState(false); // State for per-week input toggle

  const { setSnackbarMessage } = useSnackbar();

  const handleSave = () => {
    dispatch(
      cyclesActions.editExercise({
        dayIndex,
        exerciseIndex,
        exerciseName,
        series,
        reps,
        rpes,
      })
    );
    setSnackbarMessage({ message: 'Exercise edited', isError: false });
    handleClose();
  };

  const handleClose = () => {
    setModalOpen(false);
    setRPEs(initialValues?.rpe || Array(rpeCount).fill(''));
    setReps(initialValues?.reps || Array(rpeCount).fill(''));
    setSeries(initialValues?.series || '');
    setExerciseName(initialValues?.name || '');
  };

  useEffect(() => {
    setRPEs(initialValues?.rpe || Array(rpeCount).fill(''));
    setReps(initialValues?.reps || Array(rpeCount).fill(''));
    setSeries(initialValues?.series || '');
    setExerciseName(initialValues?.name || '');
  }, [modalOpen]);

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
        <h2>Edit Exercise</h2>
        <form>
          <TextField
            label="Exercise Name"
            fullWidth
            margin="normal"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <Grid container spacing={2}>
            {series.map((serie, index) => (
              <Grid item xs={4} key={index} style={{ paddingRight: '10px' }}>
                <TextField
                  type="number"
                  label={`Series Week ${index + 1}`}
                  fullWidth
                  margin="normal"
                  value={series[index]}
                  onChange={(e) => {
                    const updatedSeries = [...series];
                    updatedSeries[index] = e.target.value;
                    setSeries(updatedSeries);
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            {reps.map((rep, index) => (
              <Grid item xs={4} key={index} style={{ paddingRight: '10px' }}>
                <TextField
                  type="number"
                  label={`Reps Week ${index + 1}`}
                  fullWidth
                  margin="normal"
                  value={reps[index]}
                  onChange={(e) => {
                    const updatedReps = [...reps];
                    updatedReps[index] = e.target.value;
                    setReps(updatedReps);
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            {Array.from({ length: rpeCount }, (_, index) => (
              <Grid item xs={4} key={index} style={{ paddingRight: '10px' }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>RPE Week {index + 1}</InputLabel>
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
              </Grid>
            ))}
          </Grid>
          <Checkbox
            checked={perWeekInput}
            onChange={(e) => setPerWeekInput(e.target.checked)}
          />
          Use per-week inputs
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditExerciseModal;
