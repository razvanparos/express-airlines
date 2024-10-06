import { useReducer } from "react";

const initialState = {
  loginEmail: '',
  loginPassword: '',
  loginError:'',
  rememberMe:false,
  loading: false,
  currentUser: null,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_ERROR':
      return {
        ...state,
        loginError: action.error
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };
    case 'SET_REMEMBERME':
      return {
        ...state,
        rememberMe: action.rememberMe
      };
    case 'RESET_FIELDS':
      return {
        ...state,
        loginEmail: '',
        loginPassword: '',
        loginError:'',
        rememberMe:false,
        loading: false
      };
    case 'LOGIN_SUCCESS':  
      return {
        ...state,
        currentUser: action.payload, 
        loading: false,
        loginError: ''
      };
    case 'LOGOUT':  
      return {
        ...state,
        currentUser: null, 
        loginEmail: '',
        loginPassword: '',
        loading: false,
        loginError: ''
      };
    default:
      return state;
  }
};

export const useLoginForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setField = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', error });
  };
  const setRememberMe = (rememberMe) => {
    dispatch({ type: 'SET_REMEMBERME', rememberMe });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', loading });
  };

  const resetFields = () => {
    dispatch({ type: 'RESET_FIELDS' });
  };

  const loginSuccess = (user) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return { state, setField, setError, setLoading, resetFields,setRememberMe, loginSuccess, logout };
};
