export const SET_FLIGHTS = "SET_FLIGHTS";

const flightActions = {
  dispatch: null,

  registerDispatchFunction: (dispatchFn) => flightActions.dispatch = dispatchFn,

  setFlights: (payload) => flightActions.dispatch({ type: SET_FLIGHTS, payload })
};

export default flightActions;