import React, { createContext, useReducer } from "react";
import initialState from "./initial-state";
import combineReducers from "./reducers/combine-reducers";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers, initialState);

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
