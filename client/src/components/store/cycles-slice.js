// slice containing information on all cycles of a client including all info
import { createSlice, current } from '@reduxjs/toolkit'
import dummyCyclesState from "./dummyCyclesState.json"

const cyclesSlice = createSlice({
  name: 'cycles',
  initialState: dummyCyclesState,
  reducers: {
    addCycle: (state, action) => {
      // Assuming action.payload contains information about the new cycle
      state.push(action.payload);
    },
    removeCycle: (state, action) => {
      // Assuming action.payload contains the index of the cycle to remove
      state.splice(action.payload, 1);
    },
    updateWeight: (state, action) => {
      const { cycleIndex, dayIndex, exerciseIndex, newWeight } = action.payload;

      // Assuming action.payload contains the updated weight for a specific exercise
      console.log("Inside the updateWeight reducer:\n")
      const test = current(state.cycles[cycleIndex].days[exerciseIndex][exerciseIndex].weight)
      console.log(test[dayIndex])
      //state.cycles[cycleIndex].days[exerciseIndex].weight[dayIndex] = newWeight;
    },
  }
})

export const cyclesActions = cyclesSlice.actions

export default cyclesSlice