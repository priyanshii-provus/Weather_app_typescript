import { 
    WiDaySunny, 
    WiNightClear, 
    WiDayCloudy, 
    WiNightAltCloudy, 
    WiCloud, 
    WiCloudy, 
    WiShowers, 
    WiRain, 
    WiThunderstorm, 
    WiSnow, 
    WiFog 
  } from "react-icons/wi";
  
  interface WeatherIconProps {
    code: string;
    className?: string; // Allow us to style it from outside
  }
  
  export const WeatherIcon = ({ code, className }: WeatherIconProps) => {
    // Mapping OpenWeather codes to React Icons
    const iconMap: Record<string, React.ReactNode> = {
      // Clear
      "01d": <WiDaySunny className="text-yellow-400" />,
      "01n": <WiNightClear className="text-slate-200" />,
      
      // Few Clouds
      "02d": <WiDayCloudy className="text-yellow-200" />,
      "02n": <WiNightAltCloudy className="text-slate-400" />,
      
      // Clouds
      "03d": <WiCloud className="text-gray-200" />,
      "03n": <WiCloud className="text-gray-400" />,
      "04d": <WiCloudy className="text-gray-200" />,
      "04n": <WiCloudy className="text-gray-400" />,
  
      // Rain
      "09d": <WiShowers className="text-blue-300" />,
      "09n": <WiShowers className="text-blue-400" />,
      "10d": <WiRain className="text-blue-300" />,
      "10n": <WiRain className="text-blue-400" />,
      
      // Thunder
      "11d": <WiThunderstorm className="text-purple-400" />,
      "11n": <WiThunderstorm className="text-purple-400" />,
  
      // Snow
      "13d": <WiSnow className="text-white" />,
      "13n": <WiSnow className="text-white" />,
  
      // Atmosphere
      "50d": <WiFog className="text-slate-300" />,
      "50n": <WiFog className="text-slate-300" />,
    };
  
    // Fallback if code is missing
    return (
      <div className={`text-6xl ${className}`}>
        {iconMap[code] || <WiDaySunny />}
      </div>
    );
  };