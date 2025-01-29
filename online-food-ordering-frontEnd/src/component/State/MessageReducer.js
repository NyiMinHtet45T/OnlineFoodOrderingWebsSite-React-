import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   message : ""
}

const messageSlice = createSlice({
   name: "messageSlice",
   initialState,
   reducers: {
      reciveMessageSuccess: (state, action) => {
         return {message : action.payload}
      }
   }
})

export const {reciveMessageSuccess} = messageSlice.actions;
export default messageSlice.reducer;
