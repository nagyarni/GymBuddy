import { Fab } from '@mui/material';
import React from 'react'
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { cyclesActions } from '../../../features/cycles/cycles-slice';
import { usePatchCycleByUserIdAndCycleIdMutation } from '../../../features/cycles/cyclesApi-slice';
import { useSnackbar } from '../SnackBarContext';

function SaveChangesFab(params) {
  const dispatch = useDispatch();
  const unsavedChanges = useSelector((state) => state.cycles.unsavedChanges)
  const { setSnackbarMessage } = useSnackbar()

  const userid = params.userid
  const cycleid = params.cycleid

  // Get the current cycle info from state (has to be the currently open cycle)
  const currentCycleInfo = useSelector((state) => state.cycles.cycleData);

  // Using Patch Cycle muation
  const [patchCycleByUserIdAndCycleId, patchCycleByUserIdAndCycleIdResult] = usePatchCycleByUserIdAndCycleIdMutation();

  const handleSaveClick = async () => {
    // Your custom save function logic here
    //console.log('Save button clicked');
    //dispatch(cyclesActions.saveChanges(false))
    try {
      const { data, error, isLoading } = await patchCycleByUserIdAndCycleId({ id: userid, cycleid: cycleid, cycle: currentCycleInfo });

      dispatch(cyclesActions.saveChanges(false))
      setSnackbarMessage({ message: "Successfully saved cycle!", isError: false });
      // Sleep a little time for request to take effect on database

      //dispatch(cyclesActions.setCurrentlyFetchedUserId({ currentlyFetchedUserId: null }))
    } catch (error) {
      //console.log(error)
      const errorMessage = error.data ? error.data.message : 'Saving failed!';
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
  };

  return (
    <Fab
      color="primary"
      disabled={!unsavedChanges}
      style={{
        width: '80px',
        height: '80px',
      }}
      onClick={handleSaveClick}
    >
      <SaveIcon />
    </Fab>
  )
}

export default SaveChangesFab