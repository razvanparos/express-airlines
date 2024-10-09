import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth, db } from "../firebase-config";
import errorMessages from '../utils/errorMessages.json';
import { collection, query, where, getDocs  } from "firebase/firestore";

export const loginUser=async(loginEmail, loginPassword, rememberMe )=>{
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
          if(rememberMe){
            localStorage.setItem('currentUser', auth.currentUser.uid);
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
    localStorage.removeItem('currentUser');
    navigate('/')
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
