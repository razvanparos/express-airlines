import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FlightSummary() {
    const navigate = useNavigate();
    const [finalBooking,setFinalBooking]=useState('');
    useEffect(()=>{
        if(!sessionStorage.getItem('currentBooking')||!sessionStorage.getItem('currentUser')){
            navigate('/')
        }else{
          setFinalBooking(JSON.parse(sessionStorage.getItem('currentBooking')))
        }
    },[])

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center px-2 py-4 bg-primaryBlue">
                <p className="text-lg font-bold text-white">{`Trip for ${finalBooking.adultsNumber} passengers`}</p>
                <p className="text-white text-xl font-bold">${finalBooking.total}</p>
            </div>
            
            <div className="bg-gray-200 flex flex-col gap-y-1 p-2">
                <p className="font-bold text-lg">{`${finalBooking.departureFlight?.departure} - ${finalBooking.departureFlight?.destination}`}</p>
                <p className="text-gray-500">{`${finalBooking.departureFlight?.flightDate}  (${finalBooking.departureFlight?.takeOff} - ${finalBooking.departureFlight?.landing})`}</p>
                <p>Selected seats:</p>
                <div className="flex gap-x-2">
                    {finalBooking.selectedDepartureSeats?.map((seat)=>{
                        return <p className="border-2 border-primaryBlue w-[30px] h-[30px] flex items-center justify-center">{seat}</p>
                    })}
                </div>
                
            </div>
            <div className="bg-gray-200 flex flex-col gap-y-1 p-2">
                <p className="font-bold text-lg">{`${finalBooking.returnFlight?.departure} - ${finalBooking.returnFlight?.destination}`}</p>
                <p className="text-gray-500">{`${finalBooking.returnFlight?.flightDate}  (${finalBooking.returnFlight?.takeOff} - ${finalBooking.returnFlight?.landing})`}</p>
                <p>Selected seats:</p>
                <div className="flex gap-x-2">
                    {finalBooking.selectedReturnSeats?.map((seat)=>{
                        return <p className="border-2 border-primaryBlue w-[30px] h-[30px] flex items-center justify-center">{seat}</p>
                    })}
                </div>
            </div>

            <div className="bg-gray-200 flex flex-col gap-y-1 p-2">
                <p>Card number</p>
                <input type="number" className="rounded-lg p-2" />
                <p>Cardholder name</p>
                <input type="number" className="rounded-lg p-2"/>
                <div className="flex justify-between">
                    <div>
                        <p>Expiry date</p>
                        <input type="month" className="rounded-lg p-2"/>
                    </div>
                    <div>
                        <p>CVV</p>
                        <input type="number" className="rounded-lg p-2"/>
                    </div>
                </div>
                <button className="bg-primaryBlue rounded-lg text-white my-2 py-2">Pay&book</button>
            </div>
          
        </div>
    );
}

export default FlightSummary;