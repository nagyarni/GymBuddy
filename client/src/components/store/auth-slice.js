import { createSlice } from '@reduxjs/toolkit'

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