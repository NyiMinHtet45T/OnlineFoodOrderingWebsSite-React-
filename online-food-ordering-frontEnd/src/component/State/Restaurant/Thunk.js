import axios from "axios";
import { requestingRestaurant,
   requestFailureRestaurant,
   reciveRestaurantSuccess,
   createAndUpdateAndDeleteRestaurantSuccess,
   updateRestaurantStateSuccess,
   reciveRestaurantListSuccess, 
   reciveFavouriteRestaurantSuccess,
   restaurantLogoutSuccess} from "./Reducer";
import { logout } from "../Authentication/Thunk";


const BASE_URL_OF_AUTH_RESTAURANT = "http://localhost:8080/api/admin/restaurant";
const BASE_URL_OF_RESTAURANT = "http://localhost:8080/api/restaurant"

export const createRestaurant = (restaurantObj, navigate) => async(dispatch) => {
   try {
      dispatch(requestingRestaurant());
      const {data} = await axios.post(BASE_URL_OF_AUTH_RESTAURANT+"/create_restaurant", restaurantObj);
      dispatch(reciveRestaurantSuccess(data))
      if(data.id || data.ownerId) {
         navigate("/admin/restaurant")
      }  
   }catch(error) {
      dispatch(requestFailureRestaurant(error.response?.data || error.message))
   }
}

export const updateRestaurant = (restaurantObj) => async(dispatch) => {
   try {
      dispatch(requestingRestaurant());
      const {data} = await axios.put(BASE_URL_OF_AUTH_RESTAURANT+"/update_restaurant", restaurantObj);
      dispatch(reciveRestaurantSuccess(data))
   }catch(error) {
      dispatch(requestFailureRestaurant(error.response?.data || error.message))
   }
}

export const deleteRestaurant = (restaurantId) => async(dispatch) => {
   try {
      dispatch(requestingRestaurant());
      const {data} = await axios.delete(BASE_URL_OF_AUTH_RESTAURANT+"/"+restaurantId);
      dispatch(createAndUpdateAndDeleteRestaurantSuccess(data))
   }catch(error) {
      dispatch(requestFailureRestaurant(error.response?.data || error.message))
   }
}

export const updateRestaurantState = (restaurantId) => async(dispatch) => {
   try {
      dispatch(requestingRestaurant());
      const {data} = await axios.patch(BASE_URL_OF_AUTH_RESTAURANT+`/${restaurantId}/state`);
      dispatch(updateRestaurantStateSuccess(data))
   }catch(error) {
      dispatch(requestFailureRestaurant(error.response?.data || error.message))
   }
}
export const getRestaurantByOwnerId = (ownerId) => async(dispatch) => {
   try {
      dispatch(requestingRestaurant());
      const {data} = await axios.get(BASE_URL_OF_AUTH_RESTAURANT+"/by_ownerId/"+ ownerId);
      dispatch(reciveRestaurantSuccess(data))
   }catch(error) {
      dispatch(requestFailureRestaurant(error.response?.data || error.message))
   }
}

export const searchRestaurantByQuery = (query) => async(dispatch) => {
   try {
      dispatch(requestingRestaurant());
      const {data} = await axios.get(BASE_URL_OF_RESTAURANT+"/search/"+query);
      dispatch(reciveRestaurantListSuccess(data))
   }catch(error) {
      dispatch(requestFailureRestaurant(error.response?.data || error.message))
   }
}

export const getAllRestaurant = (userId) => async(dispatch) => {
   try {
      dispatch(requestingRestaurant());
      if(!userId) {
         var data;
        data = await axios.get(BASE_URL_OF_RESTAURANT+"/list_restaurant");
      }else {
         data = await axios.get(BASE_URL_OF_RESTAURANT+"/list_restaurant?userId="+userId);
      }
      dispatch(reciveRestaurantListSuccess(data.data))
   }catch(error) {
      dispatch(requestFailureRestaurant(error.response?.data || error.message))
   }
}

export const getRestaurantById = (restaurantId) => async(dispatch) => {
   try {
      dispatch(requestingRestaurant());
      const {data} = await axios.get(BASE_URL_OF_RESTAURANT+"/by_restaurantId/"+restaurantId);
      dispatch(reciveRestaurantSuccess(data))
   }catch(error) {
      dispatch(requestFailureRestaurant(error.response?.data || error.message))
   }
}

export const getAllFavouriteByUserId = (userId) => async(dispatch) => {
   try {
      dispatch(requestingRestaurant());
         const {data} = await axios.get(BASE_URL_OF_RESTAURANT+"/get_favourite/"+userId);
      dispatch(reciveFavouriteRestaurantSuccess(data))
      console.log(data)
   }catch(error) {
      dispatch(requestFailureRestaurant(error.response?.data || error.message))
   }
}

export const restaurantLogout = (navigate) => async(dispatch) => {
   dispatch(restaurantLogoutSuccess());
   dispatch(logout(navigate))
}



