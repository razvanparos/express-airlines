import { collection, query, where, getDocs  } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import airports from '../utils/airports.json'

function Home(props) {
    const navigate = useNavigate();
    const [departure, setDeparture]=useState('');
    const [destination, setDestination]=useState('');
    const [numberPassengers, setNumberPassengers]=useState(1);
    const [showDepartureAirportsList, setShowDepartureAirportsList]=useState(false);
    const [showDestinationAirportsList, setShowDestinationAirportsList]=useState(false);
    const [showSelectDepartureDate, setShowSelectDepartureDate]=useState(false);
    const [departuresList, setDeparturesList]=useState([]);
    const [destinationsList, setDestinationsList]=useState([]);


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
      console.log(departure + ' ' + destination)
      const flightsRef = collection(db, "Flights");
          const q = query(flightsRef, where("departure", "==", departure), where("destination","==",destination));
          const querySnapshot = await getDocs(q);
          const filteredData = querySnapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
        }))
        console.log(filteredData)
        // if(filteredData.length>0){
        //   props.fetchFlights(filteredData)
        //   navigate('/explore-results')
        // }else{
        //   console.log('No flights found')
        // }
    }

    const handleDepartureListItemClick=(name)=>{
      setDeparture(name);
      setShowDepartureAirportsList(false)   
    }
    const handleDestinationListItemClick=(name)=>{
      setDestination(name);
      setShowDestinationAirportsList(false)   
    }

    return (
      <main className="flex flex-col items-center min-h-[565px] ">
        <form onSubmit={getFLights} action="" className="flex flex-col px-4 pt-8 w-full bg-darkBlue gap-y-[1px]">
          <input placeholder="Choose departure" type="text" className="rounded-t-xl py-3 px-2" value={departure} onChange={(e)=>{setDeparture(e.target.value)}}/>
          <div className={`${showDepartureAirportsList?'h-[100px] p-2':'h-[0px]'} duration-200 bg-white`}>
            {departuresList.length>0 ? departuresList?.map((item,index)=>{
              return <p className="mb-2" key={index} onClick={()=>{handleDepartureListItemClick(item.name)}}>{`${item.name} (${item.iata_code})`}</p>
            }):<p>No airports found</p>}
          </div>
          <input placeholder="Choose destination" type="text" className="py-3 px-2" value={destination} onChange={(e)=>{setDestination(e.target.value)}}/>
          <div className={`${showDestinationAirportsList?'h-[100px] p-2':'h-[0px]'} duration-200 bg-white`}>
            {destinationsList.length>0 ? destinationsList?.map((item,index)=>{
              return <p className="mb-2" key={index} onClick={()=>{handleDestinationListItemClick(item.name)}}>{`${item.name} (${item.iata_code})`}</p>
            }):<p>No airports found</p>}
          </div>
          <input onBlur={()=>{setShowSelectDepartureDate(false)}} onFocus={()=>{setShowSelectDepartureDate(true)}} placeholder="Departure date" type="text" className="py-3 px-2 mb-[1px]"/>
          <input onBlur={()=>{setShowSelectDepartureDate(false)}} onFocus={()=>{setShowSelectDepartureDate(true)}} placeholder="Return date" type="text" className="py-3 px-2"/>
          <div className={`${showSelectDepartureDate?'h-[100px] p-2':'h-[0px]'} duration-200 bg-white text-black`}>
          
          </div>
          <input type="text" className="rounded-b-xl py-3 px-2" value={`${numberPassengers} Passenger`} onChange={(e)=>{setNumberPassengers(e.target.value)}}/>        
          <button type="submit" className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg">Search</button>

        </form>
      </main>
    );
  }
  
  export default Home;