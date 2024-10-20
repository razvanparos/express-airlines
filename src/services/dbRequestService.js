import { collection, query, getDocs} from "firebase/firestore";
import { db } from "../firebase-config";

class DbRequest {
    async queryDb(queryParams){
        const flightsRef = collection(db, 'Flights');
        const departureFlight = query(flightsRef, queryParams.orderBy, ...queryParams.whereDeparture);
        const returnFlight = query(flightsRef, queryParams.orderBy, ...queryParams.whereDestination);
        const departureSnapshot = await getDocs(departureFlight);
        const returnSnapshot = await getDocs(returnFlight);
        const departureData = departureSnapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
        }))
            const returnData = returnSnapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
        }))
        return [departureData,returnData];
  }
}

export default new DbRequest();
