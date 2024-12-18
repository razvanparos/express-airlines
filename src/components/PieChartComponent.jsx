import { PieChart, Pie, Cell, Tooltip  } from 'recharts';
function PieChartComponent({data,COLORS}){
    return(
        <PieChart width={200} height={200} >
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={90}
                fill="#00C49F"
                paddingAngle={0}
                dataKey="value"
              >
                {
                  data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))
                }
              </Pie>
              <Tooltip />
        </PieChart>
    );
}   
export default PieChartComponent;