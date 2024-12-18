import AddFlightRow from "./AddFlightRow";
import { createFlightsAdmin } from "../services/flightService";
import Loader from "./Loader";
import { useState } from "react";
import { formatDateToISO } from "../common/utils";

function AdminAddFlightForm({changeFlightsTabState,flightsTabState}){
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)

    const initialAddFlightState={
        departure: '',
        destination: '',
        date: '',
        takeoff: '',
        landing: '',
        pricePerSeat: 0,
      }
      const [addFlightState,setAddFlightState] = useState(initialAddFlightState)
  
      const changeAddFlightState = (fieldname,value)=>{
        setAddFlightState((prevState) => ({
          ...prevState,
          [fieldname]: value,
        }));
      }

    const addFlightFunction=async(e)=>{
        e.preventDefault();
        setLoading(true)
        const hasEmptyValue = Object.values(addFlightState).some(value => !value);
        if(!hasEmptyValue){
            setError('')
            console.log(addFlightState)
          await createFlightsAdmin(addFlightState);
          changeFlightsTabState('addFlightTab',false)
        }else{
            setError('Empty fields')
        }    
        setLoading(false)
    }

    return(
        <form onSubmit={addFlightFunction} id="addForm" action="" className="flex flex-col px-4 lg:px-0 w-full 2xl:grid 2xl:grid-cols-10">
            <div className="relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]">
                <input onChange={(e)=>{changeAddFlightState('departure',e.target.value)}} id="departureAirport" placeholder="Departure airport" type="text" className=" border-2 border-primaryBlue rounded-t-xl py-3 px-4 text-md w-full 2xl:rounded-bl-lg 2xl:rounded-tr-none 2xl:h-[80px]" />
            </div>
            <div className="relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]">
                <input onChange={(e)=>{changeAddFlightState('destination',e.target.value)}} id="destinationAirport" placeholder="Destination airport" type="text" className="border-2 border-primaryBlue h-full py-3 px-4 text-md w-full" /> 
            </div>
            <AddFlightRow text={'Flight date:'} min={flightsTabState.minDate} type='date' onChange={(e)=>{changeAddFlightState('date',formatDateToISO(e.target.value))}}/>
            <AddFlightRow text={'Departure time:'} type='time' onChange={(e)=>{changeAddFlightState('takeoff',e.target.value)}}/>
            <AddFlightRow text={'Arrival time:'} type='time' onChange={(e)=>{changeAddFlightState('landing',e.target.value)}}/>
            <AddFlightRow type='number' placeholder={'Price per seat'} onChange={(e)=>{changeAddFlightState('pricePerSeat',Number(e.target.value))}}/>
            <p className="text-red-500 mt-2 2xl:hidden">{error}</p>
            <button onClick={()=>{changeFlightsTabState('addFlightTab',false)}} type="submit" className="bg-gray-400 text-white font-semibold my-4 py-2 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">Cancel</button>
            <button type="submit" className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl">{loading?<Loader/>:'Add'}</button>
            <p className="text-red-500 mt-2 hidden 2xl:block w-full">{error}</p>
        </form>
    );
}
export default AdminAddFlightForm;