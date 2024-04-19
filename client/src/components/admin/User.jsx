import React from 'react';
import { Button, Card, CardContent, Grid, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function User({ setOpenDeleteClientConfirmation, setDeleteClientId, setCoachUserId, filterValue, user, setDeleteUserId, setOpenDeleteConfirmation, setOpenAddClientModal, onDeleteClient }) {

  const isClient = user._client ? true : false;
  const isCoach = user._coach ? true : false;
  const isAdmin = user._admin ? true : false;

  let render = false;
  if (filterValue === 'all') {
    render = true;
  } else if (filterValue === 'client' && isClient) {
    render = true;
  } else if (filterValue === 'coach' && isCoach) {
    render = true;
  } else if (filterValue === 'admin' && isAdmin) {
    render = true;
  }


  return (
    <>
      {/* Filter logic */}
      {render ? (
        <Grid item key={user.id} xs={12} sm={6} md={4}>
          <Card elevation={6}> {/* Increased elevation for a more noticeable effect */}
            <CardContent>
              <Typography variant="h5" marginBottom={1}>{user.name}</Typography>
              <Typography marginBottom={1}>ID: {user._id}</Typography>
              <Typography marginBottom={1}>Join Date: {user.createdAt}</Typography>
              {/* Permissions chips */}
              <div style={{ marginTop: '12px', marginBottom: '20px' }}>
                {isClient && <Chip label="Client" color="customColor3" style={{ marginRight: '8px' }} />}
                {isCoach && <Chip label="Coach" color="customColor1" style={{ marginRight: '8px' }} />}
                {isAdmin && <Chip label="Admin" color="customColor2" style={{ marginRight: '8px' }} />}
              </div>
              {
                !isAdmin ? 
                <Button variant="contained" color="error" sx={{ marginRight: 4 }} onClick={() => {
                  setDeleteUserId(user._id);
                  setOpenDeleteConfirmation(true);
                }}>
                  Delete User
                </Button>
                : ""
              }

              {isCoach && (
                <Button variant="contained" color="customColor1" onClick={() => {
                  setCoachUserId(user._id);
                  setOpenAddClientModal(true);
                }}>
                  Add Client
                </Button>
              )}
              {isCoach && (
                <Accordion style={{ marginTop: '20px' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Clients
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {user._coach?.clients?.map((client, index) => (
                        <Grid item xs={6} key={index}>
                          <Paper elevation={3} style={{ padding: '10px' }}> {/* Increased elevation for a more noticeable effect */}
                            <Typography>{client.name}</Typography>
                            <Button variant="contained" color="error" onClick={async () => {
                              setCoachUserId(user._id);
                              console.log(user._id)
                              setDeleteClientId(client._id);
                              console.log(client._id)
                              setOpenDeleteClientConfirmation(true);
                            }}>
                            Delete Client</Button>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </>
  );
}

export default User;
