import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   orderItemList:[],
   isLoading:false,
   success: null,
   error:null,
};

const orderSlice = createSlice({
   name: "orderSlice",
   initialState,
   reducers: {
      requestingOrder: (state) => {
         return { ...state, isLoading: true, error: null, success: null };
      },
      requestFailureOrder: (state, action) => {
         return { ...state, isLoading: false, error: action.payload, success: null }
      },
      createOrderAndUpdateAndCancelSuccess: (state, action) => {
         return { ...state, isLoading:false, error:null, success:action.payload};
      },
      reciveOrderItemListSuccess: (state, action) => {
         return { ...state, isLoading:false, error:null, orderItemList: action.payload};
      },
   }
})

export const {
   requestingOrder,
requestFailureOrder,
createOrderAndUpdateAndCancelSuccess,
reciveOrderItemListSuccess
} = orderSlice.actions;

export default orderSlice.reducer;