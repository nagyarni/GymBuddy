import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, MenuItem, Fab, Typography  } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TopBar from '../../layout/TopBar';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, IconButton } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteItemDialog from '../utils/DeleteItemDialog'


function Cycle(props) {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleCardClick = (e) => {
    if(props.removable) (
      navigate('/cyclesedit/'+props.data.id)
    )
    else (
      navigate('/cycles/'+props.data.id)
    )
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
                { props.data.name }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                { props.data.createdAt }
              </Typography>
            </CardContent>
          </CardActionArea>
          {
            props.removable ?
              <>
                <IconButton aria-label="delete" onClick={handleCycleDelete}>
                  <RemoveIcon />
                </IconButton>
              </>
              : ""
          }
          
        </Card>
      </Grid>
      <DeleteItemDialog open={open} setOpen={setOpen} id={props.data.id-1} />
    </>
  )
}

export default Cycle