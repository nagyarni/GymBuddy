// GlobalSnackbar.js
import React, { useEffect } from 'react';
import { useSnackbar } from './SnackBarContext';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const GlobalSnackBar = () => {
  const { snackbarMessage, setSnackbarMessage } = useSnackbar();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (snackbarMessage.message) {
      setOpen(true);
    }
  }, [snackbarMessage])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

    setTimeout(() => {
      setSnackbarMessage({ message: "", isError: false });
    }, 300); // Adjust the delay time as needed (in milliseconds)
  };


  return (
      <div>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
        <Alert
          onClose={handleClose}
          severity={ snackbarMessage.isError ? "error" : "success" }
          variant="filled"
          sx={{ width: '100%' }}
        >
          { snackbarMessage.message }
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GlobalSnackBar;
