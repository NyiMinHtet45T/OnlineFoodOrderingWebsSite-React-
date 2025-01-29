import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   restaurantList: [],
   restaurant:null,
   resState: false,
   favouriteRestaurant: [],
   success: null,
   error: null,
   isLoading: false
}

const restaurantSlice = createSlice({
   name: "restaurantSlice",
   initialState,
   reducers: {
      requestingRestaurant: (state) => {
         return { ...state, isLoading: true, error: null, success: null };
      },
      requestFailureRestaurant: (state, action) => {
         return { ...state, isLoading: false, error: action.payload, success: null }
      },
      //==========
      reciveRestaurantSuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, restaurant: action.payload}
      },
      //============
      createAndUpdateAndDeleteRestaurantSuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, success: action.payload }
      },
      //============
      updateRestaurantStateSuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, resState: action.payload}
      },
      //===========
      reciveRestaurantListSuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, restaurantList: action.payload}
      },
      reciveFavouriteRestaurantSuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, favouriteRestaurant: action.payload}
      },
      restaurantLogoutSuccess: (state) => {
         return initialState;
      },

   }
});

export const {
   requestingRestaurant,
requestFailureRestaurant,
reciveRestaurantSuccess,
createAndUpdateAndDeleteRestaurantSuccess,
updateRestaurantStateSuccess,
reciveRestaurantListSuccess,
reciveFavouriteRestaurantSuccess,
restaurantLogoutSuccess
} = restaurantSlice.actions;

export default restaurantSlice.reducer;