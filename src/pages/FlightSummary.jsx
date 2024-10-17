import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookFlight} from '../services/bookFlight'
import Loader from "../components/Loader";
import {savePaymentInfo} from '../services/savePaymentInfo'
import {updateFlightSeats} from '../services/updateFlightSeats'
import { FaCheck } from "react-icons/fa";

function FlightSummary() {
    const navigate = useNavigate();
    const [finalBooking,setFinalBooking]=useState('');
    const [cardNumber,setCardNumber]=useState('');
    const [cardHolderName,setCardHolderName]=useState('');
    const [expiryDate,setExpiryDate]=useState('');
    const [cvv,setCvv]=useState('');
    const [paymentError,setPaymentError]=useState('');
    const [savePayment,setSavePayment]=useState(false);
    const [loading,setLoading]=useState(false);
    const [thankYou,setThankYou]=useState(false);

    useEffect(()=>{
        if(!sessionStorage.getItem('currentBooking')||!sessionStorage.getItem('currentUser')){
            navigate('/')
        }else{
          setFinalBooking(JSON.parse(sessionStorage.getItem('currentBooking')))
        }
    },[])

    const handlePayment=async()=>{
        setLoading(true)
        if(cardNumber&&cardHolderName&&expiryDate&&cvv){
            if(cardNumber.length<19||cardNumber.length>19){
                setPaymentError('Invalid card number')
                return
            }
            if(cvv.length>3){
                setPaymentError('Invalid cvv')
                return
            }
            setPaymentError('')
            let booking = JSON.parse(sessionStorage.getItem('currentBooking'));
            if(savePayment){
                var newId = "id" + Math.random().toString(16).slice(2)
                let paymentInfo={
                    id: newId,
                    cardNumber: cardNumber,
                    cardHolderName: cardHolderName,
                    expiryDate: expiryDate,
                    cvv: cvv
                }
                await savePaymentInfo(paymentInfo)
            }
            await bookFlight(booking);
            await updateFlightSeats(booking);
            sessionStorage.removeItem('currentBooking')
            setThankYou(true);
            setTimeout(()=>{
                navigate('/')
            },15000)
        }else{
            setPaymentError('Please enter all payment details')
        }
        setLoading(false)
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
                <input value={cardNumber}  onChange={(e) => {
                    let value = e.target.value.replace(/\s+/g, '');
                    if (/^\d*$/.test(value)) { 
                    value = value.match(/.{1,4}/g)?.join(' ') || '';  
                    }
                    setCardNumber(value);
                }}  type="text" className="rounded-lg p-2"   maxLength="19"/>
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
                <div className="flex gap-x-2">
                    <input type="checkbox" className="w-[20px]" value={savePayment} onChange={()=>{setSavePayment(!savePayment)}}/>
                    <p className="font-semibold">Save payment method</p>
                </div>
                <p className="text-red-500">{paymentError}</p>
                <button onClick={()=>{handlePayment()}} className="bg-primaryBlue rounded-lg text-white my-2 py-2">{loading?<Loader/>:'Pay & Book'}</button>
            </div>
          

          <div className={`flex flex-col gap-y-4 pt-20 items-center ${thankYou?'opacity-100 backdrop-blur-xl pointer-events-auto':'opacity-0 pointer-events-none'} z-2 absolute overflow-hidden duration-500 h-[100vh] w-full`}>
                <p className="font-bold text-2xl">Thank you!</p>
                <FaCheck className="text-white bg-primaryBlue p-4 rounded-full w-[60px] h-[60px]"/>
                <p className="text-lg font-semibold">Flight successfully booked</p>
                <button className="bg-darkBlue text-white p-2 rounded-lg">View booked flights</button>
                <button onClick={()=>{navigate('/')}} className="bg-darkBlue text-white p-2 rounded-lg">Home</button>
          </div>
        </div>
    );
}

export default FlightSummary;