import axios from "axios"
import { createAndUpdateAndDeleteSuccess, reciveFoodCategoryListSuccess, reciveFoodCategorySuccess, reciveFoodListSuccess, reciveFoodSuccess, reciveSearchFoodSuccess, requestFailureFood, requestingFood, updateAvailableSuccess } from "./Reducer"
import { Category } from "@mui/icons-material";

const BASE_URL_OF_Admin_FOOD_API = "http://localhost:8080/api/admin/food";
const BASE_URL_OF_FOOD_API = "http://localhost:8080/api/food";
const BASE_URL_OF_FOODCATEGORY_API = "http://localhost:8080/api/food_category";

export const createFood = (foodDto, restaurantId) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.post(BASE_URL_OF_Admin_FOOD_API + "/create_food", foodDto);
      dispatch(reciveFoodSuccess(data))
      dispatch(getFoodByRestaurantId(restaurantId));
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.response.message))
   }
}

export const deleteFood = (foodId, restaurantId) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.delete(BASE_URL_OF_Admin_FOOD_API + "/" + foodId);
      dispatch(createAndUpdateAndDeleteSuccess(data))
      dispatch(getFoodByRestaurantId(restaurantId));
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.response.message))
   }
}

export const updateFoodAvailable = (foodId, restaurantId) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.patch(BASE_URL_OF_Admin_FOOD_API + `/${foodId}/availability`);
      dispatch(updateAvailableSuccess(data))
      dispatch(getFoodByRestaurantId(restaurantId));
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.response.message))
   }
}

export const updateFood = (foodDto, restaurantId) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.put(BASE_URL_OF_Admin_FOOD_API + "/update", foodDto);
      dispatch(createAndUpdateAndDeleteSuccess(data))
      dispatch(getFoodByRestaurantId(restaurantId));
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.response.message))
   }
}

export const searchFood = (query) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.get(BASE_URL_OF_FOOD_API + "/search/" + query);
      dispatch(reciveSearchFoodSuccess(data))
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.message))
   }
}

export const getFoodByFilter = (restaurantId, isVegetarian, isSeasonal, isNonVegetarian, foodCategoryId) => async (dispatch) => {
   try {
      const filterFood = { restaurantId, isVegetarian, isSeasonal, isNonVegetarian, foodCategoryId }
      dispatch(requestingFood())
      const { data } = await axios.post(BASE_URL_OF_FOOD_API + "/get_food_by_filter", filterFood);
      dispatch(reciveFoodListSuccess(data))
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.message))
   }
}

export const getFoodByRestaurantId = (restaurantId) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.get(BASE_URL_OF_FOOD_API + "/restaurantId/" + restaurantId);
      dispatch(reciveFoodListSuccess(data))
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.message))
   }
}

export const getFoodById = (foodId) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.get(BASE_URL_OF_FOOD_API + "/" + foodId);
      dispatch(reciveFoodSuccess(data))
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.message))
   }
}

//========
export const createFoodCategory = (foodCategoryDto) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.post(BASE_URL_OF_FOODCATEGORY_API + "/create", foodCategoryDto);
      dispatch(createAndUpdateAndDeleteSuccess(data))
      dispatch(getFoodCategoryByRestaurantId(foodCategoryDto.restaurantId))
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.message))
   }
}

export const updateFoodCategory = (foodCategoryDto) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.put(BASE_URL_OF_FOODCATEGORY_API + "/", foodCategoryDto);
      dispatch(createAndUpdateAndDeleteSuccess(data))
      dispatch(getFoodCategoryByRestaurantId(foodCategoryDto.restaurantId))
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.message))
   }
}

export const getFoodCategoryByRestaurantId = (restaurantId) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.get(BASE_URL_OF_FOODCATEGORY_API + "/restaurant/" + restaurantId);
      dispatch(reciveFoodCategoryListSuccess(data))
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.message))
   }
}

export const getFoodCategory = (foodCategoryId) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.get(BASE_URL_OF_FOODCATEGORY_API + "/" + foodCategoryId);
      dispatch(reciveFoodCategorySuccess(data))
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.message))
   }
}

export const deleteFoodCategoryById = (categoryId, restaurantId) => async (dispatch) => {
   try {
      dispatch(requestingFood())
      const { data } = await axios.delete(BASE_URL_OF_FOODCATEGORY_API + "/delete/" + categoryId);
      dispatch(getFoodCategoryByRestaurantId(restaurantId))
      dispatch(createAndUpdateAndDeleteSuccess(data))
   } catch (error) {
      dispatch(requestFailureFood(error.response?.data || error.response.message))
   }
}
