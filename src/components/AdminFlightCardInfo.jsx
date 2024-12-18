function AdminFlightCardInfo({flight,editFlight,newDeparture,setNewDeparture, newDestination,setNewDestination,newFlightDate,setNewFlightDate}){
    return(
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
    );
}   
export default AdminFlightCardInfo;