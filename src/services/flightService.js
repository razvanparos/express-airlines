import { where, arrayUnion, orderBy } from "firebase/firestore"; 
import DbRequest from './dbRequestService';
import { formatDateToISO } from "../common/utils";
import { distanceCalculator } from "./distanceCalculator/distanceCalculator";

export const bookFlight = async (booking) => {
    try {
        let querySnapshot = await DbRequest.queryDb({
            table:'UsersDetails',
            whereCondition: [where("id", "==", sessionStorage.getItem('currentUser'))],
        })
        if (!querySnapshot.empty) {
            DbRequest.updateDb(querySnapshot[0].id,"UsersDetails",{
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
    DbRequest.setDb(newId1,"Flights",{
            departure: departure,
            destination: destination,
            flightDate: startDate,
            freeSeats: emptySeats.length,
            id: newId1,
            landing: "16:00",
            takeOff:"13:00",
            pricePerSeat: price,
            seats:emptySeats 
    })
    DbRequest.setDb(newId2,"Flights",{
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
    DbRequest.setDb(newId,"Flights", {
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

  export const updateDbSeats = async (booking) => {
    try {
        let response = await DbRequest.queryDbData({
            whereCondition: [where("id", "==", booking.departureFlight.id)],
            whereCondition2: [where("id", "==", booking.returnFlight.id)],
            table: "Flights"
        })
        if (!response[0].empty) {
            const flight1Doc = response[0].docs[0];
            const flight1Data = flight1Doc.data();
            let flight1Seats = flight1Data.seats;
            for(let i=0;i<=flight1Seats.length;i++){
                if(booking.selectedDepartureSeats.includes(flight1Seats[i]?.seatNumber)){
                    flight1Seats[i].occupied=true;
                }
            }
            DbRequest.updateDb(booking.departureFlight.id,"Flights",{
                freeSeats: flight1Data.freeSeats-booking.adultsNumber,
                seats: flight1Seats
            });
        } else {
            console.error("No user found with the specified ID.");
        }
        if (!response[1].empty) {
            const flight2Doc = response[1].docs[0];
            const flight2Data = flight2Doc.data();
            let flight2Seats = flight2Data.seats;
            for(let i=0;i<=flight2Seats.length;i++){
                if(booking.selectedReturnSeats.includes(flight2Seats[i]?.seatNumber)){
                    flight2Seats[i].occupied=true;
                }
            }
            DbRequest.updateDb(booking.returnFlight.id,"Flights",{
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
      whereCondition: [where("departure", "==", departure), where("destination","==",destination),where("flightDate","==",startDate),where("freeSeats",">=",adultsNumber)],
      whereCondition2: [where("departure", "==", destination), where("destination","==",departure),where("flightDate","==",endDate),where("freeSeats",">=",adultsNumber)],
      table: table
    });
  }

  export const  getFlightsAdmin= async(departure, destination, flightDate,table) => {
    return await DbRequest.queryDb({
        whereCondition: [where("departure", "==", departure), where("destination","==",destination),where("flightDate","==",flightDate)],
        table:table
    });
  }

  export const getAllFlights=async(table)=>{
    return await DbRequest.queryDb({
      table:table,
      whereCondition:'',
    })
  }

  export const setFlights=async(dispatch,departure,destination,startDate,endDate,setLoading,adultsNumber,departureAirport,destinationAirport,navigate)=>{
      let queryResponse = await getFlights(departure,destination,adultsNumber,formatDateToISO(startDate),formatDateToISO(endDate),'Flights');
      if(queryResponse[0].length>0&&queryResponse[1].length>0){
        dispatch({
          type: "SET_FLIGHTS",
          payload: {
            flights: {
              departureFlights:queryResponse[0],
              returnFlights:queryResponse[1],
              departureAirport:departureAirport,
              adultsNumber:adultsNumber,
              destinationAirport:destinationAirport,
              departureDate:formatDateToISO(startDate),
              returnDate:formatDateToISO(endDate)
            },
          },
        });
        navigate('/explore-results')
        dispatch({
          type: "SET_HOMESEARCH",
          payload: {
            homeSearch: {
              departure:'',
              destination:'',
              adultsNumber:1,
              startDate:'',
              endDate:''
            },
          },
        });
      }else{
        let dist = distanceCalculator(departureAirport._geoloc.lat,departureAirport._geoloc.lng,destinationAirport._geoloc.lat,destinationAirport._geoloc.lng);
        await createFlights(departure,destination,formatDateToISO(startDate),formatDateToISO(endDate),dist);
        setFlights(dispatch,departure,destination,startDate,endDate,setLoading,adultsNumber,departureAirport,destinationAirport,navigate);
      }
    setLoading(false)
  }