import { collection, query, where, getDocs,orderBy  } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import airports from '../utils/airports.json'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../components/Loader";
import exploreDestinations from '../assets/explore-destinations.webp'
import { createFlights } from "../services/createFlights";


function Home(props) {
    const navigate = useNavigate();
    const [departure, setDeparture]=useState('');
    const [departureAirport, setDepartureAirport]=useState('');
    const [destinationAirport, setDestinationAirport]=useState('');
    const [destination, setDestination]=useState('');
    const [adultsNumber, setAdultsNumber]=useState(1);
    const [showDepartureAirportsList, setShowDepartureAirportsList]=useState(false);
    const [showDestinationAirportsList, setShowDestinationAirportsList]=useState(false);
    const [departuresList, setDeparturesList]=useState([]);
    const [destinationsList, setDestinationsList]=useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');

    useEffect(()=>{
      let filteredAirports = airports.filter(airport=>airport.name.toLowerCase().includes(departure.toLowerCase()))
      if(departure.localeCompare(departuresList[0]?.name)===0){
        setShowDepartureAirportsList(false)
      }
      else if(filteredAirports.length<4){
        setShowDepartureAirportsList(true)
        setDeparturesList(filteredAirports)
      }else {
        setShowDepartureAirportsList(false)
      }
    },[departure])

    useEffect(()=>{
      let filteredAirports = airports.filter(airport=>airport.name.toLowerCase().includes(destination.toLowerCase()))
      if(destination.localeCompare(destinationsList[0]?.name)===0){
        setShowDestinationAirportsList(false)
      }
      else if(filteredAirports.length<4){
        setShowDestinationAirportsList(true)
        setDestinationsList(filteredAirports)
      }else{
        setShowDestinationAirportsList(false)
      }
    },[destination])

    const formatDateToISO = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0'); 
      return `${month}/${day}/${year}`; 
    };

    const getFLights=async(e)=>{
      e.preventDefault();
      if(showDepartureAirportsList||showDestinationAirportsList){
        setSearchError('Select airports from the list')
        return
      }else{
        setSearchError('')
      }
      if(departure&&destination&&startDate&&endDate){
        setSearchError('')
        setLoading(true)
        const flightsRef = collection(db, "Flights");
        const departureFlight = query(flightsRef, orderBy("pricePerSeat","asc"), where("departure", "==", departure), where("destination","==",destination),where("flightDate","==",formatDateToISO(startDate)),where("freeSeats",">=",adultsNumber));
        const returnFlight = query(flightsRef,orderBy("pricePerSeat","asc"), where("destination", "==", departure), where("departure","==",destination),where("flightDate","==",formatDateToISO(endDate)),where("freeSeats",">=",adultsNumber));
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
        if(departureData.length>0&&returnData.length>0){
          props.fetchFlights(departureData,returnData,adultsNumber,departureAirport,destinationAirport,formatDateToISO(startDate),formatDateToISO(endDate))
          navigate('/explore-results')
        }else{
          createFlights(departure,destination,formatDateToISO(startDate),formatDateToISO(endDate));
          getFLights(e);
        }
      }else{
        setSearchError('Fields cannot be empty')
      }
      
      
      setLoading(false)
    }

    const handleDepartureListItemClick=(item)=>{
      setDeparture(item.name);
      setDepartureAirport(item);
      setShowDepartureAirportsList(false)   
    }
    const handleDestinationListItemClick=(item)=>{
      setDestination(item.name);
      setDestinationAirport(item)
      setShowDestinationAirportsList(false)   
    }

    useEffect(()=>{
      if(adultsNumber<1){
        setAdultsNumber(1)
      }
      if(adultsNumber>8){
        setAdultsNumber(8)
      }
    },[adultsNumber])

    return (
      <div className="flex flex-col items-center min-h-[565px] ">
        <form onSubmit={getFLights} action="" className="flex flex-col px-4 pt-8 w-full bg-darkBlue gap-y-[1px]">
          <input placeholder="Choose departure airport" type="text" className="rounded-t-xl py-3 px-2 text-xl" value={departure} onChange={(e)=>{setDeparture(e.target.value)}}/>
          <div className={`${showDepartureAirportsList?'h-[100px] p-2':'h-[0px]'} duration-200 bg-white`}>
            {departuresList.length>0 ? departuresList?.map((item,index)=>{
              return <p className="mb-2" key={index} onClick={()=>{handleDepartureListItemClick(item)}}>{`${item.name} (${item.iata_code})`}</p>
            }):<p>No airports found</p>}
          </div>
          <input placeholder="Choose destination airport" type="text" className="py-3 px-2 text-xl" value={destination} onChange={(e)=>{setDestination(e.target.value)}}/>
          <div className={`${showDestinationAirportsList?'h-[100px] p-2':'h-[0px]'} duration-200 bg-white`}>
            {destinationsList.length>0 ? destinationsList?.map((item,index)=>{
              return <p className="mb-2" key={index} onClick={()=>{handleDestinationListItemClick(item)}}>{`${item.name} (${item.iata_code})`}</p>
            }):<p>No airports found</p>}
          </div>
          <DatePicker className="py-3 px-2 mb-[1px] w-full text-xl" minDate={new Date()} placeholderText="Departure date" selected={startDate} onChange={(date) => setStartDate(date)} />
          <DatePicker className="py-3 px-2 mb-[1px] w-full text-xl bg-white" minDate={startDate} disabled={startDate?false:true} placeholderText="Return date" selected={endDate} onChange={(date) => setEndDate(date)} />
          <div className={`rounded-b-xl py-3 px-2 bg-white flex items-center gap-x-3`}>
            <p className='text-xl'>{`${adultsNumber} ${adultsNumber>1?'Adults':'Adult'}`}</p>
            <button type="button" onClick={()=>{setAdultsNumber(adultsNumber-1)}} className="text-white bg-primaryBlue rounded-md h-[28px] w-[28px] flex items-center justify-center font-bold">-</button>
            <button type="button" onClick={()=>{setAdultsNumber(adultsNumber+1)}} className="text-white bg-primaryBlue rounded-md h-[28px] w-[28px] flex items-center justify-center font-bold">+</button>
          </div>
          <p className="text-red-500 mt-2">{searchError}</p>
          <button type="submit" className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg">{loading?<Loader/>:'Search'}</button>
        </form>

        <article className="flex flex-col items-center my-2 p-4 bg-white">
          <div className="w-full font-semibold text-xl">
            <h2 className="text-gray-500">Can't decide where to go?</h2>
            <p className="text-primaryBlue">Explore destinations all over the world!</p>
          </div>
            <img src={exploreDestinations} alt="" className="rounded-lg"/>
        </article>
      
      </div>
    );
  }
  
  export default Home;