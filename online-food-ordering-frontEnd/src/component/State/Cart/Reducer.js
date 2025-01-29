import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   cart:null,
   cartItem:[],
   cartTotalPrice:0,
   cartTotalItems:0,
   finalTotalPrice:0,
   isLoading:false,
   success:null,
   error:null
}

const cartSlice = createSlice({
   name:"cartSlice",
   initialState,
   reducers: {
      requestingCart: (state) => {
         return { ...state, isLoading: true, error: null, success: null };
      },
      requestFailureCart: (state, action) => {
         return { ...state, isLoading: false, error: action.payload, success: null };
      },
      addCartItemToCartAndDeleteSuccess: (state, action) => {
         return { ...state, isLoading:false, error:null, success:action.payload};
      },
      getCartSuccess: (state, action) => {
         return { ...state, isLoading:false, error:null, cart: action.payload};
      },
      getCartTotalPriceAndItems: (state,action) => {
         return { ...state, isLoading:false, error:null, 
               cartTotalPrice: action.payload.cartTotalPrice,
               cartTotalItems: action.payload.cartTotalItems,
               finalTotalPrice: action.payload.cartTotalPrice + 1000};
      },
      getFinalTotalPrice: (state) => {
         return { ...state, isLoading:false, finalTotalPrice: cartTotalPrice + 100}
      },
      cartlogoutSuccess: (state) => {
         return initialState;
      },

   }
})

export const {
   requestingCart,
requestFailureCart,
addCartItemToCartAndDeleteSuccess,
getCartSuccess,
getCartTotalPriceAndItems,
getFinalTotalPrice,
cartlogoutSuccess
} = cartSlice.actions;

export default cartSlice.reducer;