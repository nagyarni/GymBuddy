import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import cyclesSlice from './cycles-slice'
import unsavedChangesSlice from './unsavedChanges-slice'
import clientsSlice from './clients-slice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cycles: cyclesSlice.reducer,
    unsavedChanges: unsavedChangesSlice.reducer,
    clients: clientsSlice.reducer
  }
})

export default store