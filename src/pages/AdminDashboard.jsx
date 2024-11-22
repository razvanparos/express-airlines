import { useContext, useEffect, useState } from "react";
import { logoutUser} from '../services/authService'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip  } from 'recharts';
import homeService from "../services/homeService";
import { updateChartsData } from "../services/chartsService";
import FlightsTab from "../components/AdminFlightsTab";
import { AppContext } from "../context/AppContext";


function AdminDashboard() {
  const {removeUserData}=useContext(AppContext)
  const COLORS = ['green','#0062E3'];
  const COLORS2 = ['purple','#0062E3'];
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const navigate=useNavigate();
  const fetchData = async () => {
    await updateChartsData();
    let queryResponse = await homeService.getChartData("ChartsData");
    let querySales=[];
    queryResponse.forEach((q)=>{querySales.push({
      date: q.date,
      sales: q.sales,
      potentialSales: q.total+q.sales
    })})
    let allFlights = await homeService.getAllFlights('Flights');
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
      removeUserData();
    }

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
      <article className="py-[20px] flex flex-col xl:grid xl:grid-cols-3 lg:gap-x-8 items-center px-4 lg:px-0 gap-y-[16px]">
        <section className="h-full flex flex-col justify-between items-center relative bg-gray-200 rounded-lg w-full p-4">
            <p className="text-lg">{`Flights until ${new Date().getDate()} ${MONTHS[new Date().getMonth()]} ${new Date().getFullYear()}`}</p>
            <PieChart width={200} height={200} >
              <Pie
                data={[
                  { name: 'Completed flights until today', value: flightsNrUntilToday },
                  { name: 'Upcoming flights', value: flightsNr-flightsNrUntilToday },
                ]}
                innerRadius={60}
                outerRadius={90}
                fill="#00C49F"
                paddingAngle={0}
                dataKey="value"
              >
                {
                  [{ name: 'Completed flights until today', value: flightsNrUntilToday },
                    { name: 'Upcoming flights', value: flightsNr-flightsNrUntilToday },
                  ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />))
                }
              </Pie>
              <Tooltip />
            </PieChart>
            <p className="absolute text-black bottom-[48%] lg:bottom-[48%] font-bold">{`${flightsNrUntilToday} / ${flightsNr}`}</p> 
            <div>
              <div className="flex items-center gap-x-2">
                <div className="w-[15px] h-[15px] bg-[purple]"></div>
                <p>Completed flights until today</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-[15px] h-[15px] bg-[#0062E3]"></div>
                <p>Upcoming flights</p>
              </div>
            </div>
        </section>

        <section className="h-fit flex flex-col items-center relative bg-gray-200 rounded-lg w-full p-4 ">
          <p>Sales</p>
          <AreaChart
            className="text-xs"
            width={windowWidth-20}
            height={250}
            data={salesData}
            margin={{
              top: 0,
              right: 35,
              left: -10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date"/>
            <YAxis className="text-[10px]"/>
            <Tooltip />
            <Area type="monotone" dataKey="sales" stackId="1" stroke="#0062E3" fill="#0062E3" strokeWidth={4} />
            <Area type="monotone" dataKey="potentialSales" stackId="1" stroke="#82ca9d" fill="#82ca9d" strokeWidth={4}/>
          </AreaChart>
        </section>
        
        <section className="h-full flex flex-col justify-between items-center relative bg-gray-200 rounded-lg w-full p-4">
          <p className="text-lg">Occupied Seats</p>
            <PieChart width={200} height={200} >
              <Pie
                data={[
                  { name: 'Occupied Seats', value: occupiedSeats },
                  { name: 'Free Seats', value: freeSeats },
                ]}
                innerRadius={60}
                outerRadius={90}
                fill="#00C49F"
                paddingAngle={0}
                dataKey="value"
              >
                {[
                  { name: 'Occupied Seats', value: occupiedSeats },
                  { name: 'Free Seats', value: freeSeats },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          <p className="absolute text-black bottom-[48%] lg:bottom-[48%] font-bold">{`${occupiedSeats} / ${freeSeats+occupiedSeats}`}</p>  
          <div>
              <div className="flex items-center gap-x-2">
                <div className="w-[15px] h-[15px] bg-[green]"></div>
                <p>Occupied seats</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-[15px] h-[15px] bg-[#0062E3]"></div>
                <p>Free seats</p>
              </div>
            </div>      
        </section>
      </article>
      :<FlightsTab/>}
    </div>
  );
}

export default AdminDashboard;
