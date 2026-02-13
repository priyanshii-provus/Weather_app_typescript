# Weather_app_typescript
weather application
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/4ce46304-2338-4c15-80e5-96bea25de060" />
┌─────────────────────────┐
                │        User Action       │
                │ 1. Search city OR        │
                │ 2. Click location pin    │
                └────────────┬────────────┘
                             │
                             ▼
                ┌─────────────────────────┐
                │   Event Handlers        │
                │ handleSearch()          │
                │ handleLocationClick()   │
                └────────────┬────────────┘
                             │
                             ▼
                ┌─────────────────────────┐
                │   State Updates         │
                │ searchQuery / city      │
                │ coords (lat, long)      │
                └────────────┬────────────┘
                             │
                             ▼
                ┌─────────────────────────┐
                │   useWeather Hook       │
                │ (Central Brain)         │
                │ Watches state changes   │
                └────────────┬────────────┘
                             │
         ┌───────────────────┴───────────────────┐
         ▼                                       ▼
┌────────────────────┐              ┌────────────────────┐
│  weatherQuery       │              │  forecastQuery      │
│ (Current Weather)   │              │ (Forecast Data)     │
└──────────┬──────────┘              └──────────┬──────────┘
           │                                     │
           ▼                                     ▼
     ┌──────────────────────────────────────────────┐
     │         API Layer (weather.ts)               │
     │ - Get API key from .env                      │
     │ - Axios GET request                          │
     │ - Handle errors (401, city not found)        │
     └───────────────┬──────────────────────────────┘
                     │
                     ▼
          ┌─────────────────────────┐
          │  Data returned to Hook  │
          └────────────┬────────────┘
                       │
                       ▼
          ┌─────────────────────────┐
          │      App.tsx            │
          │ Guard Clause            │
          │ weather && forecast     │
          └────────────┬────────────┘
                       │
     ┌─────────────────┼──────────────────┐
     ▼                 ▼                  ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ WeatherCard  │ │ HourlyGraph  │ │ DailyForecast│
│ Temp/Humidity│ │ Recharts     │ │ 5-day data   │
└──────────────┘ └──────────────┘ └──────────────┘
                       │
                       ▼
                ┌──────────────┐
                │ MapBox       │
                │ Center Map   │
                │ using coords │
                └──────────────┘

Final Layer:
Tailwind CSS → Styling  
WeatherIcon → Icon mapping  
date-fns → Time formatting
