import { format } from "date-fns";
import { ForecastData } from "../api/weather";

interface DailyForecastProps {
  data: ForecastData;
}

export const DailyForecast = ({ data }: DailyForecastProps) => {
  // The API gives us data every 3 hours. We only want one reading per day (e.g., at 12:00 PM).
  const dailyData = data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl mb-8 animate-in slide-in-from-bottom duration-700">
      {dailyData.slice(0, 5).map((day) => (
        <div key={day.dt} className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-center shadow-lg border border-white/30">
          <p className="text-white font-semibold text-lg">{format(new Date(day.dt * 1000), "EEEE")}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`}
            className="w-16 h-16 mx-auto"
            alt="icon"
          />
          <p className="text-2xl font-bold text-white">{Math.round(day.main.temp)}°C</p>
          <p className="text-white/80 capitalize text-sm">{day.weather[0]?.description}</p>
        </div>
      ))}
    </div>
  );
};