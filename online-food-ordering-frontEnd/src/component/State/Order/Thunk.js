import axios from "axios";
import { createOrderAndUpdateAndCancelSuccess, reciveOrderItemListSuccess, requestFailureOrder, requestingOrder } from "./Reducer";
import { clearCart } from "../Cart/Thunk";
import { cartlogoutSuccess } from "../Cart/Reducer";
import { reciveMessageSuccess } from "../MessageReducer";

const BASE_URL_OF_ORDER = "http://localhost:8080/api/order";

export const createOrder = (orderDto) => async(dispatch) => {
   try {
      dispatch(requestingOrder());
      const {data} = await axios.post(BASE_URL_OF_ORDER+"/create_order",orderDto);
      // if(data.payment_url) {
      //    window.location.href = data.payment_url;
      // }
      dispatch(reciveMessageSuccess(data))
      dispatch(cartlogoutSuccess());
   }catch(error) {
      dispatch(requestFailureOrder(error.response?.data || error.message))
   }
}

export const updateOrderState = (orderId, orderStatus, restaurantId, userId) => async(dispatch) => {
   try {
      dispatch(requestingOrder());
      const {data} = await axios.patch(BASE_URL_OF_ORDER+`/${orderId}/order_status/${orderStatus}`);
      dispatch(createOrderAndUpdateAndCancelSuccess(data))
      if(restaurantId) {
         dispatch(getOrderItemByRestaurantId(restaurantId, orderStatus))
      }else {
         dispatch(getOrderItemByUserId(userId))
      }
   }catch(error) {
      dispatch(requestFailureOrder(error.response?.data || error.message))
   }
}

export const cancelOrderItem = (orderItemId, userId) => async(dispatch) => {
   try {
      dispatch(requestingOrder());
      const {data} = await axios.delete(BASE_URL_OF_ORDER+"/"+orderItemId);
      dispatch(createOrderAndUpdateAndCancelSuccess(data))
      dispatch(getOrderItemByUserId(userId))
   }catch(error) {
      dispatch(requestFailureOrder(error.response?.data || error.message))
   }
}

export const getOrderItemByUserId = (userId) => async(dispatch) => {
   try {
      dispatch(requestingOrder());
      const {data} = await axios.get(BASE_URL_OF_ORDER+"/userId/"+userId);
      dispatch(reciveOrderItemListSuccess(data))
   }catch(error) {
      dispatch(requestFailureOrder(error.response?.data || error.message))
   }
}

export const getOrderItemByRestaurantId = (restaurantId, orderStatus) => async(dispatch) => {
   try {
      const part = [`/restaurant/${restaurantId}`]
      if(orderStatus !== "All") {
         part.push(`?orderStatus=${orderStatus}`)
      }
      const result = part.join("");
      dispatch(requestingOrder());
      const {data} = await axios.get(BASE_URL_OF_ORDER+result);
      dispatch(reciveOrderItemListSuccess(data))
   }catch(error) {
      dispatch(requestFailureOrder(error.response?.data || error.message))
   }
}

// export const getOrder = (orderId) => async(dispatch) => {
//    try {
//       dispatch(requestingOrder());
//       const {data} = await axios.get(BASE_URL_OF_ORDER+"/"+orderId);
//       dispatch(reciveOrderSuccess(data))
//    }catch(error) {
//       dispatch(requestFailureOrder(error.response?.data || error.message))
//    }
// }

