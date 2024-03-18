// slice containing information on the registered clients for a trainer
import { createSlice, current } from '@reduxjs/toolkit'

const clientsSlice = createSlice({
  name: 'clients',
  initialState: { clients: null },
  reducers: {
    updateClientsStore: (state, action) => {
      const { clients } = action.payload
      state.clients = clients
    },
  }
})

export const clientsActions = clientsSlice.actions

export default clientsSlice