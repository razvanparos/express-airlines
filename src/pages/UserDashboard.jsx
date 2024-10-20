import { useNavigate } from "react-router-dom";
import {logoutUser} from '../services/loginService'
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import {removePaymentMethod} from '../services/removePaymentMethod'

function UserDashboard(props) {
    const navigate = useNavigate();
    const [expandBookings, setExpandBookings] = useState(false);
    const [expandPayment, setExpandPayment] = useState(false);
    useEffect(()=>{
      if(!sessionStorage.getItem('currentUser')){
          navigate('/')
      }
  },[])

  const handleRemoveCard=async(id)=>{
    await removePaymentMethod(id);
    props.fetchUserData();
  }

  const handleLogOut=async()=>{
    await logoutUser(navigate);
    props.removeUserData();
  }

  return (
    <article className="bg-gray-200 flex flex-col gap-y-1 pb-4 select-none">
        <h3 className="bg-primaryBlue text-white w-full text-center text-lg py-4 font-semibold">User dashboard</h3>
        <div className="2xl:px-[10%]">
          <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2"><FaUser />{props.userData?.displayName}</p>
          <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2"><MdEmail />{props.userData?.email}</p>
          <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2"><FaPhone />{props.userDetails?.phone}</p>
          
          <section  className={`bg-gray-200 p-3 w-full duration-200 ${expandBookings?'h-fit':'h-[50px] overflow-hidden'}`}>
            <div onClick={()=>{setExpandBookings(!expandBookings)}} className="flex justify-between cursor-pointer">
              <p className="font-semibold mb-4 ">{`My bookings`}</p>
              <MdKeyboardArrowDown className={`font-bold text-3xl ${expandBookings?'rotate-180':''}`}/>
            </div>
            <div className="flex flex-col gap-y-2">
              {props.userDetails?.bookedFlights.map((b,i)=>{
                return <section key={i} className="border-2 border-primaryBlue flex justify-between p-2">
                  <div className="flex flex-col">
                    <p className="font-bold">Departure</p>
                    <p>{b.departureFlight.departure}</p>
                    <p>{b.departureFlight.destination}</p>
                    <p>{b.departureFlight.flightDate}</p>
                    <p>{b.departureFlight.takeOff}-{b.departureFlight.landing}</p>
                    <div className="flex flex-wrap gap-x-2 max-w-[60%]">{b.selectedDepartureSeats.map((s,i)=>{
                        return <div className="text-primaryBlue font-bold" key={i}>{s}</div>
                    })}</div>
                  </div>
                  <div className="flex flex-col text-end items-end">
                    <p className="font-bold">Return</p>
                    <p className="">{b.returnFlight.departure}</p>
                    <p className="">{b.returnFlight.destination}</p>
                    <p>{b.returnFlight.flightDate}</p>
                    <p>{b.returnFlight.takeOff}-{b.returnFlight.landing}</p>
                    <div className="flex flex-wrap gap-x-2 max-w-[60%]">{b.selectedReturnSeats.map((s,i)=>{
                        return <div className="text-primaryBlue font-bold" key={i}>{s}</div>
                    })}</div>
                  </div>
                </section>
              })}
            </div>
          </section>

          <section className="bg-gray-200 p-3 w-full">
            <div onClick={()=>{setExpandPayment(!expandPayment)}} className="flex justify-between cursor-pointer">
              <p className="font-semibold ">{`Payment methods`}</p>
              <MdKeyboardArrowDown className={`font-bold text-3xl ${expandPayment?'rotate-180':''}`}/>
            </div>
            <div className={`${expandPayment?'h-fit':'h-0 overflow-hidden pointer-events-none'} flex flex-col gap-y-2`}>
              {props.userDetails?.paymentMethods.map((b,i)=>{
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

          <button className="bg-darkBlue text-white w-full p-3 2xl:rounded-lg 2xl:w-[10%]" onClick={handleLogOut}>Sign out</button>
        </div>
    </article>
  );
}

export default UserDashboard;
