export const SET_HOMESEARCH = "SET_HOMESEARCH";

const homeActions = {
  dispatch: null,

  registerDispatchFunction: (dispatchFn) => homeActions.dispatch = dispatchFn,

  setHomeSearch: (payload) => homeActions.dispatch({ type: SET_HOMESEARCH, payload })
};

export default homeActions;