import axios from "axios";
import toast from "react-hot-toast";
import { getAccessToken } from "../utils";

const baseUrlLogin = "https://dummyjson.com"; 
const baseUrl = "https://jsonplaceholder.typicode.com"; 

// Auth ##################################################
export const logOut = async (dispatch) => {
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  localStorage.clear();
  await dispatch({
    type: "LOGOUT",
  });
  window.location.reload();
  toast.alert("Logout Successfully");
};
export const loginReq = (data) => {
  return authReq.post("/auth/login", data);
};
export const tableReq = (data) => {
  return baseReq.get("/users", data);
};
export const sendSmsReq = (data) => {
  return baseReq.post("/users", data);
};
export const downloadData = (data) => {
  return baseReq.get("/carts", data);
};
export const logoutReq = () => {
  return baseReq.delete("/logout");
};

//########## ########## authReq ########## ##########
const authReq = axios.create({
  baseURL: baseUrlLogin,
  headers: {
    accept: "application/json",
    "Access-Control-Allow-Origin": "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
});

//########## ########## baseReq ########## ##########
export const baseReq = axios.create({
  baseURL: baseUrl,
  headers: {
    accept: "application/json",
  },
});

// interceptors
baseReq.interceptors.request.use(
  (config) => {
    // const accessToken = localStorage.getItem("access_token");
    const cookie_accessToken = getAccessToken();

    if (cookie_accessToken) {
      config.headers["Authorization"] = `Bearer ${cookie_accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
