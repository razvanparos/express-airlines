import authReducer from './auth-reducer.js';
import flightsReducer from './flights-reducer.js';
import homeSearchReducer from './home-search-reducer.js';

const combineReducers = (...reducers) => {
  return (state, action) => {
    let result = false;

    for (let reducer of reducers) {
      result = reducer(state, action);

      if (result) {
        break;
      }
    }

    if (result) {
      return result;
    } else {
      throw new Error(`No action named "${action.type}" was found.`);
    }
  };
};

export default combineReducers(flightsReducer, authReducer,homeSearchReducer);
