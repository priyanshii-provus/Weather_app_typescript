import axios from "axios";

// 1. Safety Check: Ensure API key exists
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
if (!API_KEY) {
  console.error("Error: VITE_WEATHER_API_KEY is missing in environment variables.");
}

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

export interface ForecastData {
  list: {
    dt: number;
    main: { temp: number };
    weather: { description: string; icon: string }[];
    dt_txt: string;
  }[];
  // Added 'city' here because it is often needed for forecast titles
  city?: {
    name: string;
    coord: { lat: number; lon: number };
    country: string;
  };
}

// Helper to handle API errors consistently
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch weather data");
  } else {
    console.error("Unexpected Error:", error);
    throw new Error("An unexpected error occurred");
  }
};

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    // 2. Used Generic <WeatherData> for better type safety
    const response = await axios.get<WeatherData>(
      `${BASE_URL}/weather?q=${city.trim()}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get<ForecastData>(
      `${BASE_URL}/forecast?q=${city.trim()}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await axios.get<ForecastData>(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};