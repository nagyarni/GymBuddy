// slice containing information on all cycles of a client including all info
import { createSlice, current } from '@reduxjs/toolkit'
import dummyCyclesState from "./dummyCyclesState.json"

const cyclesSlice = createSlice({
  name: 'cycles',
  initialState: dummyCyclesState,
  reducers: {
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
    },
    addNewWeek: (state, action) => {
      const { cycleIndex } = action.payload;
      state.cycles[cycleIndex].weeks = state.cycles[cycleIndex].weeks + 1
      state.cycles[cycleIndex].days = addWeekToExercises(state.cycles[cycleIndex].days)
    },
    deleteDay: (state, action) => {
      const { cycleIndex, dayIndex } = action.payload
      state.cycles[cycleIndex].days.splice(dayIndex, 1)
    }
  }
})

export const cyclesActions = cyclesSlice.actions

export default cyclesSlice

const addWeekToExercises = (days) => {
  days.map((day, index) => {
    day.forEach(exercise => {
      exercise.rpe.push(0)
      exercise.weight.push(0)
    });
  })
  return days
}