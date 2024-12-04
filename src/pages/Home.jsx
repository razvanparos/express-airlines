import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import airports from '../mock-data/airports.json'
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../components/Loader";
import {setFlights} from "../services/flightService";
import { AppContext } from "../context/AppContext";
import LocationPicker from "../components/LocationPicker";
import FlightDatePicker from "../components/DatePicker";
import AdultsNumberPicker from "../components/AdultsNumberPicker";
import HomeArticle from "../components/HomeArticle";

function Home() {
    const navigate = useNavigate();
    const [departureAirport, setDepartureAirport]=useState('');
    const [destinationAirport, setDestinationAirport]=useState('');
    const [showDepartureAirportsList, setShowDepartureAirportsList]=useState(false);
    const [showDepartureAirportsListDesktop, setShowDepartureAirportsListDesktop]=useState(false);
    const [showDestinationAirportsList, setShowDestinationAirportsList]=useState(false);
    const [showDestinationAirportsListDesktop, setShowDestinationAirportsListDesktop]=useState(false);
    const [departuresList, setDeparturesList]=useState([]);
    const [destinationsList, setDestinationsList]=useState([]);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const {state,dispatch} = useContext(AppContext);
    const {homeSearch}=state;
    const {departure,destination,adultsNumber,startDate,endDate}=homeSearch;

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

    const handleForm = (e)=>{
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
        setFlights(dispatch,departure,destination,startDate,endDate,setLoading,adultsNumber,departureAirport,destinationAirport,navigate)
      }else{
        setSearchError('Fields cannot be empty')
      }
    }
    return (
      <div className="flex flex-col items-center relative">
        <h1 className="text-white mt-[20px] sm:text-2xl">Search for flights all over the world</h1>
        <form onSubmit={handleForm} 
          action="" className="relative flex flex-col px-4 pt-8 w-full bg-darkBlue gap-y-[1px] lg:px-[10%] 2xl:pb-[80px] 2xl:grid 2xl:grid-cols-8">
          <LocationPicker type={'departure'} setDepartureAirport={setDepartureAirport} departuresList={departuresList} showDepartureAirportsList={showDepartureAirportsList} showDepartureAirportsListDesktop={showDepartureAirportsListDesktop}/>
          <LocationPicker type={'destination'} setDestinationAirport={setDestinationAirport} destinationsList={destinationsList} showDestinationAirportsList={showDestinationAirportsList} showDestinationAirportsListDesktop={showDestinationAirportsListDesktop}/>
          <FlightDatePicker startDate={startDate} type={'departure'}/>
          <FlightDatePicker startDate={startDate} endDate={endDate} type={'destination'}/>
          <AdultsNumberPicker/>
          <p className="text-red-500 mt-2 2xl:hidden">{searchError}</p>
          <button type="submit" className=" bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{loading?<Loader/>:'Search'}</button>
          <p className="text-red-500 mt-2 hidden 2xl:block w-full">{searchError}</p>
        </form>
        <HomeArticle/>
      </div>
    );
  }
  export default Home;