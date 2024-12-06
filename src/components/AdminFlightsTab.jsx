import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import airports from '../mock-data/airports.json'
import {getFlightsAdmin} from "../services/flightService";
import React from 'react';
import { createFlightsAdmin } from "../services/flightService";
import AdminFlightCard from "./AdminFlightCard";
import { formatDateToISO } from "../common/utils";
import { formatDate } from "../common/utils";
import LocationPicker from "./LocationPicker";
import { AppContext } from "../context/AppContext";

function FlightsTab() {
    const {state}=useContext(AppContext)
    const {homeSearch}=state
    const {departure,destination}=homeSearch
    const initialFlightsTabState={
      showDepartureAirportsList:false,
      showDepartureAirportsListDesktop:false,
      showDestinationAirportsList:false,
      showDestinationAirportsListDesktop:false,
      departuresList:[],
      destinationsList:[],
      flightDate:formatDate(new Date()),
      minDate:formatDate(new Date()),
      loading:false,
      loadingAdd:false,
      searchError:'',
      addError:'',
      noFlightsFound:'',
      adminFlights:[],
      editFlight:'',
      addFlightTab:false
    }
    const [flightsTabState,setFlightsTabState] = useState(initialFlightsTabState)

    const changeFlightsTabState = (fieldname,value)=>{
      setFlightsTabState((prevState) => ({
        ...prevState,
        [fieldname]: value,
      }));
    }

    useEffect(()=>{
        let filteredAirports = airports.filter(airport=>airport.city.toLowerCase().includes(departure.toLowerCase())||airport.name.toLowerCase().includes(departure.toLowerCase()))
        if(departure.localeCompare(flightsTabState.departuresList[0]?.name)===0){
          changeFlightsTabState('showDepartureAirportsList',false)
          changeFlightsTabState('showDepartureAirportsListDesktop',false)
        }
        else if(filteredAirports.length<4){
          changeFlightsTabState('showDepartureAirportsList',true)
          changeFlightsTabState('showDepartureAirportsListDesktop',true)
          changeFlightsTabState('departuresList',filteredAirports)
        }else {
          changeFlightsTabState('showDepartureAirportsList',false)
          changeFlightsTabState('showDepartureAirportsListDesktop',false)
        }
      },[departure])
  
      useEffect(()=>{
        let filteredAirports = airports.filter(airport=>airport.city.toLowerCase().includes(destination.toLowerCase())||airport.name.toLowerCase().includes(destination.toLowerCase()))
        if(destination.localeCompare(flightsTabState.destinationsList[0]?.name)===0){
          changeFlightsTabState('showDestinationAirportsList',false)
          changeFlightsTabState('showDestinationAirportsListDesktop',false)
        }
        else if(filteredAirports.length<4){
          changeFlightsTabState('showDestinationAirportsList',true)
          changeFlightsTabState('showDestinationAirportsListDesktop',true)
          changeFlightsTabState('destinationsList',filteredAirports)
        }else{
          changeFlightsTabState('showDestinationAirportsList',false)
          changeFlightsTabState('showDestinationAirportsListDesktop',false)
        }
      },[destination])
  
    const getFLights=async(e)=>{
        e.preventDefault();
        changeFlightsTabState('addFlightTab',false)
        if(flightsTabState.showDepartureAirportsList||flightsTabState.showDestinationAirportsList){
            changeFlightsTabState('searchError','Select airports from the list')
            return
        }else{
          changeFlightsTabState('searchError','')
        }
        if(departure&&destination&&flightsTabState.flightDate){
            changeFlightsTabState('searchError','')
            changeFlightsTabState('loading',true)
            let queryResponse = await getFlightsAdmin(departure,destination,formatDateToISO(flightsTabState.flightDate),"Flights");
            console.log(queryResponse)
            if(queryResponse.length<1){
              changeFlightsTabState('noFlightsFound','No flights found')
            }else {
              changeFlightsTabState('noFlightsFound','')
            }
            changeFlightsTabState('adminFlights',queryResponse)
        }else{
            changeFlightsTabState('searchError','Fields cannot be empty')
        }
        changeFlightsTabState('loading',false)
    }
    const addFlightFunction=async(e)=>{
        e.preventDefault();
        changeFlightsTabState('loadingAdd',true)
        const flightData = {
          departure: document.getElementById("departureAirport").value,
          destination: document.getElementById("destinationAirport").value,
          date: formatDateToISO(document.getElementById("date").value),
          takeoff: document.getElementById("departureTime").value,
          landing: document.getElementById("arrivalTime").value,
          pricePerSeat: document.getElementById("pricePerSeat").value,
        };
        const hasEmptyValue = Object.values(flightData).some(value => !value);
        if(!hasEmptyValue){
          changeFlightsTabState('addError','')
          await createFlightsAdmin(flightData);
          changeFlightsTabState('addFlightTab',false)
        }else{
          changeFlightsTabState('addError','Empty fields')
        }    
        changeFlightsTabState('loadingAdd',false)
    }
    return (
    <section className="flex flex-col gap-y-[20px]">
      <form onSubmit={getFLights} action="" className="flex flex-col px-4 lg:px-0 pt-8 w-full 2xl:grid 2xl:grid-cols-5">
          <LocationPicker type={'departure'} style={'admin'} departuresList={flightsTabState.departuresList} showDepartureAirportsList={flightsTabState.showDepartureAirportsList} showDepartureAirportsListDesktop={flightsTabState.showDepartureAirportsListDesktop}/>
          <LocationPicker type={'destination'} style={'admin'} destinationsList={flightsTabState.destinationsList} showDestinationAirportsList={flightsTabState.showDestinationAirportsList} showDestinationAirportsListDesktop={flightsTabState.showDestinationAirportsListDesktop}/>
          <input type="date" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-xl 2xl:h-[80px]" value={flightsTabState.flightDate} onChange={(e)=>{ changeFlightsTabState('flightDate',e.target.value)}}/>
          <p className="text-red-500 mt-2 2xl:hidden">{flightsTabState.searchError}</p>
          <button type="submit" className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{flightsTabState.loading?<Loader/>:'Search'}</button>
          <p className="text-red-500 mt-2 hidden 2xl:block w-full">{flightsTabState.searchError}</p>
      </form>
        <div className="px-4 lg:px-0">
          <button onClick={()=>{changeFlightsTabState('addFlightTab',true)}} className=" w-full bg-primaryBlue md:w-fit text-white rounded-lg p-2 px-8">Add new flight</button>
        </div>
        {!flightsTabState.addFlightTab?
        <section className="p-4 lg:px-[0]">
          <div className="flex flex-col gap-y-4">
            {flightsTabState.adminFlights?.map((f,i)=>{
              return <AdminFlightCard key={i}
              flight={f}
              editFlight={flightsTabState.editFlight}
              departure={departure}
              destination={destination}
              flightDate={formatDateToISO(flightsTabState.flightDate)}
              changeFlightsTabState={changeFlightsTabState}
              />
            })}
          </div>
          <p className="text-red-500">{flightsTabState.noFlightsFound}</p>
        </section>
        :
        <form onSubmit={addFlightFunction} id="addForm" action="" className="flex flex-col px-4 lg:px-0 w-full 2xl:grid 2xl:grid-cols-10">
          <div className="relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]">
            <input id="departureAirport" placeholder="Departure airport" type="text" className=" border-2 border-primaryBlue rounded-t-xl py-3 px-4 text-md w-full 2xl:rounded-bl-lg 2xl:rounded-tr-none 2xl:h-[80px]" />
          </div>
          <div className="relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]">
              <input id="destinationAirport" placeholder="Destination airport" type="text" className="border-2 border-primaryBlue h-full py-3 px-4 text-md w-full" /> 
          </div>
          <p className="2xl:hidden">Flight date:</p>
          <input id="date" type="date" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]"  min={flightsTabState.minDate} />
          <p className="2xl:hidden">Departure time:</p>
          <input id="departureTime" type="time" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]" />
          <p className="2xl:hidden">Arrival time:</p>
          <input id="arrivalTime" type="time" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]" />
          <input id="pricePerSeat" type="number" placeholder="Price per seat" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]" />
          <p className="text-red-500 mt-2 2xl:hidden">{flightsTabState.addError}</p>
          <button onClick={()=>{changeFlightsTabState('addFlightTab',false)}} type="submit" className="bg-gray-400 text-white font-semibold my-4 py-2 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">Cancel</button>
          <button type="submit" className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{flightsTabState.loadingAdd?<Loader/>:'Add'}</button>
          <p className="text-red-500 mt-2 hidden 2xl:block w-full">{flightsTabState.addError}</p>
      </form>}
    </section>
  );
}
export default FlightsTab;
