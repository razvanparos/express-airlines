import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import airports from '../mock-data/airports.json'
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../components/Loader";
import {setFlights} from "../services/flightService";
import { AppContext } from "../context/AppContext";
import LocationPicker from "../components/LocationPicker";
import FlightDatePicker from "../components/FlightDatePicker";
import AdultsNumberPicker from "../components/AdultsNumberPicker";
import HomeArticle from "../components/HomeArticle";

function Home() {
    const navigate = useNavigate();
    const initialHomeState={
      departureAirport:'',
      destinationAirport:'',
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
    const {userDetails} = state;
    const {homeSearch}=state;
    const {departure,destination,adultsNumber,startDate,endDate}=homeSearch;

    useEffect(()=>{
      if(userDetails[0]?.isAdmin===true){
        navigate('/admin-dashboard')
      }
    },[userDetails])

    useEffect(()=>{
      let filteredAirports = airports.filter(airport=>airport.city.toLowerCase().includes(departure.toLowerCase())||airport.name.toLowerCase().includes(departure.toLowerCase()))
      if(filteredAirports.length<4){
        changeHomeStateField('departuresList',filteredAirports)
      }
    },[departure])

    useEffect(()=>{
      let filteredAirports = airports.filter(airport=>airport.city.toLowerCase().includes(destination.toLowerCase())||airport.name.toLowerCase().includes(destination.toLowerCase()))
      if(filteredAirports.length<4){
        changeHomeStateField('destinationsList',filteredAirports)
      }
    },[destination])

    const handleForm = async(e)=>{
      e.preventDefault();
      if(departure!=homeState.departuresList[0]?.name||destination!=homeState.destinationsList[0]?.name){
        changeHomeStateField('searchError','Select airports from the list')
        return
      }else{
        changeHomeStateField('searchError','')
      }
      if(departure&&destination&&startDate&&endDate){
        changeHomeStateField('loading',true)
        changeHomeStateField('searchError','')
        await setFlights(dispatch,departure,destination,startDate,endDate,adultsNumber,homeState.departureAirport,homeState.destinationAirport,navigate)
        changeHomeStateField('loading',false)
      }else{
        changeHomeStateField('searchError','Fields cannot be empty')
      }
    }
    return (
      <div className="flex flex-col items-center relative">
        <h1 className="text-white mt-[20px] sm:text-2xl">Search for flights all over the world</h1>
        <p className="2xl:px-[10%] text-red-500 mt-2 hidden 2xl:block w-full">{homeState.searchError}</p>
        <form onSubmit={handleForm} 
          action="" className="relative flex flex-col px-4 pt-8 w-full bg-darkBlue gap-y-[1px] lg:px-[10%] 2xl:pb-[80px] 2xl:grid 2xl:grid-cols-8">
          <LocationPicker type={'departure'} changeHomeStateField={changeHomeStateField} departuresList={homeState.departuresList}/>
          <LocationPicker type={'destination'} changeHomeStateField={changeHomeStateField} destinationsList={homeState.destinationsList}/>
          <FlightDatePicker startDate={startDate} type={'departure'}/>
          <FlightDatePicker startDate={startDate} endDate={endDate} type={'destination'}/>
          <AdultsNumberPicker/>
          <p className="text-red-500 mt-2 2xl:hidden">{homeState.searchError}</p>
          <button type="submit" className=" bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{homeState.loading?<Loader/>:'Search'}</button>
        </form>
        <HomeArticle/>
      </div>
    );
  }
  export default Home;