import { db } from "../firebase-config";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore"; 

export const savePaymentInfo = async (payment) => {
    try {
        const usersRef = collection(db, "UsersDetails");
        const q = query(usersRef, where("id", "==", sessionStorage.getItem('currentUser')));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            await updateDoc(doc(db, "UsersDetails", userDoc.id), {
                paymentMethods: arrayUnion(payment)
            });
        } else {
            console.error("No user found with the specified ID.");
        }
    } catch (error) {
        console.error("Flight booking failed:", error);
    }
};