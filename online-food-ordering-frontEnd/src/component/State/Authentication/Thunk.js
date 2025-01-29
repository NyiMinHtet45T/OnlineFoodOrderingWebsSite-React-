import axios from "axios"
import { addToFavouriteSuccess, getUserSuccess, logoutSuccess, registerAndLoginSuccess, requestFailureUser, requestingUser } from "./Reducer"
import { getAllFavouriteByUserId, getAllRestaurant, getRestaurantByOwnerId } from "../Restaurant/Thunk";
import { getCartByUserId } from "../Cart/Thunk";
import { reciveMessageSuccess } from "../MessageReducer";

const BASE_URL_OF_AUTH_API = "http://localhost:8080/auth";

const BASE_URL_OF_USER_API = "http://localhost:8080/api/user";

const BASE_URL_OF_RESTAURANT = "http://localhost:8080/api/restaurant"

export const registerUser = (registerData) => async(dispatch) => {
   try {
      dispatch(requestingUser())
      const {data} = await  axios.post(BASE_URL_OF_AUTH_API+"/register", registerData);
      dispatch(reciveMessageSuccess(data));
   }catch(error) {
      dispatch(requestFailureUser(error.response?.data || error.message))
   }
}

export const loginUser = (loginObj, navigate) => async(dispatch) => {
   try {
      dispatch(requestingUser())
      const {data} = await  axios.post(BASE_URL_OF_AUTH_API+"/login", loginObj);
      localStorage.setItem("jwt","Bearer "+data.token);
      
      if(data.userRole === "ROLE_RESTAURANT_OWNER" || data.userRole === "ROLE_ADMIN") {
         navigate("/admin/restaurant")
         dispatch(getRestaurantByOwnerId(data.userId))
      }else {
         navigate("/")
      }
      dispatch(reciveMessageSuccess(data.message));
      dispatch(getUser(data.userId));
      dispatch(getAllRestaurant(data.userId))
      dispatch(getCartByUserId(data.userId));
   }catch(error) {
      dispatch(requestFailureUser(error.response?.data || error.message))
   }
}

export const getUser = (userId) => async(dispatch) => {
   dispatch(requestingUser())
   try {
      const {data} = await axios.get(BASE_URL_OF_USER_API+"/id/"+userId);
      dispatch(getUserSuccess(data));
   }catch(error) {
      dispatch(requestFailureUser(error.response?.data || error.message))
   }

}

export const addToFavourite = (restaurantId, userId, isFavorite) => async(dispatch) => {
   dispatch(requestingUser())
   try {
      const {data} = await axios.put(BASE_URL_OF_RESTAURANT+`/${restaurantId}/${userId}/add_to_favourite`);
      dispatch(reciveMessageSuccess(data));
      if(!isFavorite) {
         dispatch(getAllRestaurant(userId));
      }else {
         dispatch(getAllFavouriteByUserId(userId))
      }
   }catch(error) {
      dispatch(requestFailureUser(error.response?.data || error.message))
   }
}

export const logout = (navigate) => async(dispatch) => {
   navigate("/")
   dispatch(logoutSuccess())
}

export const getToken = () => localStorage.getItem("jwt");

