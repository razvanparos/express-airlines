import { collection, query, where, getDocs  } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import airports from '../utils/airports.json'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../components/Loader";


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

    const getFLights=async(e)=>{
      e.preventDefault();
      setLoading(true)
      const flightsRef = collection(db, "Flights");
          const departureFlight = query(flightsRef, where("departure", "==", departure), where("destination","==",destination),where("flightDate","==",new Date(startDate).toLocaleDateString()));
          const returnFlight = query(flightsRef, where("destination", "==", departure), where("departure","==",destination),where("flightDate","==",new Date(endDate).toLocaleDateString()));
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
        console.log(departureData,returnData,departureAirport,destinationAirport)
        if(departureData.length>0&&returnData.length>0){
          props.fetchFlights(departureData,returnData,adultsNumber,departureAirport,destinationAirport)
          navigate('/explore-results')
        }else{
          console.log('No flights found')
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
      <main className="flex flex-col items-center min-h-[565px] ">
        <form onSubmit={getFLights} action="" className="flex flex-col px-4 pt-8 w-full bg-darkBlue gap-y-[1px]">
          <input placeholder="Choose departure" type="text" className="rounded-t-xl py-3 px-2" value={departure} onChange={(e)=>{setDeparture(e.target.value)}}/>
          <div className={`${showDepartureAirportsList?'h-[100px] p-2':'h-[0px]'} duration-200 bg-white`}>
            {departuresList.length>0 ? departuresList?.map((item,index)=>{
              return <p className="mb-2" key={index} onClick={()=>{handleDepartureListItemClick(item)}}>{`${item.name} (${item.iata_code})`}</p>
            }):<p>No airports found</p>}
          </div>
          <input placeholder="Choose destination" type="text" className="py-3 px-2" value={destination} onChange={(e)=>{setDestination(e.target.value)}}/>
          <div className={`${showDestinationAirportsList?'h-[100px] p-2':'h-[0px]'} duration-200 bg-white`}>
            {destinationsList.length>0 ? destinationsList?.map((item,index)=>{
              return <p className="mb-2" key={index} onClick={()=>{handleDestinationListItemClick(item)}}>{`${item.name} (${item.iata_code})`}</p>
            }):<p>No airports found</p>}
          </div>
          <DatePicker className="py-3 px-2 mb-[1px] w-full" minDate={new Date()} placeholderText="Departure date" selected={startDate} onChange={(date) => setStartDate(date)} />
          <DatePicker className="py-3 px-2 mb-[1px] w-full bg-white" minDate={startDate} disabled={startDate?false:true} placeholderText="Return date" selected={endDate} onChange={(date) => setEndDate(date)} />
          <div className={`rounded-b-xl py-3 px-2 bg-white flex items-center gap-x-3`}>
            <p>{`${adultsNumber} ${adultsNumber>1?'Adults':'Adult'}`}</p>
            <button type="button" onClick={()=>{setAdultsNumber(adultsNumber-1)}} className="text-white bg-primaryBlue rounded-md h-[24px] w-[24px] flex items-center justify-center font-bold">-</button>
            <button type="button" onClick={()=>{setAdultsNumber(adultsNumber+1)}} className="text-white bg-primaryBlue rounded-md h-[24px] w-[24px] flex items-center justify-center font-bold">+</button>
          </div>
          <button type="submit" className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg">{loading?<Loader/>:'Search'}</button>
        </form>
      </main>
    );
  }
  
  export default Home;