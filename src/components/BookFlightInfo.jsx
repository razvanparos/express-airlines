function BookFlightInfo({selectedDepartureFlight,selectedReturnFlight,flights}){
    return(
    <div>
        <p className="font-bold">{`${selectedDepartureFlight.departure} - ${selectedReturnFlight.departure}`}</p>
        <p>{`${flights.departureDate} (${selectedDepartureFlight.takeOff} - ${selectedDepartureFlight.landing})`}</p>
        <p className="font-bold">{`${selectedReturnFlight.departure} - ${selectedDepartureFlight.departure}`}</p>
        <p>{`${flights.returnDate} (${selectedReturnFlight.takeOff} - ${selectedReturnFlight.landing})`}</p>
    </div>
    );
}   
export default BookFlightInfo;