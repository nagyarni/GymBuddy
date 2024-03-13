// slice containing information on the registered clients for a trainer
import { createSlice, current } from '@reduxjs/toolkit'

const clientsSlice = createSlice({
  name: 'clients',
  initialState: null,
  reducers: {

  }
})

export const clientsActions = clientsSlice.actions

export default clientsSlice