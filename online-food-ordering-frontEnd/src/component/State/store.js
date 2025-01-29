import { combineReducers } from "redux";
import userSlice from "./Authentication/Reducer"
import restaruantSlice from "./Restaurant/Reducer"
import foodSlice from "./FoodCategoryAndFood/Reducer"
import ingredientSlice from "./IngredientCategoryAndItem/Reducer"
import cartSlice from "./Cart/Reducer"
import addressSlice from "./Address/Reducer"
import orderSlice from "./Order/Reducer"
import messageSlice from "./MessageReducer"
import { configureStore } from "@reduxjs/toolkit";

const rooteReducer = combineReducers({
   auth: userSlice,
   address: addressSlice,
   restaurant: restaruantSlice,
   food: foodSlice,
   ingredient: ingredientSlice,
   cart:cartSlice,
   order:orderSlice,
   message: messageSlice
})

export const store = configureStore({
   reducer: rooteReducer
})