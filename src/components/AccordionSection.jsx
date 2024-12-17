import { useContext, useState } from "react";
import {removePaymentMethod} from '../services/paymentService'
import { getUserDetails } from '../services/authService'
import authActions from "../context/actions/auth-actions";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import MyBookingCard from "../components/MyBookingCard";

function AccordionSection(props){
    const [expandBookings, setExpandBookings] = useState(true);
    const [expandPayment, setExpandPayment] = useState(true); 
    const {state}=useContext(AppContext)
    const { userDetails } = state;

    const handleRemoveCard=async(id)=>{
        await removePaymentMethod(id);
        let response = await getUserDetails("UsersDetails")
        authActions.setUserData({
          userDetails: response
        })}
    return(
       <>
        {props.type==='bookings'?
        <section  className={`bg-gray-200 p-3 w-full duration-200 ${expandBookings?'h-fit':'h-[50px] overflow-hidden'}`}>
        <div onClick={()=>{setExpandBookings(!expandBookings)}} className="flex justify-between cursor-pointer">
            <p className="font-semibold mb-4 ">{`My bookings`}</p>
            <MdKeyboardArrowDown className={`font-bold text-3xl ${expandBookings?'rotate-180':''}`}/>
        </div>
        <div className="flex flex-col gap-y-2">
            {userDetails[0]?.bookedFlights?.map((b,i)=>{
            return <MyBookingCard key={i} b={b}/>
            })}
        </div>
        </section>

        :
        
        <section className="bg-gray-200 p-3 w-full">
            <div onClick={()=>{setExpandPayment(!expandPayment)}} className="flex justify-between cursor-pointer">
              <p className="font-semibold ">{`Payment methods`}</p>
              <MdKeyboardArrowDown className={`font-bold text-3xl ${expandPayment?'rotate-180':''}`}/>
            </div>
            <div className={`${expandPayment?'h-fit':'h-0 overflow-hidden pointer-events-none'} flex flex-col gap-y-2`}>
              {userDetails[0]?.paymentMethods?.map((b,i)=>{
                return <section key={i} className="border-2 border-primaryBlue flex items-center justify-between p-2">
                  <div className="flex flex-col">
                    <p className="font-bold">{b.cardHolderName}</p>
                    <p>**** **** **** {b.cardNumber.substr(b.cardNumber.length - 4)}</p>
                    <p>{b.expiryDate}</p>
                  </div>
                  <div className="text-end flex flex-col gap-y-4">
                    <p>**{b.cvv[2]}</p>
                    <button onClick={()=>{handleRemoveCard(b.id)}} className="text-white bg-red-500 rounded-lg text-sm">Remove</button>
                  </div>
                </section>
              })}
            </div>
          </section>}
       </>
    );
}
export default AccordionSection;