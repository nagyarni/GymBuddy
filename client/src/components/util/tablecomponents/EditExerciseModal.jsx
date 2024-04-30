import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  const initialValues = cycleData.days[dayIndex]?.[exerciseIndex]

  const [exerciseName, setExerciseName] = useState(initialValues?.name || '');
  const [series, setSeries] = useState(
    initialValues?.series ? initialValues.series : Array(rpeCount).fill(0)
  );
  const [reps, setReps] = useState(
    initialValues?.reps ? initialValues.reps : Array(rpeCount).fill(0)
  );
  const [rpes, setRPEs] = useState(
    initialValues?.rpe ? initialValues.rpe : Array(rpeCount).fill(0)
  );

  // State variables for input validation and error messages
  const [seriesErrors, setSeriesErrors] = useState(Array(rpeCount).fill(false));
  const [repsErrors, setRepsErrors] = useState(Array(rpeCount).fill(false));
  const [rpesErrors, setRpesErrors] = useState(Array(rpeCount).fill(false));

  // State variable to track form validity
  const [isFormValid, setIsFormValid] = useState(true);

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
    setSeriesErrors(Array(rpeCount).fill(false));
    setRepsErrors(Array(rpeCount).fill(false));
    setRpesErrors(Array(rpeCount).fill(false));
    setExerciseName(initialValues?.name || '');
  };

  useEffect(() => {
    setSeriesErrors(Array(rpeCount).fill(false));
    setRepsErrors(Array(rpeCount).fill(false));
    setRpesErrors(Array(rpeCount).fill(false));
    setExerciseName(initialValues?.name || '');
  }, [modalOpen]);

  const handleSeriesChange = (value, index) => {
    const updatedSeries = [...series];
    updatedSeries[index] = value;
    setSeries(updatedSeries);

    // Validate input
    const isValid = !isNaN(value) && value >= 0;
    const errors = [...seriesErrors];
    errors[index] = !isValid;
    setSeriesErrors(errors);
    setIsFormValid(errors.every(error => !error));
  };

  const handleRepsChange = (value, index) => {
    const updatedReps = [...reps];
    updatedReps[index] = value;
    setReps(updatedReps);

    // Validate input
    const isValid = !isNaN(value) && value >= 0;
    const errors = [...repsErrors];
    errors[index] = !isValid;
    setRepsErrors(errors);
    setIsFormValid(errors.every(error => !error));
  };

  const handleRpesChange = (value, index) => {
    const updatedRpes = [...rpes];
    updatedRpes[index] = value;
    setRPEs(updatedRpes);

    // Validate input
    const isValid = !isNaN(value) && value >= 0;
    const errors = [...rpesErrors];
    errors[index] = !isValid;
    setRpesErrors(errors);
    setIsFormValid(errors.every(error => !error));
  };

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
          maxHeight: '80vh', // Set maximum height
          overflowY: 'auto', // Enable vertical scrolling
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
              <Grid item sm={12} md={rpeCount === 1 ? 12 : rpeCount === 2 ? 6 : 4} key={index} style={{ paddingRight: '10px' }}>
                <TextField
                  type="number"
                  label={`Series Week ${index + 1}`}
                  fullWidth
                  margin="normal"
                  value={series[index]}
                  onChange={(e) => handleSeriesChange(e.target.value, index)}
                  error={seriesErrors[index]}
                  helperText={seriesErrors[index] ? "Please enter a positive number" : ""}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            {reps.map((rep, index) => (
              <Grid item sm={12} md={rpeCount === 1 ? 12 : rpeCount === 2 ? 6 : 4} key={index} style={{ paddingRight: '10px' }}>
                <TextField
                  type="number"
                  label={`Reps Week ${index + 1}`}
                  fullWidth
                  margin="normal"
                  value={reps[index]}
                  onChange={(e) => handleRepsChange(e.target.value, index)}
                  error={repsErrors[index]}
                  helperText={repsErrors[index] ? "Please enter a positive number" : ""}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            {Array.from({ length: rpeCount }, (_, index) => (
              <Grid item xs={12} sm={12} md={rpeCount === 1 ? 12 : rpeCount === 2 ? 6 : 4} key={index} style={{ paddingRight: '10px' }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>RPE Week {index + 1}</InputLabel>
                  {rpes[index] !== undefined && (
                    <Select
                      value={rpes[index]}
                      onChange={(e) => handleRpesChange(e.target.value, index)}
                      error={rpesErrors[index]}
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
          <Button variant="contained" color="primary" onClick={handleSave} disabled={!isFormValid}>
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditExerciseModal;
