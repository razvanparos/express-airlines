import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from "../firebase-config";
import errorMessages from '../mock-data/errorMessages.json';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { where } from "firebase/firestore"; 
import DbRequest from './dbRequestService';

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
        DbRequest.setDb(auth.currentUser?.uid,"UsersDetails",{
          id: auth.currentUser?.uid,
          phone: registerPhone,
          bookedFlights:[],
          paymentMethods:[],
          fullName:registerName,
          email: auth.currentUser.email,
          isAdmin: false
      });} 
      catch (error) {
        throw errorMessages[error.code];
      }
    } else {
      throw('Fields cannot be empty')
    }
  };
  
  export const getUserDetails = async(table)=>{
    return await DbRequest.queryDb({
      table:table,
      whereCondition: [where("id", "==", sessionStorage.getItem('currentUser'))],
    })
  }