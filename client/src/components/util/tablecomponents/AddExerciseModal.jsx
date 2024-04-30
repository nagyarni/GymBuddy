import React, { useState } from 'react';
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

const AddExerciseModal = (props) => {
  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const dayIndex = props.dayIndex - 1;

  const cycleData = useSelector((state) => state.cycles.cycleData);
  const rpeCount = cycleData.weeks;
  const dispatch = useDispatch();
  
  // State variable to track form validity
  const [isFormValid, setIsFormValid] = useState(true);
  
  const [exerciseName, setExerciseName] = useState('');
  const [series, setSeries] = useState(Array(rpeCount).fill(''));
  const [reps, setReps] = useState(Array(rpeCount).fill(''));
  const [rpes, setRPEs] = useState(Array(rpeCount).fill(''));
  const [seriesErrors, setSeriesErrors] = useState(Array(rpeCount).fill(false));
  const [repsErrors, setRepsErrors] = useState(Array(rpeCount).fill(false));
  const [perWeekInput, setPerWeekInput] = useState(false); // State for per-week input toggle

  const { setSnackbarMessage } = useSnackbar();

  const handleSave = () => {
    dispatch(
      cyclesActions.addNewExercise({
        dayIndex,
        exerciseName,
        series,
        reps,
        rpes,
      })
    );
    setSnackbarMessage({ message: 'Exercise added', isError: false });
    handleClose();
  };

  const handleClose = () => {
    setModalOpen(false);
    setRPEs(Array(rpeCount).fill(''));
    setReps(Array(rpeCount).fill(''));
    setSeries(Array(rpeCount).fill(''));
    setExerciseName('');
    setSeriesErrors(Array(rpeCount).fill(false));
    setRepsErrors(Array(rpeCount).fill(false));
    setRpesErrors(Array(rpeCount).fill(false));
  };

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
        <h2>Add Exercise</h2>
        <form>
          <TextField
            label="Exercise Name"
            fullWidth
            margin="normal"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <Grid container spacing={2}>
            {!perWeekInput && (
              <>
                <Grid item sm={12} md={4}>
                  <TextField
                    type="number"
                    label={`Series`}
                    fullWidth
                    margin="normal"
                    value={series[0]}
                    onChange={(e) =>
                      handleSeriesChange(e.target.value, 0)
                    }
                    error={seriesErrors[0]}
                    helperText={seriesErrors[0] ? "Please enter a positive number" : ""}
                  />
                </Grid>
                <Grid item sm={12} md={4}>
                  <TextField
                    type="number"
                    label={`Reps`}
                    fullWidth
                    margin="normal"
                    value={reps[0]}
                    onChange={(e) =>
                      handleRepsChange(e.target.value, 0)
                    }
                    error={repsErrors[0]}
                    helperText={repsErrors[0] ? "Please enter a positive number" : ""}
                  />
                </Grid>
              </>
            )}
            {perWeekInput && (
              <>
                {series.map((serie, index) => (
                  <Grid item sm={12} md={rpeCount === 1 ? 12 : rpeCount === 2 ? 6 : 4} key={index} style={{ paddingRight: '10px' }}>
                    <TextField
                      type="number"
                      label={`Series Week ${index + 1}`}
                      fullWidth
                      margin="normal"
                      value={series[index]}
                      onChange={(e) => {
                        handleSeriesChange(e.target.value, index);
                      }}
                      error={seriesErrors[index]}
                      helperText={seriesErrors[index] ? "Please enter a positive number" : ""}
                    />
                  </Grid>
                ))}
                {reps.map((rep, index) => (
                  <Grid item sm={12} md={rpeCount === 1 ? 12 : rpeCount === 2 ? 6 : 4} key={index} style={{ paddingRight: '10px' }}>
                    <TextField
                      type="number"
                      label={`Reps Week ${index + 1}`}
                      fullWidth
                      margin="normal"
                      value={reps[index]}
                      onChange={(e) => {
                        handleRepsChange(e.target.value, index);
                      }}
                      error={repsErrors[index]}
                      helperText={repsErrors[index] ? "Please enter a positive number" : ""}
                    />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '10px' }}>
            {Array.from({ length: rpeCount }, (_, index) => (
              <Grid item xs={12} sm={12} md={rpeCount === 1 ? 12 : rpeCount === 2 ? 6 : 4} key={index} style={{ paddingRight: '10px' }}>
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
            <Grid item xs={12} style={{ paddingRight: '10px' }}>
              <Checkbox
                checked={perWeekInput}
                onChange={(e) => setPerWeekInput(e.target.checked)}
              />
              Use per-week inputs
            </Grid>
            <Grid item xs={12} style={{ paddingRight: '10px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={!isFormValid}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Modal>
  );
};

export default AddExerciseModal;
