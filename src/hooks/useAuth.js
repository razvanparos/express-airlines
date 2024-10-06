import { createContext, useContext, useReducer, useEffect} from "react";

const AuthContext = createContext();

const initialState = {
  currentUser: null,
  currentUserPhone:'',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, currentUser: action.payload, currentUserPhone: action.phone };
    case 'LOGOUT':
      return { ...state, currentUser: null};
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(storedUser) });
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
