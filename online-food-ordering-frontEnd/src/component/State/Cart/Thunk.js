import axios from "axios";
import { addCartItemToCartAndDeleteSuccess, getCartSuccess, getCartTotalPriceAndItems, requestFailureCart, requestingCart } from "./Reducer"
import { reciveMessageSuccess } from "../MessageReducer";

const BASE_URL_OF_CART = "http://localhost:8080/api/cart"

export const addToCart = (userId, cartItemDto) => async(dispatch) => {
   try {
      dispatch(requestingCart());
      const {data} = await axios.put(BASE_URL_OF_CART+"/add_item/userId/"+userId, cartItemDto);
      dispatch(reciveMessageSuccess(data))
      dispatch(getCartByUserId(userId));
   }catch(error) {
      dispatch(requestFailureCart(error.response?.data || error.message))
   }
}

export const removeCartItem = (cartItemId, userId) => async(dispatch) => {
   try {
      dispatch(requestingCart());
      const {data} = await axios.delete(BASE_URL_OF_CART+`/cart_itemId/${cartItemId}/userId/${userId}`);
      dispatch(reciveMessageSuccess(data))
      dispatch(getCartByUserId(userId))
   }catch(error) {
      dispatch(requestFailureCart(error.response?.data || error.message))
   }
}

export const clearCart = (userId) => async(dispatch) => {
   try {
      dispatch(requestingCart());
      const {data} = await axios.delete(BASE_URL_OF_CART+`/clear_cart/${userId}`);
      dispatch(addCartItemToCartAndDeleteSuccess(data))
   }catch(error) {
      dispatch(requestFailureCart(error.response?.data || error.message))
   }
}

export const getCart = (cartId) => async(dispatch) => {
   try {
      dispatch(requestingCart());
      const {data} = await axios.get(BASE_URL_OF_CART+"/"+cartId);
      dispatch(getCartSuccess(data))
   }catch(error) {
      dispatch(requestFailureCart(error.response?.data || error.message))
   }
}

export const getCartByUserId = (userId) => async(dispatch) => {
   try {
      dispatch(requestingCart());
      const {data} = await axios.get(BASE_URL_OF_CART+"/userId/"+userId);
      dispatch(getCartSuccess(data))
      dispatch(getTotalPriceAndPrice(data.id))
   }catch(error) {
      dispatch(requestFailureCart(error.response?.data || error.message))
   }
}

export const getTotalPriceAndPrice = (cartId) => async(dispatch) => {
   try {
      dispatch(requestingCart());
      const {data} = await axios.put(BASE_URL_OF_CART+"/cart_total_price/"+cartId);
      dispatch(getCartTotalPriceAndItems(data))
   }catch(error) {
      dispatch(requestFailureCart(error.response?.data || error.message))
   }
}

export const addCartQuantity = (cartItemId, quantity, cartId) => async(dispatch) => {
   try {
      dispatch(requestingCart());
      const {data} = await axios.put(BASE_URL_OF_CART+`/cartId/${cartItemId}/add_quantity/${quantity}`);
      dispatch(addCartItemToCartAndDeleteSuccess(data));
      dispatch(getCart(cartId))
      dispatch(getTotalPriceAndPrice(cartId))
      // dispatch(getTotalPriceAndPrice())
   }catch(error) {
      dispatch(requestFailureCart(error.response?.data || error.message))
   }
}