import { WeatherSummary } from "../hooks/useWeather"; // Import the new interface
import { WeatherIcon } from "./WeatherIcon";

interface WeatherCardProps {
  data: WeatherSummary; // Updated to use the Summary type
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/20">
      <h2 className="text-3xl font-bold mb-2 text-white">{data.cityName}</h2>
      
      <div className="flex justify-center my-6">
        {/* The icon code is now part of the summary object */}
        <WeatherIcon code={data.icon.split('/').pop()?.split('@')[0] || ""} className="text-9xl" />
      </div>

      <p className="text-6xl font-extrabold text-white mb-2">
        {data.temp} {/* Already includes the °C/°F and is rounded */}
      </p>
      
      <p className="text-xl text-blue-100 capitalize mb-6">
        {data.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white/20 p-4 rounded-xl">
          <p className="text-sm text-blue-100">HUMIDITY</p>
          <p className="text-2xl font-bold text-white">{data.humidity}</p>
        </div>
        <div className="bg-white/20 p-4 rounded-xl">
          <p className="text-sm text-blue-100">WIND SPEED</p>
          <p className="text-2xl font-bold text-white">{data.wind}</p>
        </div>
      </div>

      {/* Optional: Add "Feels Like" since it's now in our summary */}
      <p className="mt-4 text-sm text-blue-200/70 uppercase tracking-widest font-medium">
        Feels like {data.feelsLike}
      </p>
    </div>
  );
};
