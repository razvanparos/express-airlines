import { updateChartsData } from "../services/chartsService";
import { bookFlight} from '../services/flightService'
import Loader from "../components/Loader";
import {savePaymentInfo} from '../services/paymentService'
import {updateDbSeats} from '../services/flightService'
import { useState } from "react";
import { getUserDetails } from "../services/authService";
import authActions from "../context/actions/auth-actions";
import FormRow from "../components/FormRow";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

function ConfirmPaymentFrom(props) {
    const initialPaymentState={
        cardNumber:'',
        cardHolderName:'',
        expiryDate:'',
        cvv:'',
        paymentError:'',
        savePayment:false,
        loading:false
      }
  
      const [paymentState,setPaymentState] = useState(initialPaymentState)
      const navigate = useNavigate();
      const changePaymentStateField = (fieldname,value)=>{
        setPaymentState((prevState) => ({
          ...prevState,
          [fieldname]: value,
        }));
      }
   

    const handleCardNumberChange=(e)=>{
        let value = e.target.value.replace(/\s+/g, '');
        if (/^\d*$/.test(value)) { 
            value = value.match(/.{1,4}/g)?.join(' ') || '';}
        changePaymentStateField('cardNumber',value)
    }

    const useSavedPayments=()=>{
        changePaymentStateField('cardNumber',props.savedPaymentMethods[0].cardNumber)
        changePaymentStateField('cardHolderName',props.savedPaymentMethods[0].cardHolderName)
        changePaymentStateField('expiryDate',props.savedPaymentMethods[0].expiryDate)
        changePaymentStateField('cvv',props.savedPaymentMethods[0].cvv)
    }

    const handlePayment=async()=>{
        changePaymentStateField('loading',true)
        if(paymentState.cardNumber&&paymentState.cardHolderName&&paymentState.expiryDate&&paymentState.cvv){
            if(paymentState.cardNumber.length<19||paymentState.cardNumber.length>19){
                changePaymentStateField('paymentError','Invalid card number')
                return
            }
            if(paymentState.cvv.length>3){
                changePaymentStateField('paymentError','Invalid cvv')
                return
            }
            changePaymentStateField('paymentError','')
            let booking = JSON.parse(sessionStorage.getItem('currentBooking'));
            if(paymentState.savePayment){
                var newId = "id" + Math.random().toString(16).slice(2)
                let paymentInfo={
                    id: newId,
                    cardNumber: paymentState.cardNumber,
                    cardHolderName: paymentState.cardHolderName,
                    expiryDate: paymentState.expiryDate,
                    cvv: paymentState.cvv
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
            changePaymentStateField('paymentError','Please enter all payment details')
        }
        changePaymentStateField('loading',false)
    }
  return (
    <div className=" flex flex-col gap-y-1 py-4 bg-gray-200 2xl:max-w-[800px]">
        <p className="font-bold text-lg">Confirm payment</p>
        {props.savedPaymentMethods.length>0?<ButtonComponent buttonFunction={useSavedPayments} buttonText={'Use saved payment method'} buttonType={'primary-small'}/>:''}
        <FormRow type={'text'} value={paymentState.cardNumber} labelText={'Card number'} onChangeFunction={(e) => {handleCardNumberChange(e)}}
        />
        <FormRow type={'text'} value={paymentState.cardHolderName} labelText={'Cardholder name'} onChangeFunction={(e)=>{changePaymentStateField('cardHolderName',e.target.value)}}/>
        <div className="flex flex-col justify-between gap-x-4">
            <div>
                <p>Expiry date</p>
                <input value={paymentState.expiryDate} min={`${new Date().getFullYear()}-${new Date().getMonth()+1}`} onChange={(e)=>{changePaymentStateField('expiryDate',e.target.value)}} type="month" className="rounded-lg p-2 bg-white min-w-full min-h-[40px]"/>
            </div>
            <div>
                <p>CVV</p>
                <input value={paymentState.cvv} onChange={(e)=>{changePaymentStateField('cvv',e.target.value)}} type="number" className="rounded-lg p-2 w-full"/>            
            </div>
        </div>
        <div className="flex gap-x-2">
            <input type="checkbox" className="w-[20px]" value={paymentState.savePayment} onChange={()=>{changePaymentStateField('savePayment',!paymentState.savePayment)}}/>
            <p className="font-semibold">Save payment method</p>
        </div>
        <p className="text-red-500">{paymentState.paymentError}</p>
        <ButtonComponent buttonType={'primary'} buttonText={paymentState.loading?<Loader/>:'Pay & Book'} buttonFunction={()=>{handlePayment()}}/>
        <ButtonComponent buttonType={''} buttonText={'Back'} buttonFunction={()=>{navigate(-1)}}/>
    </div>
  );
}

export default ConfirmPaymentFrom;



