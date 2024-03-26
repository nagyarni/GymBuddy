import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddClientToCoachMutation, useDeleteClientFromCoachMutation, useDeleteUserByIdMutation, useGetAllUsersQuery } from '../../features/clients/clientsApi-slice';
import { useSnackbar } from '../util/SnackBarContext';
import LoadingSpinner from '../util/LoadingSpinner';
import { Box, Container, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, FormLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';
import TopBar from '../util/TopBar';
import User from './User';

function AdminPage() {
  const dispatch = useDispatch();
  const { setSnackbarMessage } = useSnackbar();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const [addClientId, setAddClientId] = useState('');
  const { data, isLoading, isSuccess, isError } = useGetAllUsersQuery();
  const [alignment, setAlignment] = useState('all'); // Initialize state for alignment
  const [coachUserId, setCoachUserId] = useState('');
  const [deleteClientId, setDeleteClientId] = useState('');
  const [openDeleteClientConfirmation, setOpenDeleteClientConfirmation] = useState(false)

  // Selection handler for Filter buttons
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) { // Ensure a value is selected
      setAlignment(newAlignment);
      console.log(newAlignment)
    }
  };

  // Using Delete user mutation
  const [deleteUserById, deleteUserByIdResult] = useDeleteUserByIdMutation();
  // Using Add client mutation
  const [addClientToCoach, addClientToCoachResult] = useAddClientToCoachMutation();
  // Using Delete client mutation
  const [deleteClientFromCoach, deleteClientFromCoachResult] = useDeleteClientFromCoachMutation();


  const handleDeleteUser = async () => {
    // Handle delete user action here
    console.log('Deleting user with ID:', deleteUserId);
    setOpenDeleteConfirmation(false);
    try {
      const { data, error } = await deleteUserById({ userid: deleteUserId })
      setSnackbarMessage({ message: "Successfully deleted user!", isError: false });
    } catch (error) {
      console.log(error)
      const errorMessage = error.data ? error.data.message : 'Unexpected error occurred while deleting user!';
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
  };

  const handleAddClient = async () => {
    // Handle add client to coach action here
    console.log('Adding client with ID:', addClientId, 'to coach');
    setOpenAddClientModal(false);
    try {
      console.log(coachUserId)
      const { data, error } = await addClientToCoach({ coachid: coachUserId, clientID: addClientId }) // Replace 'id of coach' with actual coach ID
      setSnackbarMessage({ message: "Successfully added client to coach!", isError: false });
    } catch (error) {
      console.log(error)
      const errorMessage = error.data ? error.data.message : 'Unexpected error occurred while adding client!';
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
  };

  const handleDeleteClient = async () => {
    // Handle delete client from coach action here
    console.log('Deleting client with ID:', deleteClientId, 'from coach');
    setOpenDeleteClientConfirmation(false);
    try {
      console.log(coachUserId)
      console.log(deleteClientId)
      const { data, error } = await deleteClientFromCoach({ userid: coachUserId, clientid: deleteClientId }) // Replace 'id of coach' with actual coach ID
      setSnackbarMessage({ message: "Successfully deleted client from coach!", isError: false });
    } catch (error) {
      console.log(error)
      const errorMessage = error.data ? error.data.message : 'Unexpected error occurred while deleting client!';
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
  }

  let content;
  let topBarTitle = 'Users';

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <>
        <Container maxWidth="lg">
          <Box sx={{ bgcolor: 'black', height: '100vh' }}>
            <Typography variant="h3" color="text" textAlign={'center'} padding={2}>
              Users
            </Typography>
            {/* Filter buttons */}
            <Grid container justifyContent="center">
              <Grid item>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Filter By:</FormLabel>
                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="filter options"
                  >
                    <ToggleButton value="all" aria-label="all users">
                      All
                    </ToggleButton>
                    <ToggleButton value="client" aria-label="client users">
                    Client
                    </ToggleButton>
                    <ToggleButton value="coach" aria-label="coach users">
                      Coach
                    </ToggleButton>
                    <ToggleButton value="admin" aria-label="admin users">
                      Admin
                    </ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ flexGrow: 1, padding: 4 }}>
              {data.map((user, index) => (
                <User setOpenDeleteClientConfirmation={setOpenDeleteClientConfirmation} setDeleteClientId={setDeleteClientId} setCoachUserId={setCoachUserId} filterValue={alignment} user={user} key={index} setDeleteUserId={setDeleteUserId} setOpenDeleteConfirmation={setOpenDeleteConfirmation} setAddClientId={setAddClientId} setOpenAddClientModal={setOpenAddClientModal} onDeleteClient={handleDeleteClient} />
              ))}
            </Grid>
          </Box>
        </Container>
        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteConfirmation} onClose={() => setOpenDeleteConfirmation(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this user?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteConfirmation(false)}>Cancel</Button>
            <Button onClick={handleDeleteUser} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
        {/* Add Client Modal */}
        <Dialog open={openAddClientModal} onClose={() => setOpenAddClientModal(false)}>
          <DialogTitle>Add Client</DialogTitle>
          <DialogContent>
            <Typography>Enter Client ID:</Typography>
            <input type="text" onChange={(e) => setAddClientId(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddClientModal(false)}>Cancel</Button>
            <Button onClick={handleAddClient} color="primary">Add</Button>
          </DialogActions>
        </Dialog>
        {/* Delete Client Confirmation Dialog */}
        <Dialog open={openDeleteClientConfirmation} onClose={() => setOpenDeleteClientConfirmation(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this client?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteClientConfirmation(false)}>Cancel</Button>
            <Button onClick={handleDeleteClient} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
        
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
    </>
  );
}

export default AdminPage;
