import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ForecastData } from "../api/weather";
import { format } from "date-fns";

interface HourlyGraphProps {
  data: ForecastData;
}

export const HourlyGraph = ({ data }: HourlyGraphProps) => {
  const chartData = data.list.slice(0, 8).map(item => ({
    time: format(new Date(item.dt * 1000), "ha"), 
    temp: Math.round(item.main.temp)
  }));

  return (
    // Changed h-64 to min-h-[300px] to give the chart more vertical space
    <div className="w-full max-w-4xl min-h-[300px] bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/20 mt-8">
      <h3 className="text-white text-xl font-bold mb-4">Temperature Trend (24h)</h3>
      
      {/* Set a specific height for the container so it doesn't fight with the title */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={chartData} 
            // 1. ADD MARGINS: Crucial to keep labels from falling off the edge
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.5)" 
              tick={{ fill: 'white', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              // 2. PUSH LABELS DOWN: dy adds vertical offset
              dy={10} 
            />
            
            <YAxis 
              stroke="rgba(255,255,255,0.5)" 
              tick={{ fill: 'white', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              // 3. HIDE Y-AXIS LINE: Makes it cleaner for dashboards
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white' 
              }}
              itemStyle={{ color: '#fbbf24' }}
              cursor={{ stroke: '#fbbf24', strokeWidth: 2 }}
            />
            
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#fbbf24" 
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              strokeWidth={3} 
              // Animation makes it look premium
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};