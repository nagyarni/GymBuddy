// unsavedChangesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const unsavedChangesSlice = createSlice({
  name: 'unsavedChanges',
  initialState: true,
  reducers: {
    setUnsavedChanges: (state, action) => {
      return action.payload;
    }
  },
});

export const { setUnsavedChanges } = unsavedChangesSlice.actions;
export default unsavedChangesSlice