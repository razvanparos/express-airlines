import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import airports from '../mock-data/airports.json'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../components/Loader";
import exploreDestinations from '../assets/explore-destinations.webp'
import beachImg from '../assets/beach-img.jpg'
import { createFlights } from "../services/flightService";
import { distanceCalculator } from "../services/distanceCalculator/distanceCalculator";
import {getFlights} from "../services/flightService";
import { AppContext } from "../context/AppContext";

function Home() {
    const navigate = useNavigate();
    const [departure, setDeparture]=useState('');
    const [departureAirport, setDepartureAirport]=useState('');
    const [destinationAirport, setDestinationAirport]=useState('');
    const [destination, setDestination]=useState('');
    const [adultsNumber, setAdultsNumber]=useState(1);
    const [showDepartureAirportsList, setShowDepartureAirportsList]=useState(false);
    const [showDepartureAirportsListDesktop, setShowDepartureAirportsListDesktop]=useState(false);
    const [showDestinationAirportsList, setShowDestinationAirportsList]=useState(false);
    const [showDestinationAirportsListDesktop, setShowDestinationAirportsListDesktop]=useState(false);
    const [departuresList, setDeparturesList]=useState([]);
    const [destinationsList, setDestinationsList]=useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');

    const {fetchFlights} = useContext(AppContext);

    useEffect(()=>{
      let filteredAirports = airports.filter(airport=>airport.city.toLowerCase().includes(departure.toLowerCase())||airport.name.toLowerCase().includes(departure.toLowerCase()))
      if(departure.localeCompare(departuresList[0]?.name)===0){
        setShowDepartureAirportsList(false)
        setShowDepartureAirportsListDesktop(false)
      }
      else if(filteredAirports.length<4){
        setShowDepartureAirportsList(true)
        setShowDepartureAirportsListDesktop(true)
        setDeparturesList(filteredAirports)
      }else {
        setShowDepartureAirportsList(false)
        setShowDepartureAirportsListDesktop(false)
      }
    },[departure])

    useEffect(()=>{
      let filteredAirports = airports.filter(airport=>airport.city.toLowerCase().includes(destination.toLowerCase())||airport.name.toLowerCase().includes(destination.toLowerCase()))
      if(destination.localeCompare(destinationsList[0]?.name)===0){
        setShowDestinationAirportsList(false)
        setShowDestinationAirportsListDesktop(false)
      }
      else if(filteredAirports.length<4){
        setShowDestinationAirportsList(true)
        setShowDestinationAirportsListDesktop(true)
        setDestinationsList(filteredAirports)
      }else{
        setShowDestinationAirportsList(false)
        setShowDestinationAirportsListDesktop(false)
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
        let queryResponse = await getFlights(departure,destination,adultsNumber,formatDateToISO(startDate),formatDateToISO(endDate),'Flights');
        if(queryResponse[0].length>0&&queryResponse[1].length>0){
          fetchFlights(queryResponse[0],queryResponse[1],adultsNumber,departureAirport,destinationAirport,formatDateToISO(startDate),formatDateToISO(endDate))
          navigate('/explore-results')
        }else{
          let dist = distanceCalculator(departureAirport._geoloc.lat,departureAirport._geoloc.lng,destinationAirport._geoloc.lat,destinationAirport._geoloc.lng);
          await createFlights(departure,destination,formatDateToISO(startDate),formatDateToISO(endDate),dist);
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
      <div className="flex flex-col items-center relative">
        <h1 className="text-white mt-[20px] sm:text-2xl">Search for flights all over the world</h1>
        <form onSubmit={getFLights} action="" className="relative flex flex-col px-4 pt-8 w-full bg-darkBlue gap-y-[1px] lg:px-[10%] 2xl:pb-[80px] 2xl:grid 2xl:grid-cols-8">
          <div className="relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]">
            <input placeholder="Choose departure airport" type="text" className="2xl:border-r-2 rounded-t-xl py-3 px-4 text-xl w-full 2xl:rounded-bl-lg 2xl:rounded-tr-none 2xl:h-[80px]" value={departure} onChange={(e)=>{setDeparture(e.target.value)}}/>
            <div className={`${showDepartureAirportsList?'h-fit p-2 2xl:hidden':'h-[0px] 2xl:w-0 2xl:hidden overflow-hidden'} duration-200 bg-white`}>
              {departuresList.length>0 ? departuresList?.map((item,index)=>{
                return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>{handleDepartureListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}</p>
              }):<p>No airports found</p>}
            </div>
            <div className={`${showDepartureAirportsListDesktop?'h-[120px] hidden 2xl:block shadow-2xl p-3 mt-2 rounded-xl':'h-[0px] hidden'} duration-200 bg-white absolute top-[100%] h-fit`}>
              {departuresList.length>0 ? departuresList?.map((item,index)=>{
                return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>{handleDepartureListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}</p>
              }):<p>No airports found</p>}
            </div>
          </div>
          <div className="relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]">
              <input placeholder="Choose destination airport" type="text" className="2xl:border-r-2 h-full py-3 px-4 text-xl w-full" value={destination} onChange={(e)=>{setDestination(e.target.value)}}/>
              <div className={`${showDestinationAirportsList?'h-fit p-2 2xl:hidden':'h-[0px] 2xl:hidden overflow-hidden'} duration-200 bg-white`}>
                {destinationsList.length>0 ? destinationsList?.map((item,index)=>{
                  return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>{handleDestinationListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}</p>
                }):<p>No airports found</p>}
              </div>
              <div className={`${showDestinationAirportsListDesktop?'h-[120px] hidden 2xl:block w-full shadow-2xl p-3 mt-2 rounded-xl visible':'h-[0px] hidden'} duration-200 bg-white absolute top-[100%] h-fit`}>
                {destinationsList.length>0 ? destinationsList?.map((item,index)=>{
                  return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>{handleDestinationListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}</p>
                }):<p>No airports found</p>}
              </div>
          </div>
        
          <DatePicker className="2xl:border-r-2 py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-xl 2xl:h-[80px]" minDate={new Date()} placeholderText="Departure date" selected={startDate} onChange={(date) => setStartDate(date)} />
          <DatePicker className="2xl:border-r-2 py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-xl bg-white 2xl:h-[80px]" minDate={startDate} disabled={startDate?false:true} placeholderText="Return date" selected={endDate} onChange={(date) => setEndDate(date)} />
          <div className={`rounded-b-xl 2xl:rounded-none py-3 px-4 bg-white flex items-center gap-x-3 w-full`}>
            <p className='text-xl'>{`${adultsNumber} ${adultsNumber>1?'Adults':'Adult'}`}</p>
            <button type="button" onClick={()=>{setAdultsNumber(adultsNumber-1)}} className="text-white bg-primaryBlue rounded-md h-[28px] w-[28px] flex items-center justify-center font-bold">-</button>
            <button type="button" onClick={()=>{setAdultsNumber(adultsNumber+1)}} className="text-white bg-primaryBlue rounded-md h-[28px] w-[28px] flex items-center justify-center font-bold">+</button>
          </div>
          <p className="text-red-500 mt-2 2xl:hidden">{searchError}</p>
          <button type="submit" className=" bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{loading?<Loader/>:'Search'}</button>
          <p className="text-red-500 mt-2 hidden 2xl:block w-full">{searchError}</p>
        </form>

        <article className="flex flex-col items-start my-2 p-4 2xl:py-16 bg-white w-full h-fit lg:px-[10%]">
          <div className="w-full font-semibold text-xl">
            <h2 className="text-gray-500">Can't decide where to go?</h2>
            <p className="text-primaryBlue md:text-3xl">Travel to any destination around the globe with Airline Express!</p>
          </div>
          <div className="flex flex-col justify-between gap-[12px] h-fit md:flex-row md:max-h-[400px]">
            <img src={beachImg} alt="" className="rounded-lg md:w-[50%]  object-cover object-bottom"/>
            <img src={exploreDestinations} alt="" className="rounded-lg md:w-[50%] object-cover object-bottom"/>
          </div>
            
        </article>
      
      </div>
    );
  }
  
  export default Home;