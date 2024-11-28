const homeSearchReducer = (state, action) => {
    const { homeSearch } = action.payload;
  
    switch (action.type) {
      case "SET_HOMESEARCH":
        return { ...state, homeSearch:{
          ...state.homeSearch, 
          ...action.payload.homeSearch,
        } };
      default:
        return false;
    }
  };
  
  export default homeSearchReducer;