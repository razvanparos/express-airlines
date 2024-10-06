import { useReducer } from "react";

const initialState = {
  registerEmail: '',
  registerPassword: '',
  registerName: '',
  registerPhone: '',
  registerError: '',
  loading: false
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
        registerError: action.error
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };
    case 'RESET_FIELDS':
      return {
        ...state,
        registerEmail: '',
        registerPassword: '',
        registerName: '',
        registerPhone: '',
        registerError: '',
        loading: false
      };
    default:
      return state;
  }
};

export const useRegisterForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setField = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', error });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', loading });
  };

  const resetFields = () => {
    dispatch({ type: 'RESET_FIELDS' });
  };

  return { state, setField, setError, setLoading, resetFields };
};
