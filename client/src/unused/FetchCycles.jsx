import React, { useState, useEffect } from 'react'
import { Container, MenuItem, Fab, Typography, CircularProgress  } from '@mui/material';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useSnackbar } from '../components/util/SnackBarContext';
import { useGetCyclesByUserIdQuery } from '../features/cycles/cyclesApi-slice';
import { cyclesActions } from '../features/cycles/cycles-slice';


function FetchCycles({ userId, children, dataLoaded }) {

  if (!dataLoaded) {
    console.log("Component re rendered, re-fetching")
    // Import update cycle store reducer
    const { updateCycleStore } = cyclesActions;

    // Declare dispatch
    const dispatch = useDispatch()

    const { setSnackbarMessage } = useSnackbar()

    const { data, error, isLoading } = useGetCyclesByUserIdQuery({ id: userId });
    //console.log("Fetching via query")

    if (isLoading) {
      return <CircularProgress />;
    }

    if (error) {
      setSnackbarMessage(error)
      return <CircularProgress />;
    }

    ////console.log(data)

    dispatch(updateCycleStore(data))
    dispatch(cyclesActions.setCurrentlyFetchedUserId({ currentlyFetchedUserId: userId }))
  }
  else {
    console.log("Component re rendered, not re-fetching")
  }
  
  return (
    <>
      { children }
    </>
  )
}

export default FetchCycles