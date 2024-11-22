import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth, db } from "../firebase-config";
import errorMessages from '../mock-data/errorMessages.json';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 


export const loginUser=async(loginEmail, loginPassword, rememberMe )=>{
    if(loginEmail&&loginPassword){
        try{
          await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
          if(rememberMe){
            localStorage.setItem('currentUser', auth.currentUser.uid);
            sessionStorage.setItem('currentUser', auth.currentUser.uid)
          }else{
            sessionStorage.setItem('currentUser', auth.currentUser.uid)
          }
        }catch(error){
          throw(errorMessages[error.code])
        }
    }else{
      throw('Fields cannot be empty')
    }
}

export const logoutUser = async (navigate) => {
  try {
    await signOut(auth);
    navigate('/')
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentBooking')
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


export const registerUser = async (registerName,registerPhone, registerEmail, registerPassword) => {
    if (registerEmail && registerPassword && registerName && registerPhone) {
      try {
        await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        await setDoc(doc(db, "UsersDetails", `${auth.currentUser?.uid}`), {
          id: auth.currentUser?.uid,
          phone: registerPhone,
          bookedFlights:[],
          paymentMethods:[],
          fullName: auth.currentUser.displayName,
          email: auth.currentUser.email
      });
      } catch (error) {
        throw errorMessages[error.code];
      }
    } else {
      throw('Fields cannot be empty')
    }
  };
  