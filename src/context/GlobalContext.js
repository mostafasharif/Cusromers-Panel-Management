import { createContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  tablePage: 1,
  count: "",
  filterData: {},
  dataList: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_TABLEPAGE":
      return { ...state, tablePage: action.payload };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_LIST":
      return { ...state, dataList: action.payload };
    case "SET_FILTER":
      return { ...state, filterData: action.payload };
    default:
    // console.log("No Action");
  }
};

const GlobalProvider = ({ children }) => {
  const [globalState, globalDispatch] = useReducer(globalReducer, initialState);

  return <GlobalContext.Provider value={{ globalState, globalDispatch }}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
