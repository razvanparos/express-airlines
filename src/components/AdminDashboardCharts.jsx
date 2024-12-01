import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip  } from 'recharts';

function AdminDashboardCharts(props) {
    const COLORS = ['green','#0062E3'];
    const COLORS2 = ['purple','#0062E3'];
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <article className="py-[20px] flex flex-col xl:grid xl:grid-cols-3 lg:gap-x-8 items-center px-4 lg:px-0 gap-y-[16px]">
        <section className="h-full flex flex-col justify-between items-center relative bg-gray-200 rounded-lg w-full p-4">
            <p className="text-lg">{`Flights until ${new Date().getDate()} ${MONTHS[new Date().getMonth()]} ${new Date().getFullYear()}`}</p>
            <PieChart width={200} height={200} >
              <Pie
                data={[
                  { name: 'Completed flights until today', value: props.flightsNrUntilToday },
                  { name: 'Upcoming flights', value: props.flightsNr-props.flightsNrUntilToday },
                ]}
                innerRadius={60}
                outerRadius={90}
                fill="#00C49F"
                paddingAngle={0}
                dataKey="value"
              >
                {
                  [{ name: 'Completed flights until today', value: props.flightsNrUntilToday },
                    { name: 'Upcoming flights', value: props.flightsNr-props.flightsNrUntilToday },
                  ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />))
                }
              </Pie>
              <Tooltip />
            </PieChart>
            <p className="absolute text-black bottom-[48%] lg:bottom-[48%] font-bold">{`${props.flightsNrUntilToday} / ${props.flightsNr}`}</p> 
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
            width={props.windowWidth-20}
            height={250}
            data={props.salesData}
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
                  { name: 'Occupied Seats', value: props.occupiedSeats },
                  { name: 'Free Seats', value: props.freeSeats },
                ]}
                innerRadius={60}
                outerRadius={90}
                fill="#00C49F"
                paddingAngle={0}
                dataKey="value"
              >
                {[
                  { name: 'Occupied Seats', value: props.occupiedSeats },
                  { name: 'Free Seats', value: props.freeSeats },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          <p className="absolute text-black bottom-[48%] lg:bottom-[48%] font-bold">{`${props.occupiedSeats} / ${props.freeSeats+props.occupiedSeats}`}</p>  
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
  );
}

export default AdminDashboardCharts;
