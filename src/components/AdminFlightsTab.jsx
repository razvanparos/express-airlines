import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import airports from '../utils/airports.json'
import homeService from "../services/homeService";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import React, { PureComponent } from 'react';
import DbRequest from '../services/dbRequestService';
import { createFlights, createFlightsAdmin } from "../services/createFlights";


function FlightsTab() {
    const COLORS = ['green','#0062E3'];
    const [departure, setDeparture]=useState('');
    const [newDeparture, setNewDeparture]=useState('');
    const [destination, setDestination]=useState('');
    const [newDestination, setNewDestination]=useState('');
    const [showDepartureAirportsList, setShowDepartureAirportsList]=useState(false);
    const [showDepartureAirportsListDesktop, setShowDepartureAirportsListDesktop]=useState(false);
    const [showDestinationAirportsList, setShowDestinationAirportsList]=useState(false);
    const [showDestinationAirportsListDesktop, setShowDestinationAirportsListDesktop]=useState(false);
    const [departuresList, setDeparturesList]=useState([]);
    const [destinationsList, setDestinationsList]=useState([]);
    const [flightDate, setFlightDate] = useState(formatDate(new Date()));
    const [newFlightDate, setNewFlightDate] = useState(formatDate(new Date()));
    const [minDate, setMinDate] = useState(formatDate(new Date()));
    const [loading, setLoading] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [addError, setAddError] = useState('');
    const [noFlightsfound, setNoFlightsFound] = useState('');
    const [adminFlights, setAdminFlights] = useState([]);
    const [editFlight, setEditFlight] = useState('');
    const [addFlightTab, setAddFlightTab] = useState(false);

    function formatDateToISO(date){
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0'); 
        return `${month}/${day}/${year}`; 
      };
    function formatDate(date){
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0'); 
        return `${year}-${month}-${day}`; 
      };

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
            let queryResponse = await homeService.getFlightsAdmin(departure,destination,formatDateToISO(flightDate));
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
    
    const handleDepartureListItemClick=(item)=>{
        setDeparture(item.name);
        setShowDepartureAirportsList(false)   
    }
    const handleDestinationListItemClick=(item)=>{
        setDestination(item.name);
        setShowDestinationAirportsList(false)   
    }
    const editMode=async(id)=>{
      if(editFlight){
        setEditFlight('')
        await DbRequest.updateFlight(id,newDeparture,newDestination,newFlightDate);
        let queryResponse = await homeService.getFlightsAdmin(departure,destination,formatDateToISO(flightDate));
        setAdminFlights(queryResponse);
      }else{
        setEditFlight(id)
        setNewDeparture(departure)
        setNewDestination(destination)
        setNewFlightDate(formatDateToISO(flightDate))
      }
    }
    const cancelFlight=async(id)=>{
      await DbRequest.removeFlight(id)
      let queryResponse = await homeService.getFlightsAdmin(departure,destination,formatDateToISO(flightDate));
      setAdminFlights(queryResponse);
    }
  


    return (
    <section className="flex flex-col gap-y-[20px]">
      <form onSubmit={getFLights} action="" className="flex flex-col px-4 lg:px-0 pt-8 w-full 2xl:grid 2xl:grid-cols-4">
          <div className="relative 2xl:col-span-1 mb-[1px] 2xl:mb-[0px]">
            <input placeholder="Choose departure airport" type="text" className="border-2 border-primaryBlue rounded-t-xl py-3 px-4 text-xl w-full 2xl:rounded-bl-lg 2xl:rounded-tr-none 2xl:h-[80px]" value={departure} onChange={(e)=>{setDeparture(e.target.value)}}/>
            <div className={`${showDepartureAirportsList?'h-fit p-2 2xl:hidden border-2 border-primaryBlue':'h-[0px] 2xl:w-0 2xl :hidden overflow-hidden'}  duration-200 bg-white`}>
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
          <div className="relative 2xl:col-span-1 mb-[1px] 2xl:mb-[0px]">
              <input placeholder="Choose destination airport" type="text" className="border-2 border-primaryBlue h-full py-3 px-4 text-xl w-full" value={destination} onChange={(e)=>{setDestination(e.target.value)}}/>
              <div className={`${showDestinationAirportsList?'h-fit p-2 2xl:hidden border-2 border-primaryBlue':'h-[0px] 2xl:hidden overflow-hidden'}  duration-200 bg-white`}>
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
        
          <input type="date" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-xl 2xl:h-[80px]" value={flightDate} min={minDate} onChange={(e)=>{setFlightDate(e.target.value)}}/>
          <p className="text-red-500 mt-2 2xl:hidden">{searchError}</p>
          <button type="submit" className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{loading?<Loader/>:'Search'}</button>
          <p className="text-red-500 mt-2 hidden 2xl:block w-full">{searchError}</p>
        </form>
        <button onClick={()=>{setAddFlightTab(true)}} className=" w-[90%] ml-4 lg:ml-0 bg-primaryBlue md:w-fit text-white rounded-lg p-2 px-8">Add new flight</button>
        {!addFlightTab?
        <section className="p-4 lg:px-[0]">
          <div className="flex flex-col gap-y-4">
            {adminFlights?.map((f,i)=>{
            return <div key={i}
              className="border-2 w-full gap-y-[40px] p-2 2xl:p-[40px] rounded-lg flex flex-col lg:flex-row justify-between items-center bg-gray-200">
              <div className="flex flex-col gap-y-2">
                <p className="text-primaryBlue font-bold">{f.id}</p>
                <p><strong>Departure:</strong> <input type="text"
                    className={`${editFlight===f.id?'pointer-events-auto':'pointer-events-none bg-gray-200'}
                    rounded-lg`} value={editFlight===f.id?newDeparture:f.departure}
                    onChange={(e)=>{setNewDeparture(e.target.value)}}/></p>
                <p><strong>Destination:</strong> <input type="text"
                    className={`${editFlight===f.id?'pointer-events-auto':'pointer-events-none bg-gray-200'}
                    rounded-lg`} value={editFlight===f.id?newDestination:f.destination}
                    onChange={(e)=>{setNewDestination(e.target.value)}}/></p>
                <p><strong>Flight Date:</strong> <input type="text"
                    className={`${editFlight===f.id?'pointer-events-auto':'pointer-events-none bg-gray-200'}
                    rounded-lg`} value={editFlight===f.id?newFlightDate:f.flightDate}
                    onChange={(e)=>{setNewFlightDate(e.target.value)}}/></p>
                <p><strong>Takeoff: </strong>{f.takeOff}</p>
                <p><strong>Landing: </strong>{f.landing}</p>
              </div>
              <div>
                <BarChart width={300} height={200} data={[{ name: 'Sales' , sold:
                  (f.seats.length-f.freeSeats)*f.pricePerSeat, potentialSales: f.seats.length*f.pricePerSeat, }]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sold" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                  <Bar dataKey="potentialSales" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
              </div>
              <div className="relative flex flex-col items-center">
                <p>Occupied seats</p>
                <PieChart width={200} height={200}>
                  <Pie data={[ { name: 'Occupied Seats' , value: f.seats.length-f.freeSeats }, { name: 'Free Seats' ,
                    value: f.freeSeats }, ]} innerRadius={60} outerRadius={90} fill="#00C49F" paddingAngle={0}
                    dataKey="value">
                    {[
                    { name: 'Occupied Seats', value: f.seats.length-f.freeSeats },
                    { name: 'Free Seats', value: f.freeSeats },
                    ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <p className="absolute text-black bottom-[38%] font-bold">{`${f.seats.length-f.freeSeats} /
                  ${f.seats.length}`}</p>
              </div>
              <div className="w-full md:w-fit flex md:flex-col justify-between gap-y-[20px]">
                <button onClick={()=>{editMode(f.id)}} className={`${editFlight===f.id?'bg-green-600':'bg-primaryBlue'}
                  text-white p-2 rounded-lg`}>{editFlight===f.id?'Save':'Edit flight'}</button>
                <button onClick={()=>{cancelFlight(f.id)}} className="bg-red-600 text-white p-2 rounded-lg">Cancel
                  flight</button>
              </div>
            </div>
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
          <input id="date" type="date" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]"  min={minDate} />
          <input id="departureTime" type="time" className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]" />
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
