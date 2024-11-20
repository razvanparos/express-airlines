import { useEffect, useState, useRef, useContext } from "react";
import FlightCard from "../components/FlightCard";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ExploreResults() {
    const navigate = useNavigate();
    const [selectedDepartureFlight,setSelectedDepartureFlight] = useState('')
    const [selectedReturnFlight,setSelectedReturnFlight] = useState('')
    const [showTripSummary,setShowTripSummary] = useState(false)
    const summaryRef = useRef(null);
    const returnRef = useRef(null);

    const {adultsNumber, departureAirport,departureFlights,returnFlights,destinationAirport,departureDate,returnDate} = useContext(AppContext)

    useEffect(()=>{
        if(departureFlights.length===0){
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
            adultsNumber: adultsNumber,
            departureFlight: selectedDepartureFlight,
            returnFlight: selectedReturnFlight,
            total: adultsNumber*(selectedDepartureFlight.pricePerSeat+selectedReturnFlight.pricePerSeat)
        }
        sessionStorage.setItem('currentBooking',JSON.stringify(newBooking))
        if(sessionStorage.getItem('currentUser')){
            navigate('/flight-details')
        }else {
            navigate('/login')
        }
    }

    return (
        <article className="bg-white">
            <div className="bg-darkBlue text-white flex py-2 justify-center flex-col items-center mb-4">
                <p>{`${departureAirport?.city} - ${destinationAirport?.city}`}</p>
                <p>{`${departureFlights[0]?.departure} - ${departureFlights[0]?.destination}`}</p>
                <p>{`${adultsNumber} ${adultsNumber===1?'Adult':'Adults'}`}</p>
            </div>
            <div className="py-4">
            {departureFlights ? <div className="flex flex-col gap-y-2 items-center justify-center px-2">
                <p className="2xl:max-w-[30%] bg-primaryBlue w-full p-2 rounded-t-xl text-white font-bold">{`Select departure flight from ${departureFlights[0]?.departure} to ${departureFlights[0]?.destination}`}</p>
                {departureFlights.map((flight,i)=>{
                return <FlightCard selectedDepartureFlight={selectedDepartureFlight} setSelectedDepartureFlight={setSelectedDepartureFlight} adultsNumber={adultsNumber} return={false} key={i} flight={flight} departureAirport={departureAirport} destinationAirport={destinationAirport}/>
            })}
            </div>:<p>No results</p>}

            {returnFlights ? <div className="mt-4 flex flex-col gap-y-2 items-center px-2 mb-4">
                <p ref={returnRef} className="2xl:max-w-[30%] bg-primaryBlue w-full p-2 rounded-t-xl text-white font-bold">{`Select return flight from ${departureFlights[0]?.destination} to ${departureFlights[0]?.departure}`}</p>
                {returnFlights.map((flight,i)=>{
                return <FlightCard selectedReturnFlight={selectedReturnFlight} setSelectedReturnFlight={setSelectedReturnFlight} adultsNumber={adultsNumber} return={true} key={i} flight={flight} departureAirport={departureAirport} destinationAirport={destinationAirport}/>
            })}
            </div>:<p>No results</p>}

            <div ref={summaryRef} className={`${showTripSummary?'h-fit overflow-auto':'h-0 overflow-hidden'} duration-200 flex gap-y-2 flex-col w-full items-center px-2`}>
                <p className="2xl:max-w-[30%] bg-primaryBlue w-full p-2 rounded-t-xl text-white font-bold">{`Your trip summary to ${destinationAirport.city}`}</p>
                <div className="border-2 rounded-lg p-3 flex w-full justify-between 2xl:max-w-[30%]">
                    <div>
                        <p className="font-bold">{`${selectedDepartureFlight.departure} - ${selectedReturnFlight.departure}`}</p>
                        <p>{`${departureDate} (${selectedDepartureFlight.takeOff} - ${selectedDepartureFlight.landing})`}</p>
                        <p className="font-bold">{`${selectedReturnFlight.departure} - ${selectedDepartureFlight.departure}`}</p>
                        <p>{`${returnDate} (${selectedReturnFlight.takeOff} - ${selectedReturnFlight.landing})`}</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="text-end text-primaryBlue font-bold text-xl">{`$${adultsNumber*(selectedDepartureFlight.pricePerSeat+selectedReturnFlight.pricePerSeat)}`}</p>
                        <p className="text-end text-gray-400">{`${adultsNumber} ${adultsNumber===1?'Adult':'Adults'}`}</p>
                        <button onClick={bookNow} className="bg-primaryBlue px-3 py-2 rounded-lg text-white">Book now</button>
                    </div>
                </div>
            </div>
            </div>
        </article>
    );
}

export default ExploreResults;
