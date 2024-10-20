import DbRequest from './dbRequestService';
import { where,orderBy  } from "firebase/firestore";


const homeService = {
  getFlights: async(departure, destination, adultsNumber, startDate, endDate) => {

    return await DbRequest.queryDb({
      orderBy: orderBy("pricePerSeat","asc"),
      whereDeparture: [where("departure", "==", departure), where("destination","==",destination),where("flightDate","==",startDate),where("freeSeats",">=",adultsNumber)],
      whereDestination: [where("departure", "==", destination), where("destination","==",departure),where("flightDate","==",endDate),where("freeSeats",">=",adultsNumber)],
    });
  },

};

export default homeService;
