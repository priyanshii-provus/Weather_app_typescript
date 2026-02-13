import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  getWeather, 
  getWeatherByCoords, 
  getForecast, 
  getForecastByCoords,
  Unit,
  WeatherData 
} from "../api/weather";

// 1. THE TYPED SUMMARY INTERFACE
export interface WeatherSummary {
  cityName: string;
  temp: string;
  feelsLike: string;
  condition: string;
  description: string;
  humidity: string;
  wind: string;
  icon: string;
  coord: { lat: number; lon: number };
}

// 2. THE FORMATTER FUNCTION (Handles "undefined" safely)
const formatWeatherSummary = (data: WeatherData, unit: Unit): WeatherSummary => {
  const isMetric = unit === Unit.Celsius;
  
  // Provide safe fallbacks for the weather array
  const weatherMain = data.weather?.[0] ?? { main: "N/A", description: "No data", icon: "01d" };

  return {
    cityName: data.name,
    temp: `${Math.round(data.main.temp)}°${isMetric ? "C" : "F"}`,
    feelsLike: `${Math.round(data.main.feels_like)}°${isMetric ? "C" : "F"}`,
    condition: weatherMain.main,
    description: weatherMain.description.charAt(0).toUpperCase() + weatherMain.description.slice(1),
    humidity: `${data.main.humidity}%`,
    wind: `${data.wind.speed} ${isMetric ? "m/s" : "mph"}`,
    icon: `https://openweathermap.org/img/wn/${weatherMain.icon}@4x.png`,
    coord: data.coord
  };
};

export const useWeather = () => {
  const [city, setCity] = useState("");
  const [searchType, setSearchType] = useState<"city" | "coords" | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [unit, setUnit] = useState<Unit>(Unit.Celsius);

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("weather-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("weather-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (cityToAdd: string) => {
    if (!favorites.includes(cityToAdd) && favorites.length < 5) {
      setFavorites([...favorites, cityToAdd]);
    }
  };

  const removeFavorite = (cityToRemove: string) => {
    setFavorites(favorites.filter(c => c !== cityToRemove));
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === Unit.Celsius ? Unit.Fahrenheit : Unit.Celsius));
  };

  const queryOptions = {
    enabled: !!(searchType && (searchQuery || coords)),
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  };

  const weatherQuery = useQuery({
    queryKey: ["weather", searchType, searchQuery, coords, unit], 
    queryFn: () => {
      if (searchType === "coords" && coords) return getWeatherByCoords(coords.lat, coords.lon, unit);
      if (searchType === "city" && searchQuery) return getWeather(searchQuery, unit);
      return null;
    },
    select: (data) => data ? formatWeatherSummary(data, unit) : null,
    ...queryOptions,
  });

  const forecastQuery = useQuery({
    queryKey: ["forecast", searchType, searchQuery, coords, unit],
    queryFn: () => {
      if (searchType === "coords" && coords) return getForecastByCoords(coords.lat, coords.lon, unit);
      if (searchType === "city" && searchQuery) return getForecast(searchQuery, unit);
      return null;
    },
    ...queryOptions,
  });

  const handleSearch = (manualCity?: string) => {
    const term = (typeof manualCity === 'string') ? manualCity : city;
    if (term.trim()) {
      setLocalError(null);
      setSearchType("city");
      setSearchQuery(term);
      setCoords(null);
      if (typeof manualCity === 'string') setCity(manualCity);
    }
  };

  const handleLocationClick = () => {
    setLocalError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchType("coords");
          setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
          setSearchQuery("");
        },
        //(error) => setLocalError("Location permission denied.")
      );
    }
  };

  return {
    city,
    setCity,
    weather: weatherQuery.data as WeatherSummary | null, 
    forecast: forecastQuery.data,
    isLoading: weatherQuery.isFetching || forecastQuery.isFetching,
    error: localError || weatherQuery.error || forecastQuery.error,
    handleSearch,
    handleLocationClick,
    favorites,
    addFavorite,
    removeFavorite,
    unit,       
    toggleUnit, 
  };
};
