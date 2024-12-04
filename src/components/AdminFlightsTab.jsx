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
    const [showDepartureAirportsList, setShowDepartureAirportsList]=useState(false);
    const [showDepartureAirportsListDesktop, setShowDepartureAirportsListDesktop]=useState(false);
    const [showDestinationAirportsList, setShowDestinationAirportsList]=useState(false);
    const [showDestinationAirportsListDesktop, setShowDestinationAirportsListDesktop]=useState(false);
    const [departuresList, setDeparturesList]=useState([]);
    const [destinationsList, setDestinationsList]=useState([]);
    const [flightDate, setFlightDate] = useState(formatDate(new Date()));
    const [minDate, setMinDate] = useState(formatDate(new Date()));
    const [loading, setLoading] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [addError, setAddError] = useState('');
    const [noFlightsfound, setNoFlightsFound] = useState('');
    const [adminFlights, setAdminFlights] = useState([]);
    const [editFlight, setEditFlight] = useState('');
    const [addFlightTab, setAddFlightTab] = useState(false);

   
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
  
    const getFLights=async(e)=>{
        e.preventDefault();
        setAddFlightTab(false);
        if(showDepartureAirportsList||showDestinationAirportsList){
            setSearchError('Select airports from the list')
            return
        }else{
            setSearchError('')
        }
        if(departure&&destination&&flightDate){
            setSearchError('')
            setLoading(true)
            let queryResponse = await getFlightsAdmin(departure,destination,formatDateToISO(flightDate),"Flights");
            console.log(queryResponse)
            if(queryResponse.length<1){
              setNoFlightsFound('No flights found')
            }else {
              setNoFlightsFound('')
            }
            setAdminFlights(queryResponse);
        }else{
            setSearchError('Fields cannot be empty')
        }
        setLoading(false)
    }
    const addFlightFunction=async(e)=>{
        e.preventDefault();
        setLoadingAdd(true)
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
          setAddError('')
          await createFlightsAdmin(flightData);
          setAddFlightTab(false)
        }else{
          setAddError('Empty fields')
        }    
        setLoadingAdd(false)
    }
    return (
    <section className="flex flex-col gap-y-[20px]">
      <form onSubmit={getFLights} action="" className="flex flex-col px-4 lg:px-0 pt-8 w-full 2xl:grid 2xl:grid-cols-5">
          <LocationPicker type={'departure'} style={'admin'} departuresList={departuresList} showDepartureAirportsList={showDepartureAirportsList} showDepartureAirportsListDesktop={showDepartureAirportsListDesktop}/>
          <LocationPicker type={'destination'} style={'admin'} destinationsList={destinationsList} showDestinationAirportsList={showDestinationAirportsList} showDestinationAirportsListDesktop={showDestinationAirportsListDesktop}/>
          <input type="date" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-xl 2xl:h-[80px]" value={flightDate} onChange={(e)=>{setFlightDate(e.target.value)}}/>
          <p className="text-red-500 mt-2 2xl:hidden">{searchError}</p>
          <button type="submit" className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{loading?<Loader/>:'Search'}</button>
          <p className="text-red-500 mt-2 hidden 2xl:block w-full">{searchError}</p>
      </form>
        <div className="px-4 lg:px-0">
          <button onClick={()=>{setAddFlightTab(true)}} className=" w-full bg-primaryBlue md:w-fit text-white rounded-lg p-2 px-8">Add new flight</button>
        </div>
        {!addFlightTab?
        <section className="p-4 lg:px-[0]">
          <div className="flex flex-col gap-y-4">
            {adminFlights?.map((f,i)=>{
              return <AdminFlightCard key={i}
              flight={f}
              editFlight={editFlight}
              departure={departure}
              destination={destination}
              flightDate={formatDateToISO(flightDate)}
              setEditFlight={setEditFlight}
              setAdminFlights={setAdminFlights}
              />
            })}
          </div>
          <p className="text-red-500">{noFlightsfound}</p>
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
          <input id="date" type="date" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]"  min={minDate} />
          <p className="2xl:hidden">Departure time:</p>
          <input id="departureTime" type="time" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]" />
          <p className="2xl:hidden">Arrival time:</p>
          <input id="arrivalTime" type="time" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]" />
          <input id="pricePerSeat" type="number" placeholder="Price per seat" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]" />
          <p className="text-red-500 mt-2 2xl:hidden">{addError}</p>
          <button onClick={()=>{setAddFlightTab(false)}} type="submit" className="bg-gray-400 text-white font-semibold my-4 py-2 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">Cancel</button>
          <button type="submit" className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{loadingAdd?<Loader/>:'Add'}</button>
          <p className="text-red-500 mt-2 hidden 2xl:block w-full">{addError}</p>
      </form>}
    </section>
  );
}
export default FlightsTab;
