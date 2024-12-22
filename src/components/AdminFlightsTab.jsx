import { useContext, useState } from "react";
import airports from '../mock-data/airports.json'
import React from 'react';
import AdminFlightCard from "./AdminFlightCard";
import { formatDateToISO } from "../common/utils";
import { formatDate } from "../common/utils";
import { AppContext } from "../context/AppContext";
import AdminGetFlightsForm from "./AdminGetFlightsForm";
import AdminAddFlightForm from "./AdminAddFlightForm";
import ButtonComponent from "./ButtonComponent";
import useFilterAirports from "../hooks/useFilterAirports";

function FlightsTab() {
    const {state}=useContext(AppContext)
    const {homeSearch}=state
    const {departure,destination}=homeSearch
    const initialFlightsTabState={
      departuresList:[],
      destinationsList:[],
      flightDate:formatDate(new Date()),
      minDate:formatDate(new Date()),
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

    useFilterAirports(departure, airports, 'departuresList', changeFlightsTabState);
    useFilterAirports(destination, airports, 'destinationsList', changeFlightsTabState);
  
    return (
    <section className="flex flex-col gap-y-[20px]">
      <AdminGetFlightsForm destination={destination} departure={departure} flightsTabState={flightsTabState} changeFlightsTabState={changeFlightsTabState}/>
        <div className="px-4 lg:px-0">
          <ButtonComponent buttonFunction={()=>{changeFlightsTabState('addFlightTab',true)}} buttonText={'Add new flight'} buttonType={'primary'}/>
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
        <AdminAddFlightForm changeFlightsTabState={changeFlightsTabState} flightsTabState={flightsTabState}/>
      }
    </section>
  );
}
export default FlightsTab;
