import React, { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
} from '@mui/material';

function NewCycleModal({ open, onClose, onConfirm }) {
  const [cycleName, setCycleName] = useState('');

  const handleConfirm = () => {
    onConfirm(cycleName);
    setCycleName(''); // Reset cycleName after confirming
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Container maxWidth="sm">
        <Box
          sx={{
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
