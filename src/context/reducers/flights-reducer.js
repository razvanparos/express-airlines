const flightsReducer = (state, action) => {
    const { flights } = action.payload;
  
    switch (action.type) {
      case "SET_FLIGHTS":
        return { ...state, flights };
      default:
        return false;
    }
  };
  
  export default flightsReducer;