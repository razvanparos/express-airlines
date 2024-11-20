import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config";
import errorMessages from '../mock-data/errorMessages.json';
import { doc, setDoc } from "firebase/firestore"; 

export const registerUser = async (registerName,registerPhone, registerEmail, registerPassword) => {
  if (registerEmail && registerPassword && registerName && registerPhone) {
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      await updateProfile(auth.currentUser, { displayName: registerName });
      await setDoc(doc(db, "UsersDetails", `${auth.currentUser?.uid}`), {
        id: auth.currentUser?.uid,
        phone: registerPhone,
        bookedFlights:[],
        paymentMethods:[]
    });
    } catch (error) {
      throw errorMessages[error.code];
    }
  } else {
    throw('Fields cannot be empty')
  }
};
