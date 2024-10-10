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
            <div className="bg-darkBlue text-white flex py-4 justify-center">
                <p>{`${props.departureFlights[0].departure} - ${props.departureFlights[0].destination}`}</p>
            </div>
            {props.departureFlights ? <div className="flex flex-col gap-y-2">
                {props.departureFlights.map((flight,i)=>{
                return <FlightCard key={i} flight={flight}/>
            })}
            </div>:<p>No results</p>}
        </div>
    );
}

export default ExploreResults;
