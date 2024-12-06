import { updateChartsData } from "../services/chartsService";
import { bookFlight} from '../services/flightService'
import Loader from "../components/Loader";
import {savePaymentInfo} from '../services/paymentService'
import {updateDbSeats} from '../services/flightService'
import { useState,useContext } from "react";
import { AppContext } from "../context/AppContext";
import { getUserDetails } from "../services/authService";
import authActions from "../context/actions/auth-actions";

function ConfirmPaymentFrom(props) {
    const [cardNumber,setCardNumber]=useState('');
    const [cardHolderName,setCardHolderName]=useState('');
    const [expiryDate,setExpiryDate]=useState('');
    const [cvv,setCvv]=useState('');
    const [paymentError,setPaymentError]=useState('');
    const [savePayment,setSavePayment]=useState(false);
    const [loading,setLoading]=useState(false);

    const {dispatch}=useContext(AppContext)

    const useSavedPayments=()=>{
        setCardNumber(props.savedPaymentMethods[0].cardNumber);
        setCardHolderName(props.savedPaymentMethods[0].cardHolderName);
        setExpiryDate(props.savedPaymentMethods[0].expiryDate);
        setCvv(props.savedPaymentMethods[0].cvv);
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
            await updateDbSeats(booking);
            sessionStorage.removeItem('currentBooking')
            let response = await getUserDetails("UsersDetails")
            authActions.setUserData({
                userDetails: response
            })
            updateChartsData();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            props.setThankYou(true);
            props.timeoutRef.current = setTimeout(()=>{
               props.navigate('/')
            },15000)
        }else{
            setPaymentError('Please enter all payment details')
        }
        setLoading(false)
    }
  return (
    <div className=" flex flex-col gap-y-1 p-2 bg-gray-200 2xl:px-[10%] 2xl:max-w-[800px]">
        <p className="font-bold text-lg">Confirm payment</p>
            {props.savedPaymentMethods.length>0?<button onClick={useSavedPayments} className="text-start bg-primaryBlue w-fit text-white text-sm rounded-lg">Use saved payment method</button>:''}
            <p>Card number</p>
            <input value={cardNumber}  onChange={(e) => {
                let value = e.target.value.replace(/\s+/g, '');
                if (/^\d*$/.test(value)) { 
                    value = value.match(/.{1,4}/g)?.join(' ') || '';  
                    }
                    setCardNumber(value);
                    }}  
                type="text" className="rounded-lg p-2"   maxLength="19"
            />
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
  );
}

export default ConfirmPaymentFrom;



