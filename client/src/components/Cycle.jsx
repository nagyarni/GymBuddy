import React, { useState, useEffect } from 'react'
import dummy from '../dummy.json'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, MenuItem, Fab, Typography  } from '@mui/material';
import TableDay from './tablecomponents/TableDay';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TopBar from './TopBar';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';



function Cycle(props) {

  const navigate = useNavigate()

  const handleCardClick = (e) => {
    navigate('/cycles/'+props.data.id)
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
        </Card>
      </Grid>
    </>
  )
}

export default Cycle