
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { collection, query, where, getDocs  } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState } from "react";


function Home() {
    const [from, setFrom]=useState('');
    const [to, setTo]=useState('');


    const getFLights=async(e)=>{
      e.preventDefault();
      const flightsRef = collection(db, "Flights");
          const q = query(flightsRef, where("from", "==", from), where("to","==",to));
          const querySnapshot = await getDocs(q);
          const filteredData = querySnapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
        }))
        console.log(filteredData)
    }

    return (
      <main className="py-4 flex flex-col items-center gap-y-4 min-h-[565px]">
        <p className="font-bold">Plane tickets, city break, trips! Book now!</p>
        
        <form onSubmit={getFLights} action="" className="flex flex-col w-[95%] max-w-[500px]">
          
          <div className="flex items-center gap-x-2 text-xl">
            <label htmlFor="">From</label>
            <FaPlaneDeparture />
          </div>
          <input type="text" className="border-2" value={from} onChange={(e)=>{setFrom(e.target.value)}}/>
          
          <div className="flex items-center gap-x-2 text-xl">
             <label htmlFor="">To</label>
             <FaPlaneArrival />
          </div>
          <input type="text" className="border-2" value={to} onChange={(e)=>{setTo(e.target.value)}}/>
          
          <div className="flex items-center gap-x-2 text-xl">
             <label htmlFor="">Departure</label>
          </div>
          <input type="date" className="border-2"/>
          
          <div className="flex items-center gap-x-2 text-xl">
             <label htmlFor="">Return</label>
          </div>
          <input type="date" className="border-2"/>

          <div className="flex items-center gap-x-2 text-xl">
             <label htmlFor="">Passengers</label>
          </div>
          <input type="number" className="border-2" defaultValue={1}/>
        
          <button type="submit" className="bg-blue-300 text-white font-semibold my-4">Explore</button>
        </form>
      </main>
    );
  }
  
  export default Home;