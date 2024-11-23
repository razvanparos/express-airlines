import { db } from "../firebase-config";
import { collection, query, where, getDocs, arrayUnion } from "firebase/firestore"; 
import DbRequest from '../services/dbRequestService'

export const removePaymentMethod = async (id) => {
    try {
        const usersRef = collection(db, "UsersDetails");
        const q = query(usersRef, where("id", "==", sessionStorage.getItem('currentUser')));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            let updatedPaymentMethods = userData.paymentMethods;
            updatedPaymentMethods=updatedPaymentMethods.filter(m=>m.id!==id)
            DbRequest.updateDb(userDoc.id,"UsersDetails",{
                paymentMethods: updatedPaymentMethods
            });
        } else {
            console.error("No user found with the specified ID.");
        }
    } catch (error) {
        console.error("Flight booking failed:", error);
    }
};


export const savePaymentInfo = async (payment) => {
    try {
        const usersRef = collection(db, "UsersDetails");
        const q = query(usersRef, where("id", "==", sessionStorage.getItem('currentUser')));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            DbRequest.updateDb(userDoc.id,"UsersDetails",{
                paymentMethods: arrayUnion(payment)
            });
        } else {
            console.error("No user found with the specified ID.");
        }
    } catch (error) {
        console.error("Flight booking failed:", error);
    }
};