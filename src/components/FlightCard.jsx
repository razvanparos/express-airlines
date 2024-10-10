import { IoIosAirplane } from "react-icons/io";

function FlightCard(props) {
  return (
    <div className="p-3 border-2 w-full rounded-lg cursor-pointer">
      {props.return?<p className="font-bold">{`${props.flight.departure}(${props.destinationAirport.iata_code}) - ${props.flight.destination}(${props.departureAirport.iata_code})`}</p>:<p className="font-bold">{`${props.flight.departure}(${props.departureAirport.iata_code}) - ${props.flight.destination}(${props.destinationAirport.iata_code})`}</p>}
      <div className="flex justify-between">
        <div>
          {props.return?<p>{`${props.destinationAirport.city} - ${props.departureAirport.city}`}</p>:<p>{`${props.departureAirport.city} - ${props.destinationAirport.city}`}</p>}
          <p className="text-gray-400">{`${props.flight.takeOff}-${props.flight.landing}`}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-bold text-lg text-primaryBlue">{`$${props.flight.pricePerSeat*props.adultsNumber}`}</p>
          <p className="text-sm text-gray-400">{`$${props.flight.pricePerSeat}/passenger`}</p>
        </div>
      </div>
      
      
    </div>
  );
}

export default FlightCard;
