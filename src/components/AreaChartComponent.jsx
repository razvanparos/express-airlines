import { AreaChart, Area, XAxis, YAxis, Tooltip  } from 'recharts';
function AreaChartComponent({data,width}){
    return(
        <AreaChart
            className="text-xs"
            width={width}
            height={250}
            data={data}
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
    );
}   
export default AreaChartComponent;