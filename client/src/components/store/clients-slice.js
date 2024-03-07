// slice containing information on the registered clients for a trainer
import { createSlice, current } from '@reduxjs/toolkit'
import dummyClientsState from './dummyClientsState.json'

const clientsSlice = createSlice({
  name: 'clients',
  initialState: dummyClientsState,
  reducers: {

  }
})

export const clientsActions = clientsSlice.actions

export default clientsSlice