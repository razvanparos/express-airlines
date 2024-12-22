import { useEffect, useState, useRef, useContext } from "react";
import FlightCard from "../components/FlightCard";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BookFlightInfo from "../components/BookFlightInfo";
import ButtonComponent from "../components/ButtonComponent";

function ExploreResults() {
    const navigate = useNavigate();
    const [selectedDepartureFlight,setSelectedDepartureFlight] = useState('')
    const [selectedReturnFlight,setSelectedReturnFlight] = useState('')
    const [showTripSummary,setShowTripSummary] = useState(false)
    const summaryRef = useRef(null);
    const returnRef = useRef(null);
    const {state} = useContext(AppContext)
    const { flights } = state;

    useEffect(()=>{
        if(flights.departureFlights?.length===0 || !flights.departureFlights[0]){
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
            adultsNumber: flights.adultsNumber,
            departureFlight: selectedDepartureFlight,
            returnFlight: selectedReturnFlight,
            total: flights.adultsNumber*(selectedDepartureFlight.pricePerSeat+selectedReturnFlight.pricePerSeat)
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
                <p>{`${flights.departureAirport?.city} - ${flights.destinationAirport?.city}`}</p>
                <p>{`${flights.departureFlights[0]?.departure} - ${flights.departureFlights[0]?.destination}`}</p>
                <p>{`${flights.adultsNumber} ${flights.adultsNumber===1?'Adult':'Adults'}`}</p>
            </div>
            <div className="py-4">
            {flights.departureFlights ? <div className="flex flex-col gap-y-2 items-center justify-center px-2">
                <p className="2xl:max-w-[30%] bg-primaryBlue w-full p-2 rounded-t-xl text-white font-bold">{`Select departure flight from ${flights.departureFlights[0]?.departure} to ${flights.departureFlights[0]?.destination}`}</p>
                {flights.departureFlights.map((flight,i)=>{
                return <FlightCard selectedDepartureFlight={selectedDepartureFlight} setSelectedDepartureFlight={setSelectedDepartureFlight} adultsNumber={flights.adultsNumber} return={false} key={i} flight={flight} departureAirport={flights.departureAirport} destinationAirport={flights.destinationAirport}/>
            })}
            </div>:<p>No results</p>}

            {flights.returnFlights ? <div className="mt-4 flex flex-col gap-y-2 items-center px-2 mb-4">
                <p ref={returnRef} className="2xl:max-w-[30%] bg-primaryBlue w-full p-2 rounded-t-xl text-white font-bold">{`Select return flight from ${flights.departureFlights[0]?.destination} to ${flights.departureFlights[0]?.departure}`}</p>
                {flights.returnFlights.map((flight,i)=>{
                return <FlightCard selectedReturnFlight={selectedReturnFlight} setSelectedReturnFlight={setSelectedReturnFlight} adultsNumber={flights.adultsNumber} return={true} key={i} flight={flight} departureAirport={flights.departureAirport} destinationAirport={flights.destinationAirport}/>
            })}
            </div>:<p>No results</p>}

            <div ref={summaryRef} className={`${showTripSummary?'h-fit overflow-auto':'h-0 overflow-hidden'} duration-200 flex gap-y-2 flex-col w-full items-center px-2`}>
                <p className="2xl:max-w-[30%] bg-primaryBlue w-full p-2 rounded-t-xl text-white font-bold">{`Your trip summary to ${flights.destinationAirport?.city}`}</p>
                <div className="border-2 rounded-lg p-3 flex w-full justify-between 2xl:max-w-[30%]">
                    <BookFlightInfo 
                        selectedDepartureFlight={selectedDepartureFlight} 
                        selectedReturnFlight={selectedReturnFlight}
                        flights={flights}
                    />
                    <div className="flex flex-col justify-between">
                        <p className="text-end text-primaryBlue font-bold text-xl">{`$${flights.adultsNumber*(selectedDepartureFlight.pricePerSeat+selectedReturnFlight.pricePerSeat)}`}</p>
                        <p className="text-end text-gray-400">{`${flights.adultsNumber} ${flights.adultsNumber===1?'Adult':'Adults'}`}</p>
                        <ButtonComponent buttonFunction={bookNow} buttonType={'primary'} buttonText={'Book now'}/>
                    </div>
                </div>
            </div>
            </div>
            <div className="bg-gray-200 p-2  flex items-center lg:px-[10%]">
                <ButtonComponent buttonFunction={()=>{navigate(-1)}} buttonText={'Back'} buttonType={'back'}/>
            </div>
        </article>
    );
}

export default ExploreResults;
