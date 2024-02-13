import { TableRow, TableCell } from '@mui/material'
import React from 'react'

function TableDay(props) {
//props.exercises will contain the data that needs to be mapped

  const day = props.day+1

  console.log(props.exercises)

  const generateDay = function() {
    //console.log(dummy.weeks[currentWeek].days)
    console.log(props.day+1)
    return (props.exercises).map((data, i) => {
      return (
        <>
          
          <TableRow>
            <TableCell>
              {data.exerciseName}
            </TableCell>
            <TableCell>
              {data.weight}
            </TableCell>
            <TableCell>
              {data.series}
            </TableCell>
            <TableCell>
              {data.reps}
            </TableCell>
          </TableRow>
        </>
      )
    })
  }

  return (
    <>
      <TableRow>
        <TableCell rowSpan={props.exercises.length+1}>
          {props.day+1}
        </TableCell>
      </TableRow>
      {
        generateDay()
      }
    </>
  )
}

export default TableDay