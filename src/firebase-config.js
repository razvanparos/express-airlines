import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDRIDlIv0fpbvbBS58j1i1c5fplWRqiKJ8",
  authDomain: "express-airlines.firebaseapp.com",
  projectId: "express-airlines",
  storageBucket: "express-airlines.appspot.com",
  messagingSenderId: "371846843130",
  appId: "1:371846843130:web:0e5eb2b13ef95eda371743"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);