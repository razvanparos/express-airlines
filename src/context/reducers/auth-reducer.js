import { SET_USER_DATA } from "../actions/auth-actions";

const authReducer = (state, action) => {
    const { userDetails } = action.payload;
  
    switch (action.type) {
      case SET_USER_DATA:
        return { ...state, userDetails };
      default:
        return false;
    }
  };
  
  export default authReducer;