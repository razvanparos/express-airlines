import { collection, query, getDocs, orderBy} from "firebase/firestore";
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
  async queryAllFlights(){
    const flightsRef = collection(db, "Flights");
      const q = query(flightsRef);
      const querySnapshot = await getDocs(q);
      const filteredData = querySnapshot.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id,
    }))
    return filteredData;
  }
  async queryChartsData(){
    const chartsRef = collection(db, "ChartsData");
      const q = query(chartsRef, orderBy("date", "asc"),);
      const querySnapshot = await getDocs(q);
      const filteredData = querySnapshot.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id,
    }))
    return filteredData;
  }
}

export default new DbRequest();
