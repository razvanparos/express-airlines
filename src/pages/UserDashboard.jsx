import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {logoutUser} from '../services/loginService'
import { useEffect } from "react";


function UserDashboard() {
    const navigate = useNavigate();
    const { state, dispatch} = useAuth();
    const { currentUser, currentUserPhone } = state;
    useEffect(()=>{
        if(!currentUser){
            navigate('/');
        }
    },[])
  return (
    <div className="min-h-[565px]">
        <p>User dashboard</p>
        <p>{`Name: ${currentUser?.displayName}`}</p>
        <p>{`Email: ${currentUser?.email}`}</p>
        <p>{`Phone number: ${currentUserPhone}`}</p>
        {currentUser?<button onClick={()=>{logoutUser(dispatch,navigate)}}>Sign out</button>:''}
    </div>
  );
}

export default UserDashboard;
