// unsavedChangesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const unsavedChangesSlice = createSlice({
  name: 'unsavedChanges',
  initialState: false,
  reducers: {
    setUnsavedChanges: (state, action) => {
      state = true
    },
    saveChanges: (state, action) => {
      state = false
    }
  },
});

export const { setUnsavedChanges } = unsavedChangesSlice.actions;
export default unsavedChangesSlice