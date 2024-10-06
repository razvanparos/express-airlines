import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config";
import errorMessages from '../utils/errorMessages.json';
import { doc, setDoc } from "firebase/firestore"; 

export const registerUser = async (registerEmail, registerPassword, registerName, registerPhone, setError, resetFields, navigate, setLoading) => {
  setLoading(true);
  if (registerEmail && registerPassword && registerName && registerPhone) {
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      await updateProfile(auth.currentUser, { displayName: registerName });
      await setDoc(doc(db, "UsersDetails", `${auth.currentUser?.uid}`), {
        id: auth.currentUser?.uid,
        phone: registerPhone,
    });
      resetFields(); 
      navigate('/login'); 
    } catch (error) {
      console.log(error)
      setError(errorMessages[error.code] || "An error occurred during registration.");
    }
  } else {
    setError('Fields cannot be empty.');
  }
  setLoading(false);
};
