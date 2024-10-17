import { useNavigate } from "react-router-dom";
import {logoutUser} from '../services/loginService'
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

function UserDashboard(props) {
    const navigate = useNavigate();
    const [expandBookings, setExpandBookings] = useState(false);
    useEffect(()=>{
      if(!sessionStorage.getItem('currentUser')){
          navigate('/')
      }
  },[])

  return (
    <main className="bg-white flex flex-col gap-y-1 items-center pb-4">
        <h3 className="bg-primaryBlue text-white w-full text-center text-lg py-4 font-semibold">User dashboard</h3>
        <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2"><FaUser />{props.userData?.displayName}</p>
        <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2"><MdEmail />{props.userData?.email}</p>
        <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2"><FaPhone />{props.userDetails?.phone}</p>
        
        <article  className={`bg-gray-200 p-3 w-full duration-200 ${expandBookings?'h-fit':'h-[50px] overflow-hidden'}`}>
          <div onClick={()=>{setExpandBookings(!expandBookings)}} className="flex justify-between">
            <p className="font-semibold mb-4">{`My bookings`}</p>
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
        </article>
        <article className="bg-gray-200 p-3 w-full">
          <p className="font-semibold">{`Payment methods`}</p>
        </article>
        <button className="bg-darkBlue text-white w-full p-3" onClick={()=>{logoutUser(navigate)}}>Sign out</button>
    </main>
  );
}

export default UserDashboard;
