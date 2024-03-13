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
  IconButton, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../../features/cycles/cycles-slice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteTableDayButton from './DeleteTableDayButton';
import AddIcon from '@mui/icons-material/Add';
import AddExerciseModal from './AddExerciseModal';
import DeleteExerciseButton from './DeleteExerciseButton';
import EditExerciseModal from './EditExerciseModal'
import EditExerciseButton from './EditExerciseButton'


function TableDay(props) {
//props.exercises will contain the data that needs to be mapped

  //console.log(props.day)
  //console.log("Week: "+props.week)

  const [modalOpen, setModalOpen] = useState(false);
  const [editedWeight, setEditedWeight] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0); // Initialize with a default value
  const [previousWeightData, setPreviousWeightData] = useState(0);
  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
  const [editExerciseModalOpen, setEditExerciseModalOpen] = useState(false);
  const removable = props.removable


  

  const dispatch = useDispatch()


  const cycleIndex = props.cycleIndex-1

  const infoForExerciseModals = {
    dayIndex: props.dayNumber-1,
    cycleIndex: cycleIndex,
    weekCount: props.weekCount
  }

  //console.log(infoForExerciseModals)


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

  const handleAddExerciseClick = (event) => {
    setAddExerciseModalOpen(true)
  }
  const handleEditExerciseClick = (event) => {
    setEditExerciseModalOpen(true)
  }


  const dayNumber = props.dayNumber
  const week = props.week
  const currentDayData = props.day
  //console.log(currentDayData)


  const generateDay = function() {
    //console.log(dummy.weeks[currentWeek].days)
    
    return (currentDayData).map((data, index) => {
      return (
        <>
          <TableRow key={index} >
            <TableCell>
              <Typography variant="body1" color="text.primary">{ data.name }</Typography>
              {
                removable ?
                <>
                  <DeleteExerciseButton info={infoForExerciseModals} exerciseIndex={index} />
                  <EditExerciseButton info={infoForExerciseModals} exerciseIndex={index} openModal={handleEditExerciseClick} setExerciseIndex={setExerciseIndex} />
                </>
                : ""
              }
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
        <TableCell rowSpan={ removable ? currentDayData.length+2 : currentDayData.length+1 } >
          { dayNumber }
          { 
            removable ?
            <DeleteTableDayButton cycleIndex={cycleIndex} dayIndex={dayNumber-1} /> 
            : ""
          }
        </TableCell>
      </TableRow>
      {
        generateDay()
      }
      {
        removable ? 
        <TableRow>
          <TableCell>
            <IconButton aria-label="add" onClick={handleAddExerciseClick} >
              <AddIcon />
            </IconButton>
          </TableCell>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
        : ""
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

      <AddExerciseModal info={infoForExerciseModals} addExerciseModalOpen={addExerciseModalOpen} setAddExerciseModalOpen={setAddExerciseModalOpen} />
      <EditExerciseModal info={infoForExerciseModals} editExerciseModalOpen={editExerciseModalOpen} setEditExerciseModalOpen={setEditExerciseModalOpen} exerciseIndex={exerciseIndex} />
    </>
  )
}

export default TableDay