import axios from "axios";
import { createAddressAndUpdateAndDeleteSuccess, reciveAddressListSuccess, requestFailureAddress, requestingAddress } from "./Reducer";
import { reciveMessageSuccess } from "../MessageReducer";

const BASE_URL_OF_USER_API = "http://localhost:8080/api/user";

export const createAddress = (userId, addressObj) => async(dispatch) => {
   try {
      dispatch(requestingAddress())
      const {data} = await axios.post(BASE_URL_OF_USER_API+`/create_address/${userId}`, addressObj);
      dispatch(reciveMessageSuccess(data));
      dispatch(getAddressByUserId(userId))
   }catch(error) {
      dispatch(requestFailureAddress(error.response?.data || error.message))
   }
}

export const getAddressByUserId = (userId) => async(dispatch) => {
   try {
      dispatch(requestingAddress())
      const {data} = await axios.get(BASE_URL_OF_USER_API+`/address/${userId}`);
      dispatch(reciveAddressListSuccess(data));
   }catch(error) {
      dispatch(requestFailureAddress(error.response?.data || error.message))
   }
}