import { useEffect, useState } from "react";
import { logoutUser} from '../services/loginService'
import { useNavigate } from "react-router-dom";
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer  } from 'recharts';
import homeService from "../services/homeService";


function AdminDashboard(props) {
  const COLORS = ['green','#0062E3'];
  const navigate=useNavigate();
  const fetchData = async () => {
    let queryResponse = await homeService.getChartData();
    let querySales=[];
    queryResponse.forEach((q)=>{querySales.push({
      date: q.date,
      sales: q.sales,
      potentialSales: q.total+q.sales
    })})
    setSalesData(querySales)
    setOccupiedSeats(queryResponse[queryResponse.length-1].occupiedSeats)
    setFreeSeats(queryResponse[queryResponse.length-1].freeSeats)
    setUpdatedSales(queryResponse[queryResponse.length-1].sales)
    setUpdatedTotalSales(queryResponse[queryResponse.length-1].total+queryResponse[queryResponse.length-1].sales)
  }
  
    const [occupiedSeats, setOccupiedSeats] = useState()
    const [freeSeats, setFreeSeats] = useState()
    const [updatedSales, setUpdatedSales] = useState(0)
    const [updatedTotalSales, setUpdatedTotalSales] = useState(0)
    const [salesData, setSalesData] = useState([])
    const [windowWidth, setWindowWidth] = useState(400)
    
    useEffect(()=>{
        fetchData();
    },[])
    const updateSize=()=>{
      if(window.innerWidth>700){
        setWindowWidth(450)
      }else{
        setWindowWidth(window.innerWidth)
      }
      
    }
    window.addEventListener("resize", updateSize);
    

    const handleLogOut=async()=>{
      await logoutUser(navigate);
      props.removeUserData();
    }

    const seatsData = [
      { name: 'Occupied Seats', value: occupiedSeats },
      { name: 'Free Seats', value: freeSeats },
    ];
    // const salesData = [
    //   {
    //     name: '10/23/2024',
    //     sales: 400,
    //     potentialSales: 1600
       
    //   },
    //   {
    //     name: '10/24/2024',
    //     sales: 800,
    //     potentialSales: 2500
       
    //   },
    //   {
    //     name: '10/25/2024',
    //     sales: 1600,
    //     potentialSales: 2800
    //   },
    //   {
    //     name: '10/23/2024',
    //     sales: 400,
    //     potentialSales: 1600
       
    //   },
    //   {
    //     name: '10/24/2024',
    //     sales: 800,
    //     potentialSales: 2500
       
    //   },
    // ];

  return (
    <div className="bg-white lg:px-[10%] ">

      <section className="bg-primaryBlue w-full h-fit flex justify-between items-center lg:rounded-b-lg py-4 px-4">
        <div className="hidden lg:block"></div>
        <p className="font-bold lg:text-2xl text-white">Admin Dashboard</p>
        <button className="rounded-lg text-white" onClick={handleLogOut}>Sign out</button>
      </section>
      
      <article className="py-[20px] flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-8 items-center px-4 lg:px-0 gap-y-[16px]">
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
        
        <section className="h-full flex flex-col items-center relative bg-gray-200 rounded-lg w-full p-4">
          <p className="text-lg">Occupied Seats</p>
            <PieChart width={200} height={200} className="rotate-180">
              <Pie
                data={seatsData}
                innerRadius={60}
                outerRadius={90}
                fill="#00C49F"
                paddingAngle={0}
                dataKey="value"
              >
                {seatsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          <p className="absolute text-black bottom-[40%] lg:bottom-[48%] font-bold">{`${occupiedSeats} / ${freeSeats+occupiedSeats}`}</p>  
        </section>
      </article>
      
    </div>
  );
}

export default AdminDashboard;
