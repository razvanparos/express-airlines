import { useEffect } from "react";
import FlightCard from "../components/FlightCard";
import { useNavigate } from "react-router-dom";

function ExploreResults(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(props.departureFlights.length===0){
            navigate('/')
        }
    },[])
    return (
        <div className="">
            <div className="bg-darkBlue text-white flex py-4 justify-center flex-col items-center mb-4">
                <p>{`${props.departureAirport?.city} - ${props.destinationAirport?.city}`}</p>
                <p>{`${props.departureFlights[0]?.departure} - ${props.departureFlights[0]?.destination}`}</p>
                <p>{`${props.adultsNumber} ${props.adultsNumber===1?'Adult':'Adults'}`}</p>
            </div>
            {props.departureFlights ? <div className="flex flex-col gap-y-2 items-center justify-center px-2">
                <p className="bg-primaryBlue py-2 rounded-t-xl text-white text-center font-bold">{`Select departure flight from ${props.departureFlights[0]?.departure} to ${props.departureFlights[0]?.destination}`}</p>
                {props.departureFlights.map((flight,i)=>{
                return <FlightCard adultsNumber={props.adultsNumber} return={false} key={i} flight={flight} departureAirport={props.departureAirport} destinationAirport={props.destinationAirport}/>
            })}
            </div>:<p>No results</p>}
            {props.returnFlights ? <div className="flex flex-col gap-y-2 items-center px-2 mb-4">
                <p className="bg-primaryBlue py-2 rounded-t-xl text-white text-center font-bold">{`Select return flight from ${props.departureFlights[0]?.destination} to ${props.departureFlights[0]?.departure}`}</p>
                {props.returnFlights.map((flight,i)=>{
                return <FlightCard adultsNumber={props.adultsNumber} return={true} key={i} flight={flight} departureAirport={props.departureAirport} destinationAirport={props.destinationAirport}/>
            })}
            </div>:<p>No results</p>}
        </div>
    );
}

export default ExploreResults;
