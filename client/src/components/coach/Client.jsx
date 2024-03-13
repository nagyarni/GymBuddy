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
import TopBar from '../util/TopBar';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, IconButton } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteItemDialog from '../util/tablecomponents/DeleteItemDialog'

function Client(props) {

  const navigate = useNavigate()

  const handleCardClick = (e) => {
    console.log(
      "WIP!!! Need to handle this via HTTP request to update the cycles-slice store with"+
      "the information of the currently selected client"
    )
    navigate('/cyclesedit')
  }

  return (
    <Grid item xs={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={handleCardClick}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                { props.data.name }
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
  )
}

export default Client