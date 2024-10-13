import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FlightDetails() {
    const navigate = useNavigate();
    const [currentBooking,setCurrentBooking]=useState('');
    const [selectedDepartureSeats,setSelectedDepartureSeats]=useState([]);
    const [selectedReturnSeats,setSelectedReturnSeats]=useState([]);
    
    useEffect(()=>{
        if(!sessionStorage.getItem('currentBooking')||!sessionStorage.getItem('currentUser')){
            navigate('/')
        }else{
          setCurrentBooking(JSON.parse(sessionStorage.getItem('currentBooking')))
        }
    },[])

    const handleDepartureSeatClick=(seat)=>{
      if(selectedDepartureSeats.includes(seat.seatNumber)){
        let array = selectedDepartureSeats.filter(val=>val!=seat.seatNumber)
        setSelectedDepartureSeats(array)
        return
      }
      if(selectedDepartureSeats.length<currentBooking.adultsNumber){
        if(!seat.occupied){
          setSelectedDepartureSeats(prevState=>[...prevState,seat.seatNumber])
        } 
      }
    }
    const handleReturnSeatClick=(seat)=>{
      if(selectedReturnSeats.includes(seat.seatNumber)){
        let array = selectedReturnSeats.filter(val=>val!=seat.seatNumber)
        setSelectedReturnSeats(array)
        return
      }
      if(selectedReturnSeats.length<currentBooking.adultsNumber){
        if(!seat.occupied){
          setSelectedReturnSeats(prevState=>[...prevState,seat.seatNumber])
        } 
      }
    }

  return (
    <div className="">
      <p className="bg-primaryBlue w-full p-2 rounded-t-xl text-white text-center font-bold">{`Select seats for ${currentBooking.departureFlight?.departure} - ${currentBooking.returnFlight?.departure} flight`}</p>
      <div className="flex flex-col items-center">
        <p className="w-full p-2 font-bold">{`${selectedDepartureSeats.length}/${currentBooking.adultsNumber}`}</p>
        <div className="p-4 inline-grid justify-items-center grid-cols-6 gap-y-4 w-fit">
          {currentBooking.departureFlight?.seats.map((seat,i)=>{
            return <div onClick={()=>{handleDepartureSeatClick(seat)}} key={i} className={`border-2 ${selectedDepartureSeats.includes(seat.seatNumber)?'border-primaryBlue':'border-green-400'} ${seat.occupied?'border-gray-400':''} p-4 flex justify-center items-center `}>{seat.seatNumber}</div>
          })}
        </div>
      </div>
      
      <p className="bg-primaryBlue w-full p-2 rounded-t-xl text-white text-center font-bold">{`Select seats for ${currentBooking.returnFlight?.departure} - ${currentBooking.departureFlight?.departure} flight`}</p>
      <div className="flex flex-col items-center">
      <p className="w-full p-2 font-bold">{`${selectedReturnSeats.length}/${currentBooking.adultsNumber}`}</p>
        <div className="p-4 inline-grid justify-items-center grid-cols-6 gap-y-4 w-fit">
          {currentBooking.returnFlight?.seats.map((seat,i)=>{
            return <div onClick={()=>{handleReturnSeatClick(seat)}} key={i} className={`border-2 ${selectedReturnSeats.includes(seat.seatNumber)?'border-primaryBlue':'border-green-400'} ${seat.occupied?'border-gray-400':''} p-4 flex justify-center items-center `}>{seat.seatNumber}</div>
          })}
        </div>
      </div>
    </div>
  );
}

export default FlightDetails;
