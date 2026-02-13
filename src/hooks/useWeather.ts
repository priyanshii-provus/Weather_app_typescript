import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  getWeather, 
  getWeatherByCoords, 
  getForecast, 
  getForecastByCoords 
} from "../api/weather";

export const useWeather = () => {
  const [city, setCity] = useState("");
  // Tracks if we are searching by city name or coordinates
  const [searchType, setSearchType] = useState<"city" | "coords" | null>(null);
  
  // Search parameters
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Local error state for non-API errors (like Geolocation denied)
  const [localError, setLocalError] = useState<string | null>(null);

  // Common options for both queries to save API calls
  const queryOptions = {
    enabled: !!(searchType && (searchQuery || coords)),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: false, // Don't retry immediately if city is not found
    refetchOnWindowFocus: false, // Prevent refetching when switching tabs
  };

  const weatherQuery = useQuery({
    queryKey: ["weather", searchType, searchQuery, coords],
    queryFn: () => {
      if (searchType === "coords" && coords) return getWeatherByCoords(coords.lat, coords.lon);
      if (searchType === "city" && searchQuery) return getWeather(searchQuery);
      return null;
    },
    ...queryOptions,
  });

  const forecastQuery = useQuery({
    queryKey: ["forecast", searchType, searchQuery, coords],
    queryFn: () => {
      if (searchType === "coords" && coords) return getForecastByCoords(coords.lat, coords.lon);
      if (searchType === "city" && searchQuery) return getForecast(searchQuery);
      return null;
    },
    ...queryOptions,
  });

  const handleSearch = () => {
    if (city.trim()) {
      setLocalError(null); // Clear previous errors
      setSearchType("city");
      setSearchQuery(city);
      setCoords(null);
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
        (error) => {
          // Handle Geolocation errors (Denied, Timeout, etc.)
          let errorMessage = "Unable to retrieve location.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Location permission denied. Please enable it in settings.";
          }
          setLocalError(errorMessage);
        }
      );
    } else {
      setLocalError("Geolocation is not supported by this browser.");
    }
  };

  return {
    city,
    setCity,
    weather: weatherQuery.data,
    forecast: forecastQuery.data,
    // Use isFetching to show loading state even during background updates
    isLoading: weatherQuery.isFetching || forecastQuery.isFetching, 
    // Return API errors OR local geolocation errors
    error: localError || weatherQuery.error || forecastQuery.error, 
    handleSearch,
    handleLocationClick,
  };
};