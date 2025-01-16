import { useEffect, useState } from "react";
import { logoutUser} from '../services/authService'
import { useNavigate } from "react-router-dom";
import React from 'react';
import {getAllFlights} from "../services/flightService";
import {getChartData} from "../services/chartsService"
import { updateChartsData } from "../services/chartsService";
import FlightsTab from "../components/AdminFlightsTab";
import AdminDashboardCharts from "../components/AdminDashboardCharts";
import authActions from "../context/actions/auth-actions";

function AdminDashboard() {
  const navigate=useNavigate();
  const fetchData = async () => {
    await updateChartsData();
    let queryResponse = await getChartData("ChartsData");
    let querySales=[];
    queryResponse.forEach((q)=>{querySales.push({
      date: q.date,
      sales: q.sales,
      potentialSales: q.total+q.sales
    })})
    let allFlights = await getAllFlights('Flights');
    let flightsUntilToday = allFlights.filter(f=>new Date(f.flightDate)< new Date())
    setFlightsNrUntilToday(flightsUntilToday.length)
    setFlightsNr(allFlights.length)
    setSalesData(querySales)
    setOccupiedSeats(queryResponse[queryResponse.length-1].occupiedSeats)
    setFreeSeats(queryResponse[queryResponse.length-1].freeSeats)
  }
    const [occupiedSeats, setOccupiedSeats] = useState()
    const [freeSeats, setFreeSeats] = useState()
    const [salesData, setSalesData] = useState([])
    const [flightsNr, setFlightsNr] = useState(0)
    const [flightsNrUntilToday, setFlightsNrUntilToday] = useState(0)
    const [windowWidth, setWindowWidth] = useState(400)
    const [adminTab, setAdminTab] = useState('Charts')

    const updateSize=()=>{
      if(window.innerWidth>700){
        setWindowWidth(450)
      }else{
        setWindowWidth(window.innerWidth)
      }
    }

    useEffect(()=>{
        fetchData();
        window.addEventListener("resize", updateSize);

        return ()=>{window.removeEventListener('resize',updateSize)}
    },[])
    
    const handleLogOut=async()=>{
      await logoutUser(navigate);
      authActions.setUserData({
        userDetails: {},
      })}

  return (
    <div className="bg-white lg:px-[10%]">
      <section className="bg-primaryBlue w-full h-fit flex justify-between items-center lg:rounded-b-lg py-4 px-4">
        <div className="hidden lg:block"></div>
        <p className="font-bold lg:text-2xl text-white">Admin Dashboard</p>
        <button className="rounded-lg text-white" onClick={handleLogOut}>Sign out</button>
      </section>
      <section className="w-full px-4 lg:px-0 flex flex-col md:flex-row justify-between items-end gap-y-4">
        <div className="border-2 border-primaryBlue mt-4 w-full md:w-fit flex rounded-lg">
          <p onClick={()=>{setAdminTab('Charts')}} className={`${adminTab=='Charts'?'text-white bg-primaryBlue':''} text-primaryBlue duration-300 w-[50%] p-2 px-4 cursor-pointer select-none`}>Charts</p>
          <p onClick={()=>{setAdminTab('Flights')}} className={`${adminTab=='Flights'?'text-white bg-primaryBlue':''} text-primaryBlue w-[50%] duration-300 p-2 px-4 cursor-pointer select-none`}>Flights</p>
        </div>
      </section> 
      {adminTab=='Charts'?
        <AdminDashboardCharts 
          occupiedSeats={occupiedSeats} 
          flightsNrUntilToday={flightsNrUntilToday}
          freeSeats={freeSeats}
          windowWidth={windowWidth}
          salesData={salesData}
          flightsNr={flightsNr}
        />
        :<FlightsTab/>
      }
    </div>
  );
}
export default AdminDashboard;
