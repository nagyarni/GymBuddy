import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from './util/SnackBarContext';
import { useGetCycleDataByCycleIdQuery } from '../features/cycles/cyclesApi-slice';
import LoadingSpinner from './util/LoadingSpinner';
import TopBar from './util/TopBar';
import { cyclesActions } from '../features/cycles/cycles-slice';
import { Box, Button, Container, Fab, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import DeleteTableWeekButton from './util/tablecomponents/DeleteTableWeekButton';
import TableDayNew from './TableDayNew';
import AddTableDayButton from './util/tablecomponents/AddTableDayButton';
import SaveChangesFab from './util/tablecomponents/SaveChangesFab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddDeleteWeekConfirmationDialog from './util/tablecomponents/AddDeleteWeekConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { PDFDownloadLink } from '@react-pdf/renderer';
import WorkoutTablePdf from './WorkoutTablePdf';
import { useTheme } from '@emotion/react';
import DownloadIcon from '@mui/icons-material/Download';

function WorkoutTableNew() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [gap, setGap] = useState('8rem'); // Initial gap value

  // Calculating gap size for FAB arrow buttons
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {
        setGap('2.5rem');
      } else if (screenWidth <= 900) {
        setGap('6rem');
      } else {
        setGap('12rem');
      }
    };

    // Call handleResize initially to set initial gap value
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]); // Include window.innerWidth in the dependency array

  const dispatch = useDispatch();

  // topBarTitle hook
  const [topBarTitle, setTopBarTitle] = useState("Workout Table");

  // Get user login state
  // If user is coach, there will be extra features on this page available
  // to edit cycle data
  const isCoach = useSelector((state) => state.auth.isCoach);

  // Select cycleData from store
  const cycleData = useSelector((state) => state.cycles.cycleData);

  // Get userId and cycleId from url
  const { clientid, cycleid } = useParams();

  // Snackbar message hook
  const { setSnackbarMessage } = useSnackbar();

  // Pagination utility
  const [isLeftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [isRightButtonDisabled, setRightButtonDisabled] = useState(false);
  const [weekCounter, setWeekCounter] = useState(0);
  const totalWeeks = cycleData?.weeks;
  const numOfDays = cycleData?.days.length;
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [confirmationDialogActionType, setConfirmationDialogActionType] = useState(0);

  useEffect(() => {
    if (totalWeeks - 1 === 0 && weekCounter === 0) {
      setLeftButtonDisabled(true);
      setRightButtonDisabled(true);
    } else if (weekCounter === 0) {
      setLeftButtonDisabled(true);
      setRightButtonDisabled(false);
    } else if (weekCounter === totalWeeks - 1) {
      setLeftButtonDisabled(false);
      setRightButtonDisabled(true);
    } else {
      setLeftButtonDisabled(false);
      setRightButtonDisabled(false);
    }
  }, [weekCounter, totalWeeks]);

  // Click handlers
  const handleLeftClick = () => {
    setWeekCounter(weekCounter - 1);
  };

  const handleRightClick = () => {
    setWeekCounter(weekCounter + 1);
  };

  const handleAddWeekClick = () => {
    setConfirmationDialogActionType(1);
    setOpenConfirmationDialog(true);
  };

  const handleDeleteWeekClick = () => {
    setConfirmationDialogActionType(-1);
    setOpenConfirmationDialog(true);
  };

  // Call API fetch hook to get cycle info
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCycleDataByCycleIdQuery({ id: clientid, cycleid: cycleid });

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <Container
        maxWidth="lg"
        sx={{
          width: isSmallScreen ? '100%' : 'auto', // Fill the width on small screens, otherwise auto
          marginLeft: isSmallScreen ? 0 : 'auto', // Center horizontally on non-small screens
          marginRight: isSmallScreen ? 0 : 'auto', // Center horizontally on non-small screens
          paddingLeft: isSmallScreen ? 0 : theme.spacing(2), // Remove left padding on small screens
          paddingRight: isSmallScreen ? 0 : theme.spacing(2), // Remove right padding on small screens
        }}>
        <Box sx={{ bgcolor: 'black', minHeight: '100vh', padding: theme.spacing(2) }}>
          <Typography variant="h3" color="text" textAlign="center" marginBottom={2}>
            Week {weekCounter + 1}
          </Typography>
          {/* PDF Download Link */}
          <PDFDownloadLink document={<WorkoutTablePdf cycleData={cycleData} />} fileName={cycleData?.name}>
            {({ blob, url, loading, error }) =>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={<DownloadIcon />} // You can use any appropriate icon here
                sx={{ margin: "10px" }}
              >
                {loading ? 'Loading document...' : 'Download PDF'}
              </Button>
            }
          </PDFDownloadLink>
          {/* Delete Week Button */}
          {isCoach && cycleData?.active && totalWeeks !== 1 && (
            <IconButton size='large' color='error' aria-label="delete" onClick={handleDeleteWeekClick} sx={{ marginBottom: theme.spacing(2),
            position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {/* Table */}
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table aria-label="simple table" size={isSmallScreen ? 'small' : 'medium'}>
              {/* Table Head */}
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Exercise</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Series</TableCell>
                  <TableCell>Repetitions</TableCell>
                  <TableCell>RPE</TableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {/* Map through days */}
                {cycleData?.days.map((day, index) => (
                  <TableDayNew index={index + 1} key={index} day={day} weekCounter={weekCounter} active={cycleData.active} />
                ))}
                {/* Add Day Button */}
                {numOfDays < 7 && isCoach && cycleData?.active && (
                  <AddTableDayButton />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Fab Buttons */}
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              justifyContent: 'center',
              gap: gap,
              zIndex: 1300, // Theme's zIndex.speedDial
            }}
          >
            <Fab color="primary" aria-label="previous week" disabled={isLeftButtonDisabled} onClick={handleLeftClick}>
              <ArrowBackIosNewIcon />
            </Fab>
            {isRightButtonDisabled && isCoach && cycleData?.active && weekCounter < 5 ? (
              <Fab color="success" aria-label="add new week" onClick={handleAddWeekClick}>
                <AddCircleOutlineIcon />
              </Fab>
            ) : (
              <Fab color="primary" aria-label="next week" disabled={isRightButtonDisabled} onClick={handleRightClick}>
                <ArrowForwardIosIcon />
              </Fab>
            )}
          </div>
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 1300, // Theme's zIndex.speedDial
            }}
          >
            <SaveChangesFab userid={clientid} cycleid={cycleid} />
          </div>
          
        </Box>
      </Container>
    );
  } else if (isError) {
    // Handle error
  }

  // UseEffect for setting store data on successful fetch
  useEffect(() => {
    if (isSuccess && data.cycle) {
      // Set topbar title
      setTopBarTitle(data.userName + "'s " + data.cycle.name);

      // Dispatch store changes
      dispatch(cyclesActions.updateCycleDataStore({ cycle: data.cycle }));
    }
  }, [isSuccess]);

  return (
    <>
      <TopBar title={topBarTitle} />
      {content}
      <AddDeleteWeekConfirmationDialog totalWeeks={totalWeeks} weekIndex={weekCounter} openDialog={openConfirmationDialog} setOpenDialog={setOpenConfirmationDialog} weekCounter={weekCounter} setWeekCounter={setWeekCounter} actionType={confirmationDialogActionType} />
    </>
  );
}

export default WorkoutTableNew;
