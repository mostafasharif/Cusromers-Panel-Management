import { createContext, useLayoutEffect, useReducer } from "react";
import { getAccessToken } from "../utils";
 
const cookie_accessToken = getAccessToken();
let access_token = cookie_accessToken ? cookie_accessToken : "";
let user = localStorage.getItem("user") ? localStorage.getItem("user") : null;

const AuthContext = createContext();

// initial state
const initialState = {
  access_token: "" || access_token,
  user: null || user,
  level: 0,
};

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // console.log(action.payload);
      return { access_token: action.payload.access_token, user: action.payload.user, level: action.payload.level };

    // case "USER":
    //   return { ...state, user: action.payload };
    // case "LEVEL":
    //   return { ...state, level: action.payload };
    case "LOGOUT":
      console.log("Loginig out");
      document.cookie = "access_token=; expires=;path=/;SameSite=Strict";

      return { ...state, access_token: "", user: null, level: 0 };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // useLayoutEffect - payload user from local storage to state on refresh page
  useLayoutEffect(() => {
    const data = {
      // access_token: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : "",
      access_token: cookie_accessToken ? cookie_accessToken : "",
      user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
      level: localStorage.getItem("level") ? localStorage.getItem("level") : null,
    };

    dispatch({
      type: "LOGIN",
      payload: { access_token: data.access_token, user: data.user, level: data.level },
    });
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}> {children} </AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
