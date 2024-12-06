export const SET_USER_DATA = "SET_USER_DATA";

const authActions = {
  dispatch: null,

  registerDispatchFunction: (dispatchFn) => authActions.dispatch = dispatchFn,

  setUserData: (payload) => authActions.dispatch({ type: SET_USER_DATA, payload })
};

export default authActions;