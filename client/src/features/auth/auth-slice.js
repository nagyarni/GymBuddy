// auth-slice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
  isClient: false,
  isCoach: false,
  isAdmin: false
};

// Check expiration status of JWT token when loading initial state
if (localStorage.getItem('token') !== null) {
  const tokenExpiration = JSON.parse(localStorage.getItem('user')).exp;
  ////console.log(tokenExpiration)
  if (Date.now() >= tokenExpiration * 1000) {
    // Token has expired, clear local storage
    //console.log("Purging localstorage after token expiration")
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } else {
    // Token is still valid, set initial state from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    initialState.token = localStorage.getItem('token');
    initialState.user = user;
    initialState.isLoggedIn = (localStorage.getItem('user')) ? true : false;
    initialState.isClient = user.client ? true : false;
    initialState.isCoach = user.coach ? true : false;
    initialState.isAdmin = user.admin ? true : false;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { ...initialState },
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
      state.isLoggedIn = user ? true : false; // Update isLoggedIn based on user presence
      state.isClient = user.client ? true : false
      state.isCoach = user.coach ? true : false
      state.isAdmin = user.admin ? true : false
      // Additional logic to update other permissions based on user attributes
    },
    logout(state, action) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null
      state.token = null
      state.isLoggedIn = false
      state.isClient = false
      state.isCoach = false
      state.isAdmin = false
    }
  }
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

// Selectors for auth states
export const selectUserIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUserIsClient = (state) => state.auth.isClient
export const selectUserIsCoach = (state) => state.auth.isCoach
export const selectUserIsAdmin = (state) => state.auth.isAdmin
export const selectUserId = (state) => {
  if (state.auth.user) {
    return state.auth.user.userId
  }
}

// Selectors for JWT token data
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token