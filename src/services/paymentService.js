import { where, arrayUnion } from "firebase/firestore"; 
import DbRequest from '../services/dbRequestService'

export const removePaymentMethod = async (id) => {
    try {
        let response = await DbRequest.queryDbData({
            table:'UsersDetails',
            whereCondition:[where("id", "==", sessionStorage.getItem('currentUser'))]
        })
        if (!response.empty) {
            const userDoc = response.docs[0];
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
        let response = await DbRequest.queryDbData({
            table:'UsersDetails',
            whereCondition:[where("id", "==", sessionStorage.getItem('currentUser'))]
        })
        if (!response.empty) {
            const userDoc = response.docs[0];
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