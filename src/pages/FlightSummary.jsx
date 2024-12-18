import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

import {getUserDetails} from "../services/authService";
import ConfirmPaymentFrom from "../components/ConfirmPaymentForm";
import FlightSummaryRow from "../components/FlightSummaryRow";

function FlightSummary() {
    const navigate = useNavigate();
    const [finalBooking,setFinalBooking]=useState('');
    const [thankYou,setThankYou]=useState(false);
    const [savedPaymentMethods, setSavedPaymentMethods]=useState('');
    const timeoutRef = useRef(null);

    useEffect(()=>{
        if(!sessionStorage.getItem('currentBooking')||!sessionStorage.getItem('currentUser')){
            navigate('/')
        }else{
            setFinalBooking(JSON.parse(sessionStorage.getItem('currentBooking')))
            getUserPaymentMethods();
        }
        return ()=>{
            if(timeoutRef.current!=null){
                clearTimeout(timeoutRef.current)
            }
        }
    },[])

    const getUserPaymentMethods=async()=>{
        let sessionDetails = await getUserDetails("UsersDetails");
        setSavedPaymentMethods(sessionDetails[0]?.paymentMethods);
    }

   
    return (
        <article className="flex flex-col bg-gray-200 justify-center">
            <div className="flex justify-between items-center px-2 py-4 bg-primaryBlue 2xl:px-[10%]">
                <p className="text-lg font-bold text-white">{`Trip for ${finalBooking.adultsNumber} ${finalBooking.adultsNumber===1?'passenger':'passengers'} `}</p>
                <p className="text-white text-xl font-bold">${finalBooking.total}</p>
            </div>
            <div className="flex flex-col-reverse px-2 lg:grid lg:grid-cols-2 2xl:px-[10%]">
                <div className="order-2 py-4 flex flex-col lg:items-end 2xl:items-center">
                    <FlightSummaryRow finalBooking={finalBooking} flightType={'departureFlight'}/>
                    <FlightSummaryRow finalBooking={finalBooking} flightType={'returnFlight'}/>
                </div> 
                <ConfirmPaymentFrom savedPaymentMethods={savedPaymentMethods} setThankYou={setThankYou} timeoutRef={timeoutRef} navigate={navigate}/>           
            </div>
           
          <div className={`flex flex-col gap-y-4 pt-20 items-center ${thankYou?'opacity-100 backdrop-blur-xl pointer-events-auto':'opacity-0 pointer-events-none'} z-2 absolute overflow-hidden duration-500 h-[100vh] w-full`}>
                <p className="font-bold text-2xl">Thank you!</p>
                <FaCheck className="text-white bg-primaryBlue p-4 rounded-full w-[60px] h-[60px]"/>
                <p className="text-lg font-semibold">Flight successfully booked</p>
                <button onClick={()=>{navigate('/user-dashboard')}} className="bg-darkBlue text-white p-2 rounded-lg">View booked flights</button>
                <button onClick={()=>{navigate('/')}} className="bg-darkBlue text-white p-2 rounded-lg">Home</button>
          </div>
         </article>
    );
}

export default FlightSummary;


