import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, Rectangle, XAxis, YAxis, Legend } from 'recharts';
import { useState } from 'react';
import DbRequest from '../services/dbRequestService';
import {getFlightsAdmin} from "../services/flightService";
import { formatDate } from '../common/utils';

function AdminFlightCard({flight,editFlight,changeFlightsTabState,departure,destination,flightDate,}) {
  const COLORS = ['green','#0062E3'];
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
         <div className="flex flex-col gap-y-2">
                <p className="text-primaryBlue font-bold">{flight.id}</p>
                <p><strong>Departure:</strong> <input type="text" id={flight.id}
                    className={`${editFlight===flight.id?'pointer-events-auto':'pointer-events-none bg-gray-200'}
                    rounded-lg`} value={editFlight===flight.id?newDeparture:flight.departure}
                    onChange={(e)=>{setNewDeparture(e.target.value)}}/></p>
                <p><strong>Destination:</strong> <input type="text"
                    className={`${editFlight===flight.id?'pointer-events-auto':'pointer-events-none bg-gray-200'}
                    rounded-lg`} value={editFlight===flight.id?newDestination:flight.destination}
                    onChange={(e)=>{setNewDestination(e.target.value)}}/></p>
                <p><strong>Flight Date:</strong> <input type="text"
                    className={`${editFlight===flight.id?'pointer-events-auto':'pointer-events-none bg-gray-200'}
                    rounded-lg`} value={editFlight===flight.id?newFlightDate:flight.flightDate}
                    onChange={(e)=>{setNewFlightDate(e.target.value)}}/></p>
                <p><strong>Takeoff: </strong>{flight.takeOff}</p>
                <p><strong>Landing: </strong>{flight.landing}</p>
              </div>
              <div>
                <BarChart width={300} height={200} data={[{ name: 'Sales' , sold:
                  (flight.seats.length-flight.freeSeats)*flight.pricePerSeat, potentialSales: flight.seats.length*flight.pricePerSeat, }]}>
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
                  <Pie data={[ { name: 'Occupied Seats' , value: flight.seats.length-flight.freeSeats }, { name: 'Free Seats' ,
                    value: flight.freeSeats }, ]} innerRadius={60} outerRadius={90} fill="#00C49F" paddingAngle={0}
                    dataKey="value">
                    {[
                    { name: 'Occupied Seats', value: flight.seats.length-flight.freeSeats },
                    { name: 'Free Seats', value: flight.freeSeats },
                    ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <p className="absolute text-black bottom-[38%] font-bold">{`${flight.seats.length-flight.freeSeats} /
                  ${flight.seats.length}`}</p>
              </div>
              <div className="w-full md:w-fit flex md:flex-col justify-between gap-y-[20px]">
                <button onClick={()=>{editMode(flight.id)}} className={`${editFlight===flight.id?'bg-green-600':'bg-primaryBlue'}
                  text-white p-2 rounded-lg`}>{editFlight===flight.id?'Save':'Edit flight'}</button>
                <button onClick={()=>{cancelFlight(flight.id)}} className="bg-red-600 text-white p-2 rounded-lg">Cancel
                  flight</button>
              </div>
    </div>
  );
}

export default AdminFlightCard;
