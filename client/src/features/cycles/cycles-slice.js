// slice containing information on all cycles of a client including all info
import { createSlice, current } from '@reduxjs/toolkit'

const cyclesSlice = createSlice({
  name: 'cycles',
  initialState: { cycleData: null, unsavedChanges: false },
  reducers: {
    setCurrentlyFetchedUserId: (state, action) => {
      const { currentlyFetchedUserId } = action.payload
      state.currentlyFetchedUserId = currentlyFetchedUserId
    },

    updateCycleDataStore: (state, action) => {
      const { cycle } = action.payload
      state.cycleData = cycle
    },


    // Unused, delete later
    clearCycleStore: (state, action) => {
      state.cycles = {}
    },
    removeCycle: (state, action) => {
      // Assuming action.payload contains the index of the cycle to remove
      const { cycleIndex } = action.payload;
      //console.log("Deleting cycle at index " + cycleIndex)
    },
    addNewCycle: (state, action) => {
      //console.log("Implement this using http request, appending to current state would be pointless.")
    },

    // Save changes if save button was clicked
    saveChanges: (state, action) => {
      // This should only be called when the API call returns success state
      state.unsavedChanges = false
    },
    // CycleData reducers (WorkoutTable component)
    updateWeight: (state, action) => {
      state.unsavedChanges = true
      const { dayIndex, exerciseIndex, newWeight, weekIndex } = action.payload;
      state.cycleData.days[dayIndex][exerciseIndex].weight[weekIndex] = newWeight;
    },
    updateExtraInfo: (state, action) => {
      state.unsavedChanges = true
      const { dayIndex, exerciseIndex, weekIndex, newExtraInfo } = action.payload
      state.cycleData.days[dayIndex][exerciseIndex].extraInfo[weekIndex] = newExtraInfo
    },
    addNewDay: (state, action) => {
      state.unsavedChanges = true
      const newDay = []
      state.cycleData.days.push(newDay)
    },
    addNewWeek: (state, action) => {
      state.unsavedChanges = true
      state.cycleData.weeks = state.cycleData.weeks + 1
      state.cycleData.days = addWeekToExercises(state.cycleData.days)
    },
    deleteDay: (state, action) => {
      state.unsavedChanges = true
      const { dayIndex } = action.payload
      state.cycleData.days.splice(dayIndex, 1)
    },
    deleteWeek: (state, action) => {
      state.unsavedChanges = true
      const { weekIndex } = action.payload;
      state.cycleData.weeks = state.cycleData.weeks - 1
      state.cycleData.days = deleteWeekToExercises(state.cycleData.days, weekIndex)
    },
    addNewExercise: (state, action) => {
      state.unsavedChanges = true
      const { exerciseName, series, reps, rpes, dayIndex  } = action.payload;
      const extraInfoObj = {
        series: null,
        reps: null,
        rpe: null
      }
      const newExercise = {
        "name": exerciseName,
        "series": series,
        "reps": reps,
        "rpe": rpes,
        "weight": Array(rpes.length).fill(0),
        "extraInfo": Array(rpes.length).fill(extraInfoObj)
      }
      state.cycleData.days[dayIndex].push(newExercise)
    },
    deleteExercise: (state, action) => {
      state.unsavedChanges = true
      const { exerciseIndex, dayIndex } = action.payload
      state.cycleData.days[dayIndex].splice(exerciseIndex, 1)
    },
    editExercise: (state, action) => {
      state.unsavedChanges = true
      const { dayIndex, exerciseIndex, exerciseName, series, reps, rpes } = action.payload
      const modifiedExercise = {
        "name": exerciseName,
        "series": series,
        "reps": reps,
        "rpe": rpes,
        "weight": Array(rpes.length).fill(0)
      }
      state.cycleData.days[dayIndex][exerciseIndex] = modifiedExercise
    },
    moveExercise: (state, action) => {
      state.unsavedChanges = true;
      const { dayIndex, fromIndex, toIndex } = action.payload;
      
      // Get the array of exercises for the specified day
      const dayExercises = state.cycleData.days[dayIndex];
    
      // Remove the exercise from the 'fromIndex' position
      const [movedExercise] = dayExercises.splice(fromIndex, 1);
    
      // Insert the exercise at the 'toIndex' position
      dayExercises.splice(toIndex, 0, movedExercise);
    
      // Update the state with the modified array of exercises
      state.cycleData.days[dayIndex] = dayExercises;
    }
  }
})

export const cyclesActions = cyclesSlice.actions

export default cyclesSlice

const addWeekToExercises = (days) => {
  days.map((day, index) => {
    day.forEach(exercise => {
      exercise.rpe.push(exercise.rpe[exercise.rpe.length - 1])
      exercise.weight.push(0)
    });
  })
  return days
}

const deleteWeekToExercises = (days, weekIndex) => {
  days.map((day, index) => {
    day.forEach(exercise => {
      exercise.rpe.splice(weekIndex, 1)
      exercise.weight.splice(weekIndex, 1)
    });
  })
  return days
}