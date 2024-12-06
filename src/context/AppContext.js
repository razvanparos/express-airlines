import React, { createContext, useReducer } from "react";
import initialState from "./initial-state";
import combineReducers from "./reducers/combine-reducers";
import flightActions from "./actions/flights-actions";
import homeActions from "./actions/home-actions";
import authActions from "./actions/auth-actions";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers, initialState);
  flightActions.registerDispatchFunction(dispatch)
  homeActions.registerDispatchFunction(dispatch)
  authActions.registerDispatchFunction(dispatch)

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
