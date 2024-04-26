import React, { useState } from 'react'
import { selectUserIsCoach } from '../features/auth/auth-slice'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from './util/SnackBarContext'
import { useSelector } from 'react-redux'
import { Card, CardActionArea, CardContent, Grid, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCycleDialog from './util/DeleteCycleDialog'
import ArchiveIcon from '@mui/icons-material/Archive';

function CycleNew(props) {

  // Get user login state
  // If user is coach, there will be extra features on this page available
  // to edit cycle data
  const isCoach = useSelector((state) => (state.auth.isCoach))

  // Extract cycle data from props
  const cycle = props.cycle
  const bgcolor = cycle.active ? "success.dark" : "error.dark"

  // Dialog utils
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleCardClick = (e) => {
    navigate(`${cycle._id}`)
  }

  const handleCycleDelete = (event) => {
    setOpen(true)
  }

  const handleToggleCycleStatus = () => {
    // Call the parent component's function to toggle the active status
    props.onToggleCycleStatus(cycle._id, cycle.active);
  };

  const readableDate = new Date(cycle.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ maxWidth: 345, bgcolor: bgcolor}} >
          <CardActionArea onClick={handleCardClick}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                { cycle.name }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                { readableDate }
              </Typography>
            </CardContent>
          </CardActionArea>
          {
            isCoach ?
              <>
                <IconButton aria-label="delete" onClick={handleCycleDelete}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="archive" onClick={handleToggleCycleStatus}>
                  <ArchiveIcon />
                </IconButton>
              </>
              : ""
          }
        </Card>
      </Grid>
      <DeleteCycleDialog open={open} setOpen={setOpen} id={cycle._id} />
    </>    
  )
}

export default CycleNew