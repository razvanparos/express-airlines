import { useEffect, useState } from "react";
import { logoutUser} from '../services/loginService'
import { useNavigate } from "react-router-dom";
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer,Tooltip } from 'recharts';
import homeService from "../services/homeService";


function AdminDashboard(props) {
  const COLORS = ['green','#0062E3'];
  const navigate=useNavigate();
  const getFlights = async () => {
    let queryResponse = await homeService.getChartData();
    setOccupiedSeats(queryResponse[0].occupiedSeats)
    setFreeSeats(queryResponse[0].freeSeats)
    setUpdatedSales(queryResponse[0].sales)
    setUpdatedTotalSales(queryResponse[0].total)
  }
  
    const [occupiedSeats, setOccupiedSeats] = useState()
    const [freeSeats, setFreeSeats] = useState()
    const [updatedSales, setUpdatedSales] = useState(0)
    const [updatedTotalSales, setUpdatedTotalSales] = useState(0)
    
    useEffect(()=>{
      getFlights();
    },[])

    const handleLogOut=async()=>{
      await logoutUser(navigate);
      props.removeUserData();
    }

    const data = [
      { name: 'Occupied Seats', value: occupiedSeats },
      { name: 'Free Seats', value: freeSeats },
    ];

  return (
    <div className="bg-white 2xl:px-[10%] py-[20px]">
      <p>Total flights: {freeSeats+occupiedSeats}</p>
      <p>{`${occupiedSeats} / ${freeSeats+occupiedSeats} Occupied seats`}</p>
      <p>{`$${updatedSales} / $${updatedTotalSales}`}</p>
   
      <button className="bg-darkBlue rounded-lg w-[50%] text-white p-3 2xl:rounded-lg 2xl:w-[10%]" onClick={handleLogOut}>Sign out</button>
      
      <div className="w-fit h-fit">
         <PieChart width={200} height={200}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill="#00C49F"
            paddingAngle={0.5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

    </div>
  );
}

export default AdminDashboard;
