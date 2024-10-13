import { useEffect, useState, useRef } from "react";
import FlightCard from "../components/FlightCard";
import { useNavigate } from "react-router-dom";

function ExploreResults(props) {
    const navigate = useNavigate();
    const [selectedDepartureFlight,setSelectedDepartureFlight] = useState('')
    const [selectedReturnFlight,setSelectedReturnFlight] = useState('')
    const [showTripSummary,setShowTripSummary] = useState(false)
    const summaryRef = useRef(null);
    const returnRef = useRef(null);

    useEffect(()=>{
        if(props.departureFlights.length===0){
            navigate('/')
        }
    },[])

    useEffect(()=>{
        if(selectedDepartureFlight){
            returnRef.current.scrollIntoView({ behavior: 'smooth'});
        }
        if(selectedDepartureFlight&&selectedReturnFlight){
            setShowTripSummary(true)
            summaryRef.current.scrollIntoView({ behavior: 'smooth'});
        }else{
            setShowTripSummary(false)
        }
    },[selectedDepartureFlight,selectedReturnFlight])

    const bookNow=()=>{
        let newBooking={
            adultsNumber: props.adultsNumber,
            departureFlight: selectedDepartureFlight,
            returnFlight: selectedReturnFlight,
            total: props.adultsNumber*(selectedDepartureFlight.pricePerSeat+selectedReturnFlight.pricePerSeat)
        }
        console.log(newBooking);
        sessionStorage.setItem('currentBooking',JSON.stringify(newBooking))
        if(sessionStorage.getItem('currentUser')){
            navigate('/flight-details')
        }else {
            navigate('/login')
        }
    }

    return (
        <div className="">
            <div className="bg-darkBlue text-white flex py-2 justify-center flex-col items-center mb-4">
                <p>{`${props.departureAirport?.city} - ${props.destinationAirport?.city}`}</p>
                <p>{`${props.departureFlights[0]?.departure} - ${props.departureFlights[0]?.destination}`}</p>
                <p>{`${props.adultsNumber} ${props.adultsNumber===1?'Adult':'Adults'}`}</p>
            </div>
            {props.departureFlights ? <div className="flex flex-col gap-y-2 items-center justify-center px-2">
                <p className="bg-primaryBlue w-full p-2 rounded-t-xl text-white font-bold">{`Select departure flight from ${props.departureFlights[0]?.departure} to ${props.departureFlights[0]?.destination}`}</p>
                {props.departureFlights.map((flight,i)=>{
                return <FlightCard selectedDepartureFlight={selectedDepartureFlight} setSelectedDepartureFlight={setSelectedDepartureFlight} adultsNumber={props.adultsNumber} return={false} key={i} flight={flight} departureAirport={props.departureAirport} destinationAirport={props.destinationAirport}/>
            })}
            </div>:<p>No results</p>}

            {props.returnFlights ? <div className="mt-4 flex flex-col gap-y-2 items-center px-2 mb-4">
                <p ref={returnRef} className="bg-primaryBlue w-full p-2 rounded-t-xl text-white font-bold">{`Select return flight from ${props.departureFlights[0]?.destination} to ${props.departureFlights[0]?.departure}`}</p>
                {props.returnFlights.map((flight,i)=>{
                return <FlightCard selectedReturnFlight={selectedReturnFlight} setSelectedReturnFlight={setSelectedReturnFlight} adultsNumber={props.adultsNumber} return={true} key={i} flight={flight} departureAirport={props.departureAirport} destinationAirport={props.destinationAirport}/>
            })}
            </div>:<p>No results</p>}

            <div ref={summaryRef} className={`${showTripSummary?'h-fit overflow-auto':'h-0 overflow-hidden'} duration-200 mt-4 flex gap-y-2 flex-col px-2 mb-4`}>
                <p className="bg-primaryBlue w-full p-2 rounded-t-xl text-white font-bold">{`Your trip summary to ${props.destinationAirport.city}`}</p>
                <div className="border-2 rounded-lg p-3 flex justify-between">
                    <div>
                        <p className="font-bold">{`${selectedDepartureFlight.departure} - ${selectedReturnFlight.departure}`}</p>
                        <p>{`${props.departureDate} (${selectedDepartureFlight.takeOff} - ${selectedDepartureFlight.landing})`}</p>
                        <p className="font-bold">{`${selectedReturnFlight.departure} - ${selectedDepartureFlight.departure}`}</p>
                        <p>{`${props.returnDate} (${selectedReturnFlight.takeOff} - ${selectedReturnFlight.landing})`}</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="text-end text-primaryBlue font-bold text-xl">{`$${props.adultsNumber*(selectedDepartureFlight.pricePerSeat+selectedReturnFlight.pricePerSeat)}`}</p>
                        <p className="text-end text-gray-400">{`${props.adultsNumber} ${props.adultsNumber===1?'Adult':'Adults'}`}</p>
                        <button onClick={bookNow} className="bg-primaryBlue px-3 py-2 rounded-lg text-white">Book now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExploreResults;
