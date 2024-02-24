import { current } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import {
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  IconButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../store/cycles-slice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteTableDayButton from '../utils/DeleteTableDayButton';



function TableDay(props) {
//props.exercises will contain the data that needs to be mapped

  console.log(props.day)
  //console.log("Week: "+props.week)

  const [modalOpen, setModalOpen] = useState(false);
  const [editedWeight, setEditedWeight] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0); // Initialize with a default value
  const [previousWeightData, setPreviousWeightData] = useState(0);

  const dispatch = useDispatch()


  const cycleIndex = props.cycleIndex-1


  const handleOpenModal = (index, data) => {
    setExerciseIndex(index); // Set the exerciseIndex when opening the modal
    setPreviousWeightData(data)
    setEditedWeight('')
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = (event) => {
    // Your logic to handle the confirmed weight value
    //console.log('Confirmed weight:', editedWeight);

    //console.log(event)

    // Replace with the desired cycle index
    const dayIndex = dayNumber-1; // Replace with the desired day index
    // Replace with the desired exercise index
    const newWeight = editedWeight; // Replace with the new weight value
    const weekIndex = props.week;

    console.log(
      "cycle index: "+cycleIndex)
    console.log(
      "day index: "+dayIndex
    )
    console.log(
      "exercise index: "+exerciseIndex
    )
    console.log(
      "weighrt: "+newWeight
    )

    dispatch(
      cyclesActions.updateWeight({
        cycleIndex,
        dayIndex,
        exerciseIndex,
        newWeight,
        weekIndex
      }))
    // Close the modal
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEditedWeight(value);
    setIsFormFilled(value !== ''); // Set isFormFilled based on whether the input is not empty
  };


  const dayNumber = props.dayNumber
  const week = props.week
  const currentDayData = props.day
  //console.log(currentDayData)


  const generateDay = function() {
    //console.log(dummy.weeks[currentWeek].days)
    
    return (currentDayData).map((data, index) => {
      return (
        <>
          <TableRow key={dayNumber} >
            <TableCell>
              { data.name }
            </TableCell>
            <TableCell>
              { data.weight[week] }
              <div>
                <IconButton
                  aria-label='edit'
                  color="warning"
                  onClick={() => {
                    setEditedWeight(data.weight[week]);
                    handleOpenModal(index, data.weight[week]);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </div>
            </TableCell>
            <TableCell>
              { data.series }
            </TableCell>
            <TableCell>
              { data.reps }
            </TableCell>
            <TableCell>
              { data.rpe[week] }
            </TableCell>
          </TableRow>
        </>
      )
    })
  }

  return (
    <>
      <TableRow key={dayNumber}>
        <TableCell rowSpan={ currentDayData.length+1 } >
          { dayNumber }
          { <DeleteTableDayButton cycleIndex={cycleIndex} dayIndex={dayNumber-1} /> }
        </TableCell>
      </TableRow>
      {
        generateDay()
      }

      {/* Modal for editing weight */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md">
        <DialogTitle>Edit Weight</DialogTitle>
        {<DialogContentText sx={{ paddingLeft: 3 }}>
          { previousWeightData != 0 ? "Previous weight: " + previousWeightData : "" }
        </DialogContentText>}
        <DialogContent>
          <TextField
            label="Weight"
            type="number"
            fullWidth
            value={editedWeight}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={!isFormFilled}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableDay