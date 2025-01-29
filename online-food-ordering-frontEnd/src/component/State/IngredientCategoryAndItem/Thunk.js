import axios from "axios";
import { createAndDeleteIngredientCategoryAndItemSuccess, reciveIngredientCategoryListSuccess, reciveIngredientCategorySuccess, reciveIngredientListSuccess, reciveIngredientSuccess, requestFailureIngredient, requestingIngredient, updateIngredientStoke } from "./Reducer";

const BASE_URL_OF_INGREDIENT_API = "http://localhost:8080/api/admin/ingredients";

export const createIngredientCategory = (ingredientCategoryObj) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.post(BASE_URL_OF_INGREDIENT_API+"/category", ingredientCategoryObj);
      dispatch(createAndDeleteIngredientCategoryAndItemSuccess(data))
      dispatch(getIngredientCategoryByRestaurantId(ingredientCategoryObj.restaurantId))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const updateIngredientCategory = (ingredientCategoryObj) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.put(BASE_URL_OF_INGREDIENT_API+"/category", ingredientCategoryObj);
      dispatch(createAndDeleteIngredientCategoryAndItemSuccess(data))
      dispatch(getIngredientCategoryByRestaurantId(ingredientCategoryObj.restaurantId))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const deleteIngredientCategoryById = (categoryId, restaurantId) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.delete(BASE_URL_OF_INGREDIENT_API+"/delete_category/" + categoryId);
      dispatch(createAndDeleteIngredientCategoryAndItemSuccess(data))
      dispatch(getIngredientCategoryByRestaurantId(restaurantId))
      console.log(data)
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const getIngredientCategoryByRestaurantId = (restaurantId) => async(dispatch) => {
   try {
     
      dispatch(requestingIngredient());
      const {data} = await axios.get(BASE_URL_OF_INGREDIENT_API+"/category/restaurantId/"+ restaurantId);
      dispatch(reciveIngredientCategoryListSuccess(data))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const getIngredientCategory = (ingredientCategoryId) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.get(BASE_URL_OF_INGREDIENT_API+"/categoryId/"+ ingredientCategoryId);
      dispatch(reciveIngredientCategorySuccess(data))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

//======
export const createIngredient = (ingredientObj) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.post(BASE_URL_OF_INGREDIENT_API+"/create", ingredientObj);
      dispatch(createAndDeleteIngredientCategoryAndItemSuccess(data))
      dispatch(getIngredientByRestaurantId(ingredientObj.restaurantId))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const updateIngredient = (ingredientObj) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.put(BASE_URL_OF_INGREDIENT_API+"/", ingredientObj);
      dispatch(createAndDeleteIngredientCategoryAndItemSuccess(data))
      dispatch(getIngredientByRestaurantId(ingredientObj.restaurantId))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const deleteIngredientItemById = (ingredientId, restaurantId) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.delete(BASE_URL_OF_INGREDIENT_API+"/delete_ingredient/" + ingredientId);
      dispatch(createAndDeleteIngredientCategoryAndItemSuccess(data))
      dispatch(getIngredientByRestaurantId(restaurantId))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const updateIngredientInStoke = (ingredientId, restaurantId) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.patch(BASE_URL_OF_INGREDIENT_API+`/${ingredientId}/stoke`);
      dispatch(updateIngredientStoke(data))
      dispatch(getIngredientByRestaurantId(restaurantId))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const getIngredientItem = (ingredientItemId) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.get(BASE_URL_OF_INGREDIENT_API+"/"+ ingredientItemId);
      dispatch(reciveIngredientSuccess(data))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const getIngredientByRestaurantId = (restaurantId) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      const {data} = await axios.get(BASE_URL_OF_INGREDIENT_API+"/restaurantId/"+restaurantId);
      dispatch(reciveIngredientListSuccess(data))
      console.log(data)
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}

export const getIngredientByCategoryIdList = (categoryIdList) => async(dispatch) => {
   try {
      dispatch(requestingIngredient());
      console.log(categoryIdList)
      const {data} = await axios.post(BASE_URL_OF_INGREDIENT_API+"/get_item_by_category_list", categoryIdList);
      dispatch(reciveIngredientListSuccess(data))
   }catch(error) {
      dispatch(requestFailureIngredient(error.response?.data || error.message))
   }
}


