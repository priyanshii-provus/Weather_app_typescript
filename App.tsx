import { useWeather } from "./hooks/useWeather";
import { SearchBox } from "./components/SearchBox";
import { WeatherCard } from "./components/WeatherCard";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyGraph } from "./components/HourlyGraph";
import { MapBox } from "./components/MapBox";

function App() {
  const { 
    city, 
    setCity, 
    weather, 
    forecast, 
    isLoading, 
    error, 
    handleSearch, 
    handleLocationClick 
  } = useWeather();

  // Helper to extract error message safely
  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    return "An unknown error occurred";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-4 md:p-8 text-white">
      
      {/* HEADER AREA - Added z-index to stay above the map */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mb-8 gap-4 relative z-10">
        <h1 className="text-4xl font-bold tracking-tight">
          ☁️ Weather<span className="text-blue-400">Dash</span>
        </h1>
        
        <div className="w-full md:w-auto">
          <SearchBox 
            city={city} 
            setCity={setCity} 
            handleSearch={handleSearch} 
            handleLocationClick={handleLocationClick} 
          />
        </div>
      </div>

      {/* ERROR MESSAGE - Dynamic text based on error type */}
      {error && (
        <div className="max-w-md mx-auto mb-8 bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded-lg text-center">
          {getErrorMessage()}
        </div>
      )}

      {/* LOADING STATE - Only show if we don't have data yet */}
      {isLoading && !weather && (
        <div className="text-center animate-pulse text-xl py-20">
          Gathering weather intelligence...
        </div>
      )}

      {/* MAIN CONTENT GRID */}
      {weather && forecast && (
        <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          
          {/* LEFT COLUMN: THE MAP */}
          <div className="h-[400px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
             <MapBox lat={weather.coord.lat} lon={weather.coord.lon} />
          </div>

          {/* RIGHT COLUMN: DATA DASHBOARD */}
          <div className="flex flex-col gap-6">
            <WeatherCard data={weather} />
            <HourlyGraph data={forecast} />
            <DailyForecast data={forecast} />
          </div>

        </div>
      )}

      {/* EMPTY STATE */}
      {!weather && !isLoading && !error && (
        <div className="text-center py-20 text-blue-200/50">
          <p className="text-2xl">Enter a city to see the magic happen.</p>
        </div>
      )}
      
    </div>
  );
}

export default App;