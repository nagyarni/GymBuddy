// slice containing information on all cycles of a client including all info
import { createSlice, current } from '@reduxjs/toolkit'

const cyclesSlice = createSlice({
  name: 'cycles',
  initialState: { cycles: null, unsavedChanges: false },
  reducers: {
    saveChanges: (state, action) => {
      // This should only be called when the API call returns success state
      state.unsavedChanges = false
    },
    updateCycleStore: (state, action) => {
      const { cycles } = action.payload
      //console.log(cycles)
      state.cycles = cycles
    },
    clearCycleStore: (state, action) => {
      state.cycles = {}
    },
    removeCycle: (state, action) => {
      // Assuming action.payload contains the index of the cycle to remove
      const { cycleIndex } = action.payload;
      console.log("Deleting cycle at index " + cycleIndex)
    },
    updateWeight: (state, action) => {
      const { cycleIndex, dayIndex, exerciseIndex, newWeight, weekIndex } = action.payload;

      // Assuming action.payload contains the updated weight for a specific exercise
      console.log("Inside the updateWeight reducer:\n")
      /* const test = current(state.cycles[cycleIndex].days[exerciseIndex][exerciseIndex].weight)
      console.log(test[dayIndex]) */
      state.cycles[cycleIndex].days[dayIndex][exerciseIndex].weight[weekIndex] = newWeight;
      state.unsavedChanges = true
      /* let newState = current(state)
      console.log(state) */
      
    },
    addNewCycle: (state, action) => {
      console.log("Implement this using http request, appending to current state would be pointless.")
    },
    addNewDay: (state, action) => {
      const { cycleIndex } = action.payload;
      const newDay = []
      state.cycles[cycleIndex].days.push(newDay)
      state.unsavedChanges = true
    },
    addNewWeek: (state, action) => {
      const { cycleIndex } = action.payload;
      state.cycles[cycleIndex].weeks = state.cycles[cycleIndex].weeks + 1
      state.cycles[cycleIndex].days = addWeekToExercises(state.cycles[cycleIndex].days)
      state.unsavedChanges = true
    },
    deleteDay: (state, action) => {
      const { cycleIndex, dayIndex } = action.payload
      state.cycles[cycleIndex].days.splice(dayIndex, 1)
      state.unsavedChanges = true
    },
    deleteWeek: (state, action) => {
      const { cycleIndex, weekIndex } = action.payload;
      state.cycles[cycleIndex].weeks = state.cycles[cycleIndex].weeks - 1
      state.cycles[cycleIndex].days = deleteWeekToExercises(state.cycles[cycleIndex].days, weekIndex)
      state.unsavedChanges = true
    },
    addNewExercise: (state, action) => {
      const { exerciseName, series, reps, rpes  } = action.payload;
      const { cycleIndex, dayIndex, weekCount } = action.payload.info;
      const newExercise = {
        "name": exerciseName,
        "series": series,
        "reps": reps,
        "rpe": rpes,
        "weight": Array(weekCount).fill(0)
      }
      state.cycles[cycleIndex].days[dayIndex].push(newExercise)
      state.unsavedChanges = true
    },
    deleteExercise: (state, action) => {
      const { exerciseIndex } = action.payload
      const { cycleIndex, dayIndex, weekCount } = action.payload.info;
      state.cycles[cycleIndex].days[dayIndex].splice(exerciseIndex, 1)
      state.unsavedChanges = true
    },
    editExercise: (state, action) => {
      const { cycleIndex, dayIndex, weekCount } = action.payload.info;
      const { exerciseIndex, exerciseName, series, reps, rpes } = action.payload
      const modifiedExercise = {
        "name": exerciseName,
        "series": series,
        "reps": reps,
        "rpe": rpes,
        "weight": Array(weekCount).fill(0)
      }
      state.cycles[cycleIndex].days[dayIndex][exerciseIndex] = modifiedExercise
      state.unsavedChanges = true
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