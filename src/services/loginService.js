import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth, db } from "../firebase-config";
import errorMessages from '../utils/errorMessages.json';
import { collection, query, where, getDocs  } from "firebase/firestore";

export const loginUser=async(loginEmail, loginPassword, setError, resetFields, navigate, setLoading, rememberMe,dispatch )=>{
    setLoading(true);
    if(loginEmail&&loginPassword){
        try{
          await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
          const usersRef = collection(db, "UsersDetails");
          const q = query(usersRef, where("id", "==", auth.currentUser.uid));
          const querySnapshot = await getDocs(q);
          const filteredData = querySnapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
        }))
          dispatch({ type: 'LOGIN_SUCCESS', payload: auth.currentUser, phone: filteredData[0].phone});
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

export const logoutUser = async (dispatch, navigate) => {
  try {
    await signOut(auth);
    localStorage.removeItem('currentUser');
    dispatch({ type: 'LOGOUT' });
    navigate('/')
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
