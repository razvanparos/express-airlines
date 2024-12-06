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
    const initialHomeState={
      departureAirport:'',
      destinationAirport:'',
      showDepartureAirportsList:false,
      showDepartureAirportsListDesktop:false,
      showDestinationAirportsList:false,
      showDestinationAirportsListDesktop:false,
      departuresList:[],
      destinationsList:[],
      loading:false,
      searchError:'',
    }

    const [homeState,setHomeState] = useState(initialHomeState)
    
    const changeHomeStateField = (fieldname,value)=>{
      setHomeState((prevState) => ({
        ...prevState,
        [fieldname]: value,
      }));
    }

    const {state,dispatch} = useContext(AppContext);
    const {homeSearch}=state;
    const {departure,destination,adultsNumber,startDate,endDate}=homeSearch;

    useEffect(()=>{
      let filteredAirports = airports.filter(airport=>airport.city.toLowerCase().includes(departure.toLowerCase())||airport.name.toLowerCase().includes(departure.toLowerCase()))
      if(departure.localeCompare(homeState.departuresList[0]?.name)===0){
        changeHomeStateField('showDepartureAirportsList',false)
        changeHomeStateField('showDepartureAirportsListDesktop',false)
      }
      else if(filteredAirports.length<4){
        changeHomeStateField('showDepartureAirportsList',true)
        changeHomeStateField('showDepartureAirportsListDesktop',true)
        changeHomeStateField('departuresList',filteredAirports)
      }else {
        changeHomeStateField('showDepartureAirportsList',false)
        changeHomeStateField('showDepartureAirportsListDesktop',false)
      }
    },[departure])

    useEffect(()=>{
      let filteredAirports = airports.filter(airport=>airport.city.toLowerCase().includes(destination.toLowerCase())||airport.name.toLowerCase().includes(destination.toLowerCase()))
      if(destination.localeCompare(homeState.destinationsList[0]?.name)===0){
        changeHomeStateField('showDestinationAirportsList',false)
        changeHomeStateField('showDestinationAirportsListDesktop',false)
      }
      else if(filteredAirports.length<4){
        changeHomeStateField('showDestinationAirportsList',true)
        changeHomeStateField('showDestinationAirportsListDesktop',true)
        changeHomeStateField('destinationsList',filteredAirports)
      }else{
        changeHomeStateField('showDestinationAirportsList',false)
        changeHomeStateField('showDestinationAirportsListDesktop',false)
      }
    },[destination])

    const handleForm = (e)=>{
      e.preventDefault();
      if(homeState.showDepartureAirportsList||homeState.showDestinationAirportsList){
        changeHomeStateField('searchError','Select airports from the list')
        return
      }else{
        changeHomeStateField('searchError','')
      }
      if(departure&&destination&&startDate&&endDate){
        changeHomeStateField('searchError','')
        changeHomeStateField('loading',true)
        setFlights(dispatch,departure,destination,startDate,endDate,adultsNumber,homeState.departureAirport,homeState.destinationAirport,navigate)
        changeHomeStateField('loading',false)
      }else{
        changeHomeStateField('searchError','Fields cannot be empty')
      }
    }
    return (
      <div className="flex flex-col items-center relative">
        <h1 className="text-white mt-[20px] sm:text-2xl">Search for flights all over the world</h1>
        <form onSubmit={handleForm} 
          action="" className="relative flex flex-col px-4 pt-8 w-full bg-darkBlue gap-y-[1px] lg:px-[10%] 2xl:pb-[80px] 2xl:grid 2xl:grid-cols-8">
          <LocationPicker type={'departure'} changeHomeStateField={changeHomeStateField} departuresList={homeState.departuresList} showDepartureAirportsList={homeState.showDepartureAirportsList} showDepartureAirportsListDesktop={homeState.showDepartureAirportsListDesktop}/>
          <LocationPicker type={'destination'} changeHomeStateField={changeHomeStateField} destinationsList={homeState.destinationsList} showDestinationAirportsList={homeState.showDestinationAirportsList} showDestinationAirportsListDesktop={homeState.showDestinationAirportsListDesktop}/>
          <FlightDatePicker startDate={startDate} type={'departure'}/>
          <FlightDatePicker startDate={startDate} endDate={endDate} type={'destination'}/>
          <AdultsNumberPicker/>
          <p className="text-red-500 mt-2 2xl:hidden">{homeState.searchError}</p>
          <button type="submit" className=" bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{homeState.loading?<Loader/>:'Search'}</button>
          <p className="text-red-500 mt-2 hidden 2xl:block w-full">{homeState.searchError}</p>
        </form>
        <HomeArticle/>
      </div>
    );
  }
  export default Home;