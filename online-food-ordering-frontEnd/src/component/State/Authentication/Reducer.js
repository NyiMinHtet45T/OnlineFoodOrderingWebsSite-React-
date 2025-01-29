import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: null,
   favorites : null,
   isLoading: false,
   success: null,
   error: null
}

const userSlice = createSlice({
   name:"userSlice",
   initialState,
   reducers: {
      requestingUser: (state) => {
         return {...state, isLoading: true, error: null, success: null};
      },
      requestFailureUser: (state, action) => {
         return {...state, isLoading:false, error: action.payload, success: null}
      },
      registerAndLoginSuccess: (state, action) => {
         return {...state, isLoading:false, error:null, success: action.payload}
      },
      //===========
      getUserSuccess: (state, action) => {
         return {...state, isLoading:false, error: null, user: action.payload}
      },
      //============
      addToFavouriteSuccess: (state, action) => {
         return {...state, isLoading: false, error:null, success: action.payload}
      },
      //=============
      logoutSuccess: (state) => {
         return initialState;
      }
   }
})

export const {requestingUser,
   registerAndLoginSuccess,
   requestFailureUser,
   getUserSuccess,
   addToFavouriteSuccess,
   logoutSuccess,} = userSlice.actions;

export default userSlice.reducer;