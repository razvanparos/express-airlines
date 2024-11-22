import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookFlight} from '../services/flightService'
import Loader from "../components/Loader";
import {savePaymentInfo} from '../services/paymentService'
import {updateFlightSeats} from '../services/chartsService'
import { FaCheck } from "react-icons/fa";
import { updateChartsData } from "../services/chartsService";
import { AppContext } from "../context/AppContext";
import homeService from "../services/homeService";

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
    const [savedPaymentMethods, setSavedPaymentMethods]=useState('');
    const timeoutRef = useRef(null);

    const {fetchUserData}=useContext(AppContext)

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
        let sessionDetails = await homeService.getUserDetails("UsersDetails");
        setSavedPaymentMethods(sessionDetails[0]?.paymentMethods);
    }

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
            fetchUserData();
            updateChartsData();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setThankYou(true);
            timeoutRef.current = setTimeout(()=>{
                navigate('/')
            },15000)
        }else{
            setPaymentError('Please enter all payment details')
        }
        setLoading(false)
    }

    const useSavedPayments=()=>{
        setCardNumber(savedPaymentMethods[0].cardNumber);
        setCardHolderName(savedPaymentMethods[0].cardHolderName);
        setExpiryDate(savedPaymentMethods[0].expiryDate);
        setCvv(savedPaymentMethods[0].cvv);
    }

    return (
        <article className="flex flex-col bg-gray-200 justify-center">
            <div className="flex justify-between items-center px-2 py-4 bg-primaryBlue 2xl:px-[10%]">
                <p className="text-lg font-bold text-white">{`Trip for ${finalBooking.adultsNumber} ${finalBooking.adultsNumber===1?'passenger':'passengers'} `}</p>
                <p className="text-white text-xl font-bold">${finalBooking.total}</p>
            </div>
                <div className="2xl:px-[10%]">
                    <div className="flex flex-col gap-y-1 p-2 bg-gray-200">
                        <p className="font-bold text-lg">{`${finalBooking.departureFlight?.departure} - ${finalBooking.departureFlight?.destination}`}</p>
                        <p className="text-gray-500">{`${finalBooking.departureFlight?.flightDate}  (${finalBooking.departureFlight?.takeOff} - ${finalBooking.departureFlight?.landing})`}</p>
                        <p>Selected seats:</p>
                        <div className="flex gap-x-2">
                            {finalBooking.selectedDepartureSeats?.map((seat,i)=>{
                                return <p key={i} className="border-2 border-primaryBlue w-[30px] h-[30px] flex items-center justify-center">{seat}</p>
                        })}
                        </div>   
                    </div>
                    <div className="flex flex-col gap-y-1 p-2 bg-gray-200">
                        <p className="font-bold text-lg">{`${finalBooking.returnFlight?.departure} - ${finalBooking.returnFlight?.destination}`}</p>
                        <p className="text-gray-500">{`${finalBooking.returnFlight?.flightDate}  (${finalBooking.returnFlight?.takeOff} - ${finalBooking.returnFlight?.landing})`}</p>
                        <p>Selected seats:</p>
                        <div className="flex gap-x-2">
                            {finalBooking.selectedReturnSeats?.map((seat,i)=>{
                                return <p key={i} className="border-2 border-primaryBlue w-[30px] h-[30px] flex items-center justify-center">{seat}</p>
                            })}
                        </div>
                    </div>
                </div> 
                
                <div className=" flex flex-col gap-y-1 p-2 bg-gray-200 2xl:px-[10%] 2xl:max-w-[800px]">
                    <p className="font-bold text-lg">Confirm payment</p>
                    {savedPaymentMethods.length>0?<button onClick={useSavedPayments} className="text-start bg-primaryBlue w-fit text-white text-sm rounded-lg">Use saved payment method</button>:''}
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
                    <div className="flex flex-col justify-between gap-x-4">
                        <div>
                            <p>Expiry date</p>
                            <input value={expiryDate} min={`${new Date().getFullYear()}-${new Date().getMonth()+1}`} onChange={(e)=>{setExpiryDate(e.target.value)}} type="month" className="rounded-lg p-2 bg-white min-w-full min-h-[40px]"/>
                        </div>
                        <div>
                            <p>CVV</p>
                            <input value={cvv} onChange={(e)=>{setCvv(e.target.value)}} type="number" className="rounded-lg p-2 w-full"/>
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
                <button onClick={()=>{navigate('/user-dashboard')}} className="bg-darkBlue text-white p-2 rounded-lg">View booked flights</button>
                <button onClick={()=>{navigate('/')}} className="bg-darkBlue text-white p-2 rounded-lg">Home</button>
          </div>
         </article>
    );
}

export default FlightSummary;


