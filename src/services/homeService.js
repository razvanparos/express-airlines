import DbRequest from './dbRequestService';
import { where,orderBy  } from "firebase/firestore";

const homeService = {
  getFlights: async(departure, destination, adultsNumber, startDate, endDate, table) => {
    return await DbRequest.queryDb({
      orderBy: orderBy("pricePerSeat","asc"),
      whereDeparture: [where("departure", "==", departure), where("destination","==",destination),where("flightDate","==",startDate),where("freeSeats",">=",adultsNumber)],
      whereDestination: [where("departure", "==", destination), where("destination","==",departure),where("flightDate","==",endDate),where("freeSeats",">=",adultsNumber)],
      table: table
    });
  },
  getFlightsAdmin: async(departure, destination, flightDate,table) => {
    return await DbRequest.queryDb({
      whereDeparture: [where("departure", "==", departure), where("destination","==",destination),where("flightDate","==",flightDate)],
      table:table
    });
  },

  getAllFlights:async(table)=>{
    return await DbRequest.queryDb({
      table:table,
      whereDeparture:'',
    })
  },

  getUserDetails:async(table)=>{
    return await DbRequest.queryDb({
      table:table,
      whereDeparture: [where("id", "==", sessionStorage.getItem('currentUser'))],
    })
  },
  
  getChartData:async(table)=>{
    return await DbRequest.queryDb({
      orderBy: orderBy("date", "asc"),
      table:table,
      whereDeparture:'',
    })
  }

};

export default homeService;
