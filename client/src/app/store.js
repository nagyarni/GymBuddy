import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cyclesSlice from '../features/cycles/cycles-slice'
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
    clients: clientsSlice.reducer,
    chat: chatSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  cycles: cyclesSlice.reducer,
  clients: clientsSlice.reducer,
  chat: chatSlice.reducer
})

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export default store