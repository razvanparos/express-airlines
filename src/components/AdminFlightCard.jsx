import { useState } from 'react';
import DbRequest from '../services/dbRequestService';
import {getFlightsAdmin} from "../services/flightService";
import { formatDate } from '../common/utils';
import PieChartComponent from './PieChartComponent';
import BarChartComponent from './BarChartComponent';
import AdminFlightCardInfo from './AdminFlightCardInfo';
import ButtonComponent from './ButtonComponent';

function AdminFlightCard({flight,editFlight,changeFlightsTabState,departure,destination,flightDate,}) {
    const [newDeparture, setNewDeparture]=useState('');
    const [newDestination, setNewDestination]=useState('');
    const [newFlightDate, setNewFlightDate] = useState(formatDate(new Date()));

      const editMode=async(id)=>{
        if(editFlight){
          changeFlightsTabState('editFlight','')
          await DbRequest.updateDb(id,"Flights",{
            departure: newDeparture,
            destination: newDestination,
            flightDate: newFlightDate
          });
          let queryResponse = await getFlightsAdmin(departure,destination,flightDate,"Flights");
          changeFlightsTabState('adminFlights',queryResponse)
        }else{
          changeFlightsTabState('editFlight',id)
          let focusRef = document.getElementById(id);
          focusRef.focus();
          setNewDeparture(departure)
          setNewDestination(destination)
          setNewFlightDate(flightDate)
        }
      }
      const cancelFlight=async(id)=>{
        await DbRequest.removeFromDb(id,"Flights")
        let queryResponse = await getFlightsAdmin(departure,destination,flightDate,"Flights");
        changeFlightsTabState('adminFlights',queryResponse)
      }
  return (
    <div className="border-2 w-full gap-y-[40px] p-2 2xl:p-[40px] rounded-lg flex flex-col lg:flex-row justify-between items-center bg-gray-200">
              <AdminFlightCardInfo flight={flight} editFlight={editFlight} newDeparture={newDeparture} setNewDeparture={setNewDeparture} newDestination={newDestination} setNewDestination={setNewDestination} newFlightDate={newFlightDate} setNewFlightDate={setNewFlightDate}/>
              <div>
                <BarChartComponent flight={flight}/>
              </div>
              <div className="relative flex flex-col items-center">
                <p>Occupied seats</p>
                <PieChartComponent data={[ { name: 'Occupied Seats' , value: flight.seats.length-flight.freeSeats }, { name: 'Free Seats' ,
                    value: flight.freeSeats }, ]} COLORS={['green','#0062E3']}/>
                <p className="absolute text-black bottom-[38%] font-bold">{`${flight.seats.length-flight.freeSeats} /
                  ${flight.seats.length}`}</p>
              </div>
              <div className="w-full md:w-fit flex md:flex-col justify-between gap-y-[20px]">
                <button onClick={()=>{editMode(flight.id)}} className={`${editFlight===flight.id?'bg-green-600':'bg-primaryBlue'}
                  text-white p-2 rounded-lg`}>{editFlight===flight.id?'Save':'Edit flight'}</button>
                <ButtonComponent buttonFunction={()=>{cancelFlight(flight.id)}} buttonText={'Cancel flight'} buttonType={'danger'}/>
              </div>
    </div>
  );
}

export default AdminFlightCard;
