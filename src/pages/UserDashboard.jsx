import { useNavigate } from "react-router-dom";
import {logoutUser} from '../services/authService'
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import authActions from "../context/actions/auth-actions";
import InfoRow from "../components/InfoRow";
import AccordionSection from "../components/AccordionSection";

function UserDashboard() {
    const navigate = useNavigate();
    const { state }=useContext(AppContext)
    const { userDetails } = state;

    useEffect(()=>{
      if(!sessionStorage.getItem('currentUser')){
          navigate('/')
      }
  },[])
  
  const handleLogOut=async()=>{
    await logoutUser(navigate);
    authActions.setUserData({
      userDetails: {}
    })}

  return (
    <article className="bg-gray-200 flex flex-col gap-y-1 pb-4 select-none">
        <h3 className="bg-primaryBlue text-white w-full text-center text-lg py-4 font-semibold">User dashboard</h3>
        <div className="2xl:px-[10%] flex flex-col items-center">
          <InfoRow text={userDetails[0]?.fullName} icon={<FaUser />}/>
          <InfoRow text={userDetails[0]?.email} icon={<MdEmail />}/>
          <InfoRow text={userDetails[0]?.phone} icon={<FaPhone />}/>
          <AccordionSection type ={'bookings'}/>
          <AccordionSection type ={'payments'}/>
          <button className="bg-darkBlue rounded-lg w-[50%] text-white p-3 2xl:rounded-lg 2xl:w-[10%]" onClick={handleLogOut}>Sign out</button>
        </div>
    </article>
  );
}

export default UserDashboard;
