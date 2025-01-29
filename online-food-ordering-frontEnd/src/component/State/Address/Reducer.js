import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   addressList: [],
   isLoading: false,
   success: null,
   error: null
}

const addressSlice = createSlice({
   name:"addressSlice",
   initialState,
   reducers: {
      requestingAddress: (state) => {
         return {...state, isLoading: true, error: null, success: null};
      },
      requestFailureAddress: (state, action) => {
         return {...state, isLoading:false, error: action.payload, success: null}
      },
      reciveAddressListSuccess: (state, action) => {
         return { ...state, isLoading:false, error:null, addressList: action.payload}
      },
      createAddressAndUpdateAndDeleteSuccess: (state, action) => {
         return {...state, isLoading:false, error: null, success: action.success}
      }
   }
})

export const {requestingAddress,
   requestFailureAddress,
   reciveAddressListSuccess,
   createAddressAndUpdateAndDeleteSuccess} = addressSlice.actions;

export default addressSlice.reducer;