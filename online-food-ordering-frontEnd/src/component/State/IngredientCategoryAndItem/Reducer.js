import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   ingredient: null,
   ingredientList:[],
   ingredientState: false,
   ingredientCategory: null,
   ingredientCategoryList: [],
   isLoading: false,
   success: null,
   error: null
}

const ingredientSlice = createSlice({
   name: "ingredientSlice",
   initialState,
   reducers: {
      requestingIngredient: (state) => {
         return { ...state, isLoading: true, error: null, success: null };
      },
      requestFailureIngredient: (state, action) => {
         return { ...state, isLoading: false, error: action.payload, success: null }
      },
      reciveIngredientSuccess: (state, action) => {
         return { ...state, isLoading:false, error: null, ingredient: action.payload}
      },
      reciveIngredientListSuccess: (state, action) => {
         return { ...state, isLoading:false, error: null, ingredientList: action.payload}
      },
      //=====
      reciveIngredientCategorySuccess: (state, action) => {
         return { ...state, isLoading:false, error: null, ingredientCategory: action.payload}
      },
      reciveIngredientCategoryListSuccess: (state, action) => {
         return { ...state, isLoading:false, error: null, ingredientCategoryList: action.payload}
      },
      createAndDeleteIngredientCategoryAndItemSuccess:(state, action) => {
         return { ...state, isLoading:false, error: null, success: action.payload}
      },
      updateIngredientStoke: (state, action) => {
         return { ...state, isLoading:false, error: null, ingredientState: action.payload}
      }
   }
})

export const {requestingIngredient,
   requestFailureIngredient,
   reciveIngredientSuccess,
   reciveIngredientListSuccess,
   reciveIngredientCategorySuccess, 
   reciveIngredientCategoryListSuccess,
   createAndDeleteIngredientCategoryAndItemSuccess,
   updateIngredientStoke} = ingredientSlice.actions;

export default ingredientSlice.reducer;