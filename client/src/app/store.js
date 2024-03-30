import { configureStore } from '@reduxjs/toolkit'
import cyclesSlice from '../features/cycles/cycles-slice'
import unsavedChangesSlice from '../features/cycles/unsavedChanges-slice'
import clientsSlice from '../features/clients/clients-slice'
// const applyMiddleware = redux.applyMiddleware
// const thunkMiddleware = require('redux-thunk').default
import { apiSlice } from './api/api-slice'
import authReducer from '../features/auth/auth-slice'
import chatSlice from '../features/chat/chat-slice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cycles: cyclesSlice.reducer,
    unsavedChanges: unsavedChangesSlice.reducer,
    clients: clientsSlice.reducer,
    chat: chatSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export default store