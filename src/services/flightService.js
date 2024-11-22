import { db } from "../firebase-config";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, setDoc, orderBy } from "firebase/firestore"; 
import DbRequest from './dbRequestService';

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

export const getFlights= async(departure, destination, adultsNumber, startDate, endDate, table) => {
    return await DbRequest.queryDb({
      orderBy: orderBy("pricePerSeat","asc"),
      whereDeparture: [where("departure", "==", departure), where("destination","==",destination),where("flightDate","==",startDate),where("freeSeats",">=",adultsNumber)],
      whereDestination: [where("departure", "==", destination), where("destination","==",departure),where("flightDate","==",endDate),where("freeSeats",">=",adultsNumber)],
      table: table
    });
  }

  export const  getFlightsAdmin= async(departure, destination, flightDate,table) => {
    return await DbRequest.queryDb({
      whereDeparture: [where("departure", "==", departure), where("destination","==",destination),where("flightDate","==",flightDate)],
      table:table
    });
  }

  export const getAllFlights=async(table)=>{
    return await DbRequest.queryDb({
      table:table,
      whereDeparture:'',
    })
  }