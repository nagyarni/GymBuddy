import React, { useState, useEffect } from 'react'
import { Container, MenuItem, Fab, Typography, CircularProgress  } from '@mui/material';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useSnackbar } from '../util/SnackBarContext';
import { useGetCyclesByUserIdQuery } from '../../features/cycles/cyclesApi-slice';
import { cyclesActions } from '../../features/cycles/cycles-slice';
import FetchCycles from '../util/FetchCycles';
import WorkoutTable from './WorkoutTable'
import CyclesPage from './CyclesPage';


function ClientFetchWrapper(props) {

  const [dataLoaded, setDataLoaded] = useState(false)

  // Content info: use for cycles page or workout table page
  const content = props.content
  // content === 0 => cycles page
  // content === 1 => workout table page

  // Import update cycle store reducer
  const { updateCycleStore } = cyclesActions;

  // Declare dispatch
  const dispatch = useDispatch()

  // Access the Redux store


  const cycles = useSelector((state) => state.cycles.cycles);

  useEffect(() => {
    // Check if cycles data is not loaded
    if (!cycles) {
      console.log("Data is not loaded");
      setDataLoaded(false)
      // Perform any action you want when data is not loaded
    } else {
      console.log("Data is loaded");
      setDataLoaded(true)
      // Perform any action you want when data is loaded
    }
  }, [cycles]); // Run the effect whenever cycles state changes


  // Access specific values from the state
  const userInfo = useSelector((state) => state.auth.user);
  console.log(userInfo)
  const clientUserId = userInfo.userId;
  if (!clientUserId) {
    console.log("Client user ID is undefined therefore user is not logged in (this is only here for debugging this should not appear if protected routes work properly")
  }

  console.log(clientUserId)
  
  return (
    <>
      <FetchCycles userId={clientUserId} dataLoaded={dataLoaded}>
        {
        content === 0 ?
          <CyclesPage />
        :
          <WorkoutTable userid={clientUserId}/>
        }
      </FetchCycles>
    </>
  )
}

export default ClientFetchWrapper