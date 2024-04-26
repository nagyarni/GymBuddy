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
  Typography,
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewCycleModal from './util/NewCycleModal';
import { useTheme } from '@emotion/react';

function CyclesPageNew() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  const isCoach = useSelector((state) => state.auth.isCoach);

  const [isNewCycleModalOpen, setNewCycleModalOpen] = useState(false);

  const [postCycleByUserId, postCycleByUserIdResult] = usePostCycleByUserIdMutation();

  const [patchCycleByUserIdAndCycleId, patchCycleByUserIdAndCycleIdResult] =
    usePatchCycleByUserIdAndCycleIdMutation();

  const { clientid } = useParams();

  const { setSnackbarMessage } = useSnackbar();

  const handleAddCycleClick = () => {
    setNewCycleModalOpen(true);
  };

  const handleConfirmCycle = async ({ cycleName, randomize, cycleLength, workoutDaysPerWeek, exercisesPerDay }) => {
    setNewCycleModalOpen(false);
    try {
      const body = {
        name: cycleName
      };
      if (randomize) {
        body.randomize = randomize
        body.cycleLength = cycleLength
        body.weekLength = workoutDaysPerWeek
        body.exercisePerDay = exercisesPerDay
      }
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

  const { data, isLoading, isSuccess, isError, error } = useGetCyclesByUserIdQuery({ id: clientid });

  let content;
  let topBarTitle = 'Cycles';

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    topBarTitle = data.userName + "'s Cycles";
    content = (
      <>
        <Container
          maxWidth="lg"
          sx={{
            width: isSmallScreen ? '100%' : 'auto', // Fill the width on small screens, otherwise auto
            marginLeft: isSmallScreen ? 0 : 'auto', // Center horizontally on non-small screens
            marginRight: isSmallScreen ? 0 : 'auto', // Center horizontally on non-small screens
            paddingLeft: isSmallScreen ? 0 : theme.spacing(2), // Remove left padding on small screens
            paddingRight: isSmallScreen ? 0 : theme.spacing(2), // Remove right padding on small screens
          }}>
          <Box sx={{ bgcolor: 'black', height: '100vh' }}>
            <Typography variant="h3" color="text" textAlign={'center'} padding={2}>
              Cycles
            </Typography>
            <Typography variant="h5" color="textSecondary" margin={2}>
                Active Cycles
              </Typography>
            <Divider sx={{ margin: 2 }} />
            <Grid container spacing={2} sx={{ flexGrow: 1, padding: 4 }}>
              {data.cycles
                .filter((cycle) => cycle.active)
                .map((cycle, index) => (
                  <Grid item key={index} xs={12} sm={4}> {/* Only one item per row on small screens */}
                    <CycleNew cycle={cycle} onToggleCycleStatus={handleToggleCycleStatus} />
                  </Grid>
                ))}
              {isCoach && (
                <Grid item xs={12} sm={4}> {/* Adjust the column size for larger screens */}
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
              {data.cycles
                .filter((cycle) => !cycle.active)
                .map((cycle, index) => (
                  <Grid item key={index} xs={12} sm={4}> {/* Only one item per row on small screens */}
                    <CycleNew cycle={cycle} onToggleCycleStatus={handleToggleCycleStatus} />
                  </Grid>
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
