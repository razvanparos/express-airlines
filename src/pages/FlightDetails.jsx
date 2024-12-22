import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";

function FlightDetails() {
    const navigate = useNavigate();
    const [currentBooking,setCurrentBooking]=useState('');
    const [selectedDepartureSeats,setSelectedDepartureSeats]=useState([]);
    const [selectedReturnSeats,setSelectedReturnSeats]=useState([]);
    const [continueError,setContinueError]=useState('');

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
    const handleContinue=()=>{
      if(selectedDepartureSeats.length===currentBooking.adultsNumber&&selectedReturnSeats.length===currentBooking.adultsNumber){
        setContinueError('')
        let finalBooking =JSON.parse(sessionStorage.getItem('currentBooking')) 
        finalBooking.selectedDepartureSeats=selectedDepartureSeats
        finalBooking.selectedReturnSeats=selectedReturnSeats
        sessionStorage.setItem('currentBooking',JSON.stringify(finalBooking))
        navigate('/flight-summary')
      }else{
        setContinueError('Please select seats for all passengers')
      }
    }

  return (
    <article className="flex flex-col gap-y-2 bg-white">
      <div className="bg-darkBlue text-white flex py-2 justify-center flex-col items-center">
        <p>{`${currentBooking.departureFlight?.departure} - ${currentBooking.departureFlight?.destination}`}</p>
        <p>{`${currentBooking.returnFlight?.departure} - ${currentBooking.returnFlight?.destination}`}</p>
        <p>{`${currentBooking.adultsNumber} ${currentBooking.adultsNumber===1?'Adult':'Adults'}`}</p>
      </div>
      <div className="lg:px-[10%]">
      <p className="bg-primaryBlue w-full p-2 rounded-t-xl text-white text-center font-bold">{`Select seats for ${currentBooking.departureFlight?.departure} - ${currentBooking.returnFlight?.departure} flight`}</p>
      <div className="flex flex-col items-center">
        <p className="w-full p-2 font-bold">{`${selectedDepartureSeats.length}/${currentBooking.adultsNumber}`}</p>
        <div className="p-3 inline-grid justify-items-center grid-cols-7 gap-y-4 w-fit">
          {currentBooking.departureFlight?.seats.map((seat,i)=>{
            if(seat.seatNumber[1]==='C'){
              return [<div onClick={()=>{handleDepartureSeatClick(seat)}} key={i} className={`border-2 cursor-pointer hover:bg-gray-200 ${selectedDepartureSeats.includes(seat.seatNumber)?'border-primaryBlue':''} ${seat.occupied?'border-gray-400':'border-green-400'} p-3 flex justify-center items-center `}>{seat.seatNumber}</div>,<div key={`${i}empty`}></div>]
            }else{
              return <div onClick={()=>{handleDepartureSeatClick(seat)}} key={i} className={`cursor-pointer hover:bg-gray-200 border-2 ${selectedDepartureSeats.includes(seat.seatNumber)?'border-primaryBlue':''} ${seat.occupied?'border-gray-400':'border-green-400'} p-3 flex justify-center items-center `}>{seat.seatNumber}</div>
            }
            
          })}
        </div>
      </div>
      
      <p className="bg-primaryBlue w-full p-2 rounded-t-xl text-white text-center font-bold">{`Select seats for ${currentBooking.returnFlight?.departure} - ${currentBooking.departureFlight?.departure} flight`}</p>
      <div className="flex flex-col items-center">
      <p className="w-full p-2 font-bold">{`${selectedReturnSeats.length}/${currentBooking.adultsNumber}`}</p>
        <div className="p-4 inline-grid justify-items-center grid-cols-7 gap-y-4 w-fit">
          {currentBooking.returnFlight?.seats.map((seat,i)=>{
            if(seat.seatNumber[1]==='C'){
              return [<div onClick={()=>{handleReturnSeatClick(seat)}} key={i} className={`border-2 cursor-pointer hover:bg-gray-200 ${seat.occupied?'border-gray-400':'border-green-400'} ${selectedReturnSeats.includes(seat.seatNumber)?'border-primaryBlue':''}  p-3 flex justify-center items-center `}>{seat.seatNumber}</div>,<div key={`${i}empty`}></div>]
            }else{
              return <div onClick={()=>{handleReturnSeatClick(seat)}} key={i} className={`border-2 cursor-pointer hover:bg-gray-200 ${seat.occupied?'border-gray-400':'border-green-400'} ${selectedReturnSeats.includes(seat.seatNumber)?'border-primaryBlue':''}  p-3 flex justify-center items-center `}>{seat.seatNumber}</div>
            }
          })}
        </div>
      </div>
      </div>
      <div className="bg-gray-200 p-2 flex justify-between items-center lg:px-[10%]">
        <ButtonComponent buttonFunction={()=>{navigate(-1)}} buttonText={'Back'} buttonType={'back'}/>
        <p className="text-sm md:text-lg text-red-500 text-center">{continueError}</p>
        <ButtonComponent buttonFunction={handleContinue} buttonText={'Continue'} buttonType={'primary'}/>
      </div>
      
    </article>
  );
}

export default FlightDetails;
