import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FlightSummary() {
    const navigate = useNavigate();
    const [finalBooking,setFinalBooking]=useState('');
    const [cardNumber,setCardNumber]=useState('');
    const [cardHolderName,setCardHolderName]=useState('');
    const [expiryDate,setExpiryDate]=useState('');
    const [cvv,setCvv]=useState('');
    const [paymentError,setPaymentError]=useState('');

    useEffect(()=>{
        if(!sessionStorage.getItem('currentBooking')||!sessionStorage.getItem('currentUser')){
            navigate('/')
        }else{
          setFinalBooking(JSON.parse(sessionStorage.getItem('currentBooking')))
        }
    },[])

    const handlePayment=()=>{
        if(cardNumber&&cardHolderName&&expiryDate&&cvv){
            if(cardNumber.length<16||cardNumber.length>16){
                setPaymentError('Invalid card number')
                return
            }
            if(cvv.length>3){
                setPaymentError('Invalid cvv')
                return
            }
            setPaymentError('')
            let booking = JSON.parse(sessionStorage.getItem('currentBooking'));
            console.log(booking)
        }else{
            setPaymentError('Please enter all payment details')
        }
        
    }

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
                    {finalBooking.selectedDepartureSeats?.map((seat,i)=>{
                        return <p key={i} className="border-2 border-primaryBlue w-[30px] h-[30px] flex items-center justify-center">{seat}</p>
                    })}
                </div>
                
            </div>
            <div className="bg-gray-200 flex flex-col gap-y-1 p-2">
                <p className="font-bold text-lg">{`${finalBooking.returnFlight?.departure} - ${finalBooking.returnFlight?.destination}`}</p>
                <p className="text-gray-500">{`${finalBooking.returnFlight?.flightDate}  (${finalBooking.returnFlight?.takeOff} - ${finalBooking.returnFlight?.landing})`}</p>
                <p>Selected seats:</p>
                <div className="flex gap-x-2">
                    {finalBooking.selectedReturnSeats?.map((seat,i)=>{
                        return <p key={i} className="border-2 border-primaryBlue w-[30px] h-[30px] flex items-center justify-center">{seat}</p>
                    })}
                </div>
            </div>

            <div className="bg-gray-200 flex flex-col gap-y-1 p-2">
                <p className="font-bold text-lg">Confirm payment</p>
                <p>Card number</p>
                <input value={cardNumber} onChange={(e)=>{setCardNumber(e.target.value)}} type="number" className="rounded-lg p-2" />
                <p>Cardholder name</p>
                <input value={cardHolderName} onChange={(e)=>{setCardHolderName(e.target.value)}} type="text" className="rounded-lg p-2"/>
                <div className="flex justify-between gap-x-4">
                    <div>
                        <p>Expiry date</p>
                        <input value={expiryDate} min={`${new Date().getFullYear()}-${new Date().getMonth()+1}`} onChange={(e)=>{setExpiryDate(e.target.value)}} type="month" className="rounded-lg p-2 bg-white min-w-full min-h-[40px]"/>
                    </div>
                    <div>
                        <p>CVV</p>
                        <input value={cvv} onChange={(e)=>{setCvv(e.target.value)}} type="number" className="rounded-lg p-2"/>
                    </div>
                </div>
                <p className="text-red-500">{paymentError}</p>
                <button onClick={()=>{handlePayment()}} className="bg-primaryBlue rounded-lg text-white my-2 py-2">Pay & book</button>
            </div>
          
        </div>
    );
}

export default FlightSummary;