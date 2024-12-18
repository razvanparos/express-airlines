import { Tooltip, BarChart, Bar, Rectangle, XAxis, YAxis, Legend } from 'recharts';
function BarChartComponent({flight}){
    return(
        <BarChart width={300} height={200} data={[{ name: 'Sales' , sold:
            (flight.seats.length-flight.freeSeats)*flight.pricePerSeat, potentialSales: flight.seats.length*flight.pricePerSeat, }]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sold" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="potentialSales" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
    );
}   
export default BarChartComponent;