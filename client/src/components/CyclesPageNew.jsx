import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetCyclesByUserIdQuery,
  usePatchCycleByUserIdAndCycleIdMutation,
  usePostCycleByUserIdMutation
} from '../features/cycles/cyclesApi-slice';
import LoadingSpinner from './util/LoadingSpinner';
import { useSnackbar } from './util/SnackBarContext';
import TopBar from './util/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import CycleNew from './CycleNew';
import { selectUserIsCoach } from '../features/auth/auth-slice';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewCycleModal from './util/NewCycleModal';

function CyclesPageNew() {
  const dispatch = useDispatch();

  // Get user login state
  // If user is coach, there will be extra features on this page available
  // to edit cycle data
  const isCoach = useSelector((state) => state.auth.isCoach);

  // useState hook for modal
  const [isNewCycleModalOpen, setNewCycleModalOpen] = useState(false);

  // Using Post cycle mutation
  const [postCycleByUserId, postCycleByUserIdResult] = usePostCycleByUserIdMutation();

  // Using Patch cycle mutation
  const [patchCycleByUserIdAndCycleId, patchCycleByUserIdAndCycleIdResult] =
    usePatchCycleByUserIdAndCycleIdMutation();

  // Get userId from url
  const { clientid } = useParams();

  // Snackbar message hook
  const { setSnackbarMessage } = useSnackbar();

  // Add cycle click handler
  const handleAddCycleClick = () => {
    setNewCycleModalOpen(true);
  };

  const handleConfirmCycle = async (cycleName) => {
    // Your logic to handle the confirmation action here
    console.log('New cycle name:', cycleName);
    setNewCycleModalOpen(false);
    try {
      const body = {
        name: cycleName
      };
      const { data, error } = await postCycleByUserId({ id: clientid, cycle: body });
      setSnackbarMessage({ message: 'Successfully added cycle!', isError: false });
    } catch (error) {
      console.log(error);
      const errorMessage = error.data ? error.data.message : 'Unexpected error occurred while adding cycle!';
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
  };

  const handleToggleCycleStatus = async (cycleId, active) => {
    try {
      // Invert the active status
      const updatedStatus = {
        active: !active
      };
      const { data, error } = await patchCycleByUserIdAndCycleId({
        id: clientid,
        cycleid: cycleId,
        cycle: updatedStatus
      });
      const message = updatedStatus.active ? 'Successfully activated cycle!' : 'Successfully deactivated cycle!';
      setSnackbarMessage({ message, isError: false });
    } catch (error) {
      console.log(error);
      const errorMessage = error.data ? error.data.message : 'Unexpected error occurred while updating cycle status!';
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
  };

  // Call API fetch hook to get client info
  const { data, isLoading, isSuccess, isError, error } = useGetCyclesByUserIdQuery({ id: clientid });

  let content;
  let topBarTitle = 'Cycles';

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    topBarTitle = data.userName + "'s Cycles";
    content = (
      <>
        <Container maxWidth="lg">
          <Box sx={{ bgcolor: 'black', height: '100vh' }}>
            <Typography variant="h3" color="text" textAlign={'center'} padding={2}>
              Cycles
            </Typography>
            <Typography variant="h5" color="textSecondary" margin={2}>
                Active Cycles
              </Typography>
            <Divider sx={{ margin: 2 }} />
            <Grid container spacing={2} sx={{ flexGrow: 1, padding: 4 }}>
              {/* Active Cycles */}
              {data.cycles
                .filter((cycle) => cycle.active) // Filter active cycles
                .map((cycle, index) => (
                  <CycleNew cycle={cycle} key={index} onToggleCycleStatus={handleToggleCycleStatus} />
                ))}
              {/* Add new cycle button area */}
              {isCoach && (
                <Grid item xs={4}>
                  <Card sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', maxWidth: 345 }}>
                    <CardActionArea onClick={handleAddCycleClick}>
                      <CardContent>
                        <AddIcon />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )}
            </Grid>
            <Typography variant="h5" color="textSecondary" margin={2}>
              Inactive Cycles
            </Typography>
            <Divider sx={{ margin: 2 }} />
            <Grid container spacing={2} sx={{ flexGrow: 1, padding: 4 }}>
              {/* Inactive Cycles */}
              {data.cycles
                .filter((cycle) => !cycle.active) // Filter inactive cycles
                .map((cycle, index) => (
                  <CycleNew cycle={cycle} key={index} onToggleCycleStatus={handleToggleCycleStatus} />
                ))}
              {!isCoach && data.cycles.length === 0 && (
                <Grid item xs={12}>
                  <Box sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', p: 2, borderRadius: 4 }}>
                    <Typography variant="h6">
                      Oops! You don't seem to have any workout cycles. Contact your coach!
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>
      </>
    );
  } else if (isError) {
    setSnackbarMessage({ message: 'Error while fetching data, please reload page!', isError: true });
    content = <LoadingSpinner />;
  }

  return (
    <>
      <TopBar title={topBarTitle} />
      {content}
      <NewCycleModal
        open={isNewCycleModalOpen}
        onClose={() => setNewCycleModalOpen(false)}
        onConfirm={handleConfirmCycle}
      />
    </>
  );
}

export default CyclesPageNew;
