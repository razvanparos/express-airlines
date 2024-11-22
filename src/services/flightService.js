import { db } from "../firebase-config";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore"; 

export const bookFlight = async (booking) => {
    try {
        const usersRef = collection(db, "UsersDetails");
        const q = query(usersRef, where("id", "==", sessionStorage.getItem('currentUser')));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            await updateDoc(doc(db, "UsersDetails", userDoc.id), {
                bookedFlights: arrayUnion(booking)
            });
        } else {
            console.error("No user found with the specified ID.");
        }
    } catch (error) {
        console.error("Flight booking failed:", error);
    }
};


export const createFlights = async (departure,destination,startDate,endDate,dist) => {
    let newId1 = "id" + Math.random().toString(16).slice(2)
    let newId2 = "id" + Math.random().toString(16).slice(2)
    let price = Math.floor(Math.floor(dist*0.06) + Math.random() * (30 - 10) + 10);
    let price2 = Math.floor(Math.floor(dist*0.06) + Math.random() * (30 - 10) + 10);
    let letters = ['A','B','C','D','E','F']
    let emptySeats = [];
    for(let i=1;i<=8;i++){
        for(let j =1;j<=6;j++){
            emptySeats.push({
                occupied: false,
                seatNumber: i+letters[j-1],
            })
        }
    }
    await setDoc(doc(db, "Flights", newId1), {
        departure: departure,
        destination: destination,
        flightDate: startDate,
        freeSeats: emptySeats.length,
        id: newId1,
        landing: "16:00",
        takeOff:"13:00",
        pricePerSeat: price,
        seats:emptySeats 
    });
    await setDoc(doc(db, "Flights", newId2), {
        departure: destination,
        destination: departure,
        flightDate: endDate,
        freeSeats: emptySeats.length,
        id: newId2,
        landing: "14:00",
        takeOff:"12:00",
        pricePerSeat: price2,
        seats:emptySeats
    });
  };
  
export const createFlightsAdmin = async (flightData) => {
    let newId = "id" + Math.random().toString(16).slice(2)
    let letters = ['A','B','C','D','E','F']
    let emptySeats = [];
    for(let i=1;i<=8;i++){
        for(let j =1;j<=6;j++){
            emptySeats.push({
                occupied: false,
                seatNumber: i+letters[j-1],
            })
        }
    }
    await setDoc(doc(db, "Flights", newId), {
        departure: flightData.departure,
        destination: flightData.destination,
        flightDate: flightData.date,
        freeSeats: emptySeats.length,
        id: newId,
        landing: flightData.landing,
        takeOff:flightData.takeoff,
        pricePerSeat: flightData.pricePerSeat,
        seats:emptySeats 
    });
   
  };