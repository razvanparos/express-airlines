import { db } from "../firebase-config";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore"; 

export const updateFlightSeats = async (booking) => {
    try {
        const flightsRef = collection(db, "Flights");
        const flight1 = query(flightsRef, where("id", "==", booking.departureFlight.id));
        const flight2 = query(flightsRef, where("id", "==", booking.returnFlight.id));
        const flight1Snapshot = await getDocs(flight1);
        const flight2Snapshot = await getDocs(flight2);
        if (!flight1Snapshot.empty) {
            const flight1Doc = flight1Snapshot.docs[0];
            const flight1Data = flight1Doc.data();
            let flight1Seats = flight1Data.seats;
            for(let i=0;i<=flight1Seats.length;i++){
                if(booking.selectedDepartureSeats.includes(flight1Seats[i]?.seatNumber)){
                    flight1Seats[i].occupied=true;
                }
            }
            await updateDoc(doc(db, "Flights", booking.departureFlight.id), {
                freeSeats: flight1Data.freeSeats-booking.adultsNumber,
                seats: flight1Seats
            });
        } else {
            console.error("No user found with the specified ID.");
        }
        if (!flight2Snapshot.empty) {
            const flight2Doc = flight2Snapshot.docs[0];
            const flight2Data = flight2Doc.data();
            let flight2Seats = flight2Data.seats;
            for(let i=0;i<=flight2Seats.length;i++){
                if(booking.selectedReturnSeats.includes(flight2Seats[i]?.seatNumber)){
                    flight2Seats[i].occupied=true;
                }
            }
            await updateDoc(doc(db, "Flights", booking.returnFlight.id), {
                freeSeats: flight2Data.freeSeats-booking.adultsNumber,
                seats: flight2Seats
            });
        } else {
            console.error("No user found with the specified ID.");
        }
    } catch (error) {
        console.error("Flight booking failed:", error);
    }
};