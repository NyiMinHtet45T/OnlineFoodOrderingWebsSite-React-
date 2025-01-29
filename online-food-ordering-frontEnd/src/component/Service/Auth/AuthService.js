import axios from "axios"
import { getToken } from "../../State/Authentication/Thunk";

axios.interceptors.request.use(config => {
   config.headers['Authorization'] = getToken();
   return config;
}, err => Promise.reject(err))

