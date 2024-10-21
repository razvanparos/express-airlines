import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, query, getDocs  } from "firebase/firestore";
import { logoutUser} from '../services/loginService'
import { useNavigate } from "react-router-dom";


function AdminDashboard(props) {
  const navigate=useNavigate();
  const getFlights = async () => {
    try {
      const flightsRef = collection(db, "Flights");
      const q = query(flightsRef);
      const querySnapshot = await getDocs(q);
      const filteredData = querySnapshot.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id,
    }))
    setAllFlights(filteredData) ;
    } catch (error) {
      console.error(error);
    }};
    const [allFLights, setAllFlights] = useState([])
    useEffect(()=>{
      getFlights();
    },[])

    const handleLogOut=async()=>{
      await logoutUser(navigate);
      props.removeUserData();
    }

  return (
    <div className="bg-white 2xl:px-[10%] py-[20px]">
      <p>Total flights: {allFLights.length}</p>
      <div className="flex">
        <p>{allFLights?.reduce((total,f)=>{f.seats.forEach((s)=>{if(s.occupied){total+=1}}) 
          return total;},0)}
        </p>
      /
      <p>{allFLights?.reduce((total,f)=>total+f.seats.length,0)} Seats occupied</p>
      </div>
      
      <div className="flex">
          <p>${allFLights?.reduce((total, flight) => {
          const occupiedSeatsCount = flight.seats.filter(seat => seat.occupied).length;
          return total + (flight.pricePerSeat * occupiedSeatsCount);
        }, 0)}
      </p><p className="mx-2">/</p> 
      <p>${allFLights?.reduce((total,f)=>total+(f.pricePerSeat*f.freeSeats),0)}</p>
      </div>
      <button className="bg-darkBlue rounded-lg w-[50%] text-white p-3 2xl:rounded-lg 2xl:w-[10%]" onClick={handleLogOut}>Sign out</button>

    </div>
  );
}

export default AdminDashboard;
