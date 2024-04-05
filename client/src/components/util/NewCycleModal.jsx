import React, { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

function NewCycleModal({ open, onClose, onConfirm }) {
  const [cycleName, setCycleName] = useState('');
  const [randomize, setRandomize] = useState(false);
  const [cycleLength, setCycleLength] = useState('');
  const [workoutDaysPerWeek, setWorkoutDaysPerWeek] = useState('');
  const [exercisesPerDay, setExercisesPerDay] = useState('');

  const handleConfirm = () => {
    onConfirm({
      cycleName,
      randomize,
      cycleLength,
      workoutDaysPerWeek,
      exercisesPerDay,
    });
    setCycleName(''); // Reset cycleName after confirming
    setRandomize(false);
    setCycleLength('');
    setWorkoutDaysPerWeek('');
    setExercisesPerDay('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Container maxWidth="sm">
        <Box
          sx={{
            width: 400, // Fixed width for the modal content container
            bgcolor: 'background.paper',
            boxShadow: 24,
            padding: 4,
            borderRadius: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create New Cycle
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cycle Name"
                value={cycleName}
                onChange={(e) => setCycleName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={randomize}
                    onChange={(e) => setRandomize(e.target.checked)}
                    name="randomize"
                  />
                }
                label="Randomize Cycle"
              />
            </Grid>
            {randomize && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cycle Length (weeks)"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Workout Days Per Week"
                    value={workoutDaysPerWeek}
                    onChange={(e) => setWorkoutDaysPerWeek(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Exercises Per Day"
                    value={exercisesPerDay}
                    onChange={(e) => setExercisesPerDay(e.target.value)}
                    type="number"
                  />
                </Grid>
              </>
            )}
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleConfirm} fullWidth>
                Confirm
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" onClick={onClose} fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Modal>
  );
}

export default NewCycleModal;
