export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

const notificationActions = {
  dispatch: null,

  registerDispatchFunction: (dispatchFn) => notificationActions.dispatch = dispatchFn,

  hideNotification: () => notificationActions.dispatch({ type: HIDE_NOTIFICATION }),

  showNotification: (type, message) => {
    notificationActions.dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        type,
        message
      }
    });

    setTimeout(notificationActions.hideNotification, 7000);
  }
}

export default notificationActions;