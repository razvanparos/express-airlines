import { useNavigate } from "react-router-dom";
import { getUserDetails, logoutUser} from '../services/authService'
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import {removePaymentMethod} from '../services/paymentService'
import { AppContext } from "../context/AppContext";
import MyBookingCard from "../components/MyBookingCard";


function UserDashboard() {
    const navigate = useNavigate();
    const [expandBookings, setExpandBookings] = useState(true);
    const [expandPayment, setExpandPayment] = useState(true); 
    const {dispatch, state}=useContext(AppContext)
    const { userDetails } = state;

    useEffect(()=>{
      if(!sessionStorage.getItem('currentUser')){
          navigate('/')
      }
  },[])
  
  const handleRemoveCard=async(id)=>{
    await removePaymentMethod(id);
    let response = await getUserDetails("UsersDetails")
    dispatch({
        type: "SET_USER_DATA",
        payload: {
            userDetails: response,
        },
    });
  }
  
  const handleLogOut=async()=>{
    await logoutUser(navigate);
    dispatch({
      type: "SET_USER_DATA",
      payload: {
        userDetails: {},
      },
    });
  }

  return (
    <article className="bg-gray-200 flex flex-col gap-y-1 pb-4 select-none">
        <h3 className="bg-primaryBlue text-white w-full text-center text-lg py-4 font-semibold">User dashboard</h3>
        <div className="2xl:px-[10%] flex flex-col items-center">
          <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2"><FaUser />{userDetails[0]?.fullName}</p>
          <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2"><MdEmail />{userDetails[0]?.email}</p>
          <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2"><FaPhone />{userDetails[0]?.phone}</p>
          
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
          </section>

          <button className="bg-darkBlue rounded-lg w-[50%] text-white p-3 2xl:rounded-lg 2xl:w-[10%]" onClick={handleLogOut}>Sign out</button>
        </div>
    </article>
  );
}

export default UserDashboard;
