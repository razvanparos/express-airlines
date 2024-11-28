import React, { createContext, useEffect, useReducer } from "react";
import { getUserDetails } from "../services/authService";
import initialState from "./initial-state";
import combineReducers from "./reducers/combine-reducers";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers, initialState);
  const removeUserData = () => {
    dispatch({
      type: "SET_USER_DATA",
      payload: {
        userDetails: {},
      },
    });
  };
  const fetchUserData = async () => {
    let response = await getUserDetails("UsersDetails")
    dispatch({
      type: "SET_USER_DATA",
      payload: {
        userDetails: response,
      },
    });
  };
  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      fetchUserData();
    }
    if (localStorage.getItem("currentUser")) {
      sessionStorage.setItem("currentUser", localStorage.getItem("currentUser"));
      fetchUserData();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        removeUserData,
        fetchUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
