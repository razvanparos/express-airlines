import { useNavigate } from "react-router-dom";
import {logoutUser} from '../services/loginService'
import { useEffect } from "react";


function UserDashboard(props) {
    const navigate = useNavigate();

  return (
    <div className="min-h-[565px]">
        <p>User dashboard</p>
        <p>{`Name: ${props.userData?.displayName}`}</p>
        <p>{`Email: ${props.userData?.email}`}</p>
        {/* <p>{`Phone number: ${props.userData}`}</p> */}
        <button onClick={()=>{logoutUser(navigate)}}>Sign out</button>
    </div>
  );
}

export default UserDashboard;
