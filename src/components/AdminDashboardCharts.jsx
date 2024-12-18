import AreaChartComponent from './AreaChartComponent';
import PieChartComponent from './PieChartComponent';

function AdminDashboardCharts(props) {
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (
    <article className="py-[20px] flex flex-col xl:grid xl:grid-cols-3 lg:gap-x-8 items-center px-4 lg:px-0 gap-y-[16px]">
        <section className="h-full flex flex-col justify-between items-center relative bg-gray-200 rounded-lg w-full p-4">
            <p className="text-lg">{`Flights until ${new Date().getDate()} ${MONTHS[new Date().getMonth()]} ${new Date().getFullYear()}`}</p>
            <PieChartComponent data={[
                  { name: 'Completed flights until today', value: props.flightsNrUntilToday },
                  { name: 'Upcoming flights', value: props.flightsNr-props.flightsNrUntilToday },]}
                  COLORS = {['purple','#0062E3']}
            />
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
          <AreaChartComponent data={props.salesData} width={props.windowWidth-20}/>
        </section>
        
        <section className="h-full flex flex-col justify-between items-center relative bg-gray-200 rounded-lg w-full p-4">
          <p className="text-lg">Occupied Seats</p>
          <PieChartComponent data={[
                  { name: 'Occupied Seats', value: props.occupiedSeats },
                  { name: 'Free Seats', value: props.freeSeats },
                ]}
                COLORS={ ['green','#0062E3']}
                />
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
