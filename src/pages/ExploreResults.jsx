import { useEffect } from "react";
import FlightCard from "../components/FlightCard";
import { useNavigate } from "react-router-dom";

function ExploreResults(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(props.exploreResults.length===0){
            navigate('/')
        }
    },[])
    return (
        <div className="">
            {props.exploreResults ? <div>
                {props.exploreResults.map((flight,i)=>{
                return <FlightCard key={i} flight={flight}/>
            })}
            </div>:<p>No results</p>}
        </div>
    );
}

export default ExploreResults;
