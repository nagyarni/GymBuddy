import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

// export const login = createAsyncThunk(
//   "login",
//   async () => {
//     try {
//       const body = {
//         "password": "redDeleteTest",
//         "email": "redclient@email.hu"
//       }
//       const response = await axios.post('localhost:5000/api/auth/login', body.json())
//       console.log(response.data)
//       return response
//     } catch (error) {
//       throw error
//     }
//   }
// )

const authSlice = createSlice({
  name: 'auth',
  initialState: {isLoggedIn: true, isCoach: true, emailNotifications: false},
  reducers: {
    login(state, action) {
      const { coach } = action.payload
      console.log(coach)
      if (coach) {
        state.isLoggedIn = true
        state.isCoach = true
      }
      else {
        state.isLoggedIn = true
      }
    },
    logout(state) {
      state.isLoggedIn = false
      state.isCoach = false
    }
  }
})

export const authActions = authSlice.actions

export default authSlice