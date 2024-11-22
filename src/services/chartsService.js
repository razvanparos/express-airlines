import { db } from "../firebase-config";
import { collection, query, where, getDocs,writeBatch, doc, updateDoc, setDoc} from "firebase/firestore";
import homeService from "./homeService";

export const updateChartsData = async () => {
    try {
        let today = new Date();
        const formatDateToISO = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const day = d.getDate().toString().padStart(2, '0'); 
            return `${month}/${day}/${year}`; 
        };
        today = formatDateToISO(today)
        const chartsRef = collection(db, "ChartsData");
        const q = query(chartsRef, where("date", "==", today));
        const querySnapshot = await getDocs(q);
        const filteredData = querySnapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
    }))
      let queryResponse = await homeService.getAllFlights();
      if(filteredData.length===0){
        var newId = "id" + Math.random().toString(16).slice(2)
        await setDoc(doc(db, "ChartsData", newId), {
            id: newId,
            date: today,
            occupiedSeats: queryResponse?.reduce((total,f)=>{f.seats.forEach((s)=>{if(s.occupied){total+=1}}) 
                return total;},0),
            freeSeats: queryResponse?.reduce((total,f)=>total+f.seats.length,0),
            sales: queryResponse?.reduce((total, flight) => {
              const occupiedSeatsCount = flight.seats.filter(seat => seat.occupied).length;
              return total + (flight.pricePerSeat * occupiedSeatsCount);}, 0),
            total: queryResponse?.reduce((total,f)=>total+(f.pricePerSeat*f.freeSeats),0)
          })
        }else{
          await setDoc(doc(db, "ChartsData", filteredData[0].id), {
            id: filteredData[0].id,
            date: today,
            occupiedSeats: queryResponse?.reduce((total,f)=>{f.seats.forEach((s)=>{if(s.occupied){total+=1}}) 
              return total;},0),
            freeSeats: queryResponse?.reduce((total,f)=>total+f.seats.length,0),
            sales: queryResponse?.reduce((total, flight) => {
              const occupiedSeatsCount = flight.seats.filter(seat => seat.occupied).length;
              return total + (flight.pricePerSeat * occupiedSeatsCount);}, 0),
            total: queryResponse?.reduce((total,f)=>total+(f.pricePerSeat*f.freeSeats),0)
          });
      }
      let queryChartsDataResponse = await homeService.getChartData();
      if(queryChartsDataResponse.length>5){
        console.log('more than 5')
        const batch = writeBatch(db);
        const docRef = doc(db, "ChartsData", queryChartsDataResponse[0].id);
        batch.delete(docRef);
        await batch.commit();
      }
        
    } catch (error) {
      
    }
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