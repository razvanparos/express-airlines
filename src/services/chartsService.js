import { db } from "../firebase-config";
import { collection, query, where, getDocs,writeBatch, doc, setDoc, orderBy} from "firebase/firestore";
import {getAllFlights} from "./flightService";
import DbRequest from './dbRequestService';

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
      let queryResponse = await getAllFlights();
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
      let queryChartsDataResponse = await getChartData();
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

  export const getChartData = async(table)=>{
    return await DbRequest.queryDb({
      orderBy: orderBy("date", "asc"),
      table:table,
      whereCondition:'',
    })
  }


