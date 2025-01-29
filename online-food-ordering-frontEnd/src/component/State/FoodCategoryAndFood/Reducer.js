import { createSlice } from "@reduxjs/toolkit"

const initialState = {

   foodList:[],
   food: null,
   foodCategory: null,
   foodCategoryList: [],
   searchFood:[],
   available:true,
   isLoading: false,
   success: null,
   error: null,

}

const foodSlice = createSlice({
   name: "foodSlice",
   initialState,
   reducers: {
      requestingFood: (state) => {
         return { ...state, isLoading: true, error: null, success: null };
      },
      requestFailureFood: (state, action) => {
         return { ...state, isLoading: false, error: action.payload, success: null }
      },
      reciveFoodSuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, food: action.payload}
      },
      reciveFoodListSuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, foodList: action.payload}
      },
      reciveSearchFoodSuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, searchFood: action.payload}
      },
      cleanSearchFoodSuccess:(state) => {
         return { ...state, isLoading: false, error:null, searchFood: []}
      },
      createAndUpdateAndDeleteSuccess: (state, action) => {
         return { ...state, isLoading:false, error:null, success: action.payload}
      },
      updateAvailableSuccess: (state, action) => {
         return { ...state, isLoading:false, error:null, available: action.payload}
      },
      //===========
      reciveFoodCategorySuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, foodCategory: action.payload}
      },
      reciveFoodCategoryListSuccess: (state, action) => {
         return { ...state, isLoading: false, error: null, foodCategoryList: action.payload}
      },
   }
})

export const {requestingFood,
   requestFailureFood,
   reciveFoodSuccess,
   reciveFoodListSuccess,
   createAndUpdateAndDeleteSuccess,
   updateAvailableSuccess,
   reciveFoodCategorySuccess,
   reciveSearchFoodSuccess,
   cleanSearchFoodSuccess,
   reciveFoodCategoryListSuccess} = foodSlice.actions;

export default foodSlice.reducer;