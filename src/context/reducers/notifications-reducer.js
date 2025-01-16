import {
    HIDE_NOTIFICATION,
    SHOW_NOTIFICATION,
  } from '../actions/notification-actions';
  
  const notificationsReducer = (state, action) => {
    const { type, message } = action?.payload || {};
  
    switch (action.type) {
      case SHOW_NOTIFICATION:
        return { ...state, notification: { type, message } };
      case HIDE_NOTIFICATION:
        return { ...state, notification: null };
      default:
        return false;
    }
  };
  
  export default notificationsReducer;
  