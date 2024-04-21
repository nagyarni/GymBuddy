import React, { useState, useEffect } from 'react'
import { Container, MenuItem, Fab, Typography, CircularProgress  } from '@mui/material';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useSnackbar } from '../components/util/SnackBarContext';
import { useGetCyclesByUserIdQuery } from '../features/cycles/cyclesApi-slice';
import { cyclesActions } from '../features/cycles/cycles-slice';


function FetchTesting(props) {

  // Import update cycle store reducer
  const { updateCycleStore } = cyclesActions;

  // Declare dispatch
  const dispatch = useDispatch()

  // Access the Redux store
  const store = useStore();

  // Access the state from the store
  const state = store.getState();

  // Access specific values from the state
  const userInfo = JSON.parse(state.auth.user)
  //console.log(userInfo)
  const clientUserId = userInfo.userId;
  if (!clientUserId) {
    //console.log("Client user ID is undefined therefore user is not logged in (this is only here for debugging this should not appear if protected routes work properly")
  }

  //console.log(clientUserId)
  const { setSnackbarMessage } = useSnackbar()

  const { data, error, isLoading } = useGetCyclesByUserIdQuery({ id: clientUserId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  //console.log(data)

  dispatch(updateCycleStore(data))
  
  return (
    <>
      <Typography variant="h1" color="text.primary">Fetch testing, open console</Typography>
    </>
  )
}

export default FetchTesting