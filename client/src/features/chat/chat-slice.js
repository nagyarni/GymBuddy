import { createSlice, current } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: { chatData: null },
  reducers: {
    updateChatData: (state, action) => {
      const { newChatData } = action.payload
      state.chatData = newChatData
    }
  }

})

export const chatActions = chatSlice.actions

export default chatSlice