import { WeatherData } from "../api/weather";
import { WeatherIcon } from "./WeatherIcon"; // Import the new component

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/20">
      <h2 className="text-3xl font-bold mb-2 text-white">{data.name}</h2>
      
      <div className="flex justify-center my-6">
        {/* Add || "" to handle undefined values */}
        <WeatherIcon code={data.weather[0]?.icon || ""} className="text-9xl" />
      </div>

      <p className="text-6xl font-extrabold text-white mb-2">
        {Math.round(data.main.temp)}°
      </p>
      
      <p className="text-xl text-blue-100 capitalize mb-6">
        {data.weather[0]?.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white/20 p-4 rounded-xl">
          <p className="text-sm text-blue-100">HUMIDITY</p>
          <p className="text-2xl font-bold text-white">{data.main.humidity}%</p>
        </div>
        <div className="bg-white/20 p-4 rounded-xl">
          <p className="text-sm text-blue-100">WIND SPEED</p>
          <p className="text-2xl font-bold text-white">{data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};