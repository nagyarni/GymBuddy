import React, { useState } from 'react'
import { selectUserIsCoach } from '../features/auth/auth-slice'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from './util/SnackBarContext'
import { useSelector } from 'react-redux'
import { Card, CardActionArea, CardContent, Grid, IconButton, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteCycleDialog from './util/DeleteCycleDialog'

function CycleNew(props) {

  // Get user login state
  // If user is coach, there will be extra features on this page available
  // to edit cycle data
  const isCoach = useSelector((state) => (state.auth.isCoach))

  // Extract cycle data from props
  const cycle = props.cycle

  // Dialog utils
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleCardClick = (e) => {
    navigate(`${cycle._id}`)
  }

  const handleCycleDelete = (event) => {
    setOpen(true)
  }

  return (
    <>
      <Grid item xs={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={handleCardClick}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                { cycle.name }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                { cycle.createdAt }
              </Typography>
            </CardContent>
          </CardActionArea>
          {
            isCoach ?
              <>
                <IconButton aria-label="delete" onClick={handleCycleDelete}>
                  <RemoveIcon />
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