import React from 'react'
import dummy from '../dummy.json'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Container, Paper } from '@mui/material';
import TableDay from './tablecomponents/TableDay';

function WorkoutTable(props) {

  //console.log(dummy)

  const generateTableDays = function(currentWeek) {
    //console.log(dummy.weeks[currentWeek].days)
    return (dummy.weeks[currentWeek].days).map((data, i) => {
      return (
        <TableDay key={i} day={i} exercises={data.exercises} />
      )
    })
  }
  
  return (
    <>
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'black', height: '100vh' }}>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Exercise</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Series</TableCell>
                <TableCell>Repetitions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableDay exercises={dummy.weeks[0].days} /> */}
              {
                generateTableDays(0)
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
    </>
  )
}

export default WorkoutTable