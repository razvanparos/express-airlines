import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from "../firebase-config";
import errorMessages from '../utils/errorMessages.json';

export const loginUser=async(loginEmail, loginPassword, setError, resetFields, navigate, setLoading, rememberMe,dispatch )=>{
    setLoading(true);
    if(loginEmail&&loginPassword){
        try{
          await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
          dispatch({ type: 'LOGIN_SUCCESS', payload: auth.currentUser });
          resetFields();
          navigate('/')
          if(rememberMe){
            localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));
          }
        }catch(error){
          console.log(auth.currentUser)
          setError(errorMessages[error.code] || "An error occurred during login.");
        }
    }else{
        setError('Fields cannot be empty.');
    }
    setLoading(false)
}

export const logoutUser = async (dispatch) => {
  try {
    await signOut(auth);
    localStorage.removeItem('currentUser');
    dispatch({ type: 'LOGOUT' });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
