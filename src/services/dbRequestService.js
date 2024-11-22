import { collection, query, getDocs} from "firebase/firestore";
import { db } from "../firebase-config";
import { doc, updateDoc, deleteDoc  } from "firebase/firestore"; 


class DbRequest {
    async queryDb(queryParams){
        const tableRef = collection(db, queryParams.table);
        const tableQuery1 = query(tableRef, queryParams.orderBy, ...queryParams.whereDeparture);
        if(queryParams.whereDestination){
          const tableQuery2 = query(tableRef, queryParams.orderBy, ...queryParams.whereDestination);
          const table1Snapshot = await getDocs(tableQuery1);
          const table2Snapshot = await getDocs(tableQuery2);
          const filterdData1 = table1Snapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
          }))
          const filterdData2 = table2Snapshot.docs.map((doc)=>({
              ...doc.data(),
              id: doc.id,
          }))
          return [filterdData1,filterdData2];
        }else{
          const table1Snapshot = await getDocs(tableQuery1);
          const filterdData1 = table1Snapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
          }))
          return filterdData1
        }
  }
  
  async updateFlight(id,newDeparture,newDestination,newFlightDate){
    await updateDoc(doc(db, "Flights",id), {
      departure: newDeparture,
      destination: newDestination,
      flightDate: newFlightDate
  });
  }
  async removeFlight(id){
    await deleteDoc(doc(db, "Flights", id));
  }
}

export default new DbRequest();
