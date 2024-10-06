import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import errorMessages from '../utils/errorMessages.json';

export const registerUser = async (registerEmail, registerPassword, registerName, registerPhone, setError, resetFields, navigate, setLoading) => {
  setLoading(true);
  if (registerEmail && registerPassword && registerName && registerPhone) {
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      resetFields(); 
      navigate('/login'); 
    } catch (error) {
      setError(errorMessages[error.code] || "An error occurred during registration.");
    }
  } else {
    setError('Fields cannot be empty.');
  }
  setLoading(false);
};
