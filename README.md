# Weather_app_typescript
weather application
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/4ce46304-2338-4c15-80e5-96bea25de060" />
## Weather App Workflow

```mermaid
flowchart TD

A[User Action<br/>Search city OR Click location] --> B[Event Handlers<br/>handleSearch()<br/>handleLocationClick()]

B --> C[State Updates<br/>searchQuery / city<br/>coords (lat, long)]

C --> D[useWeather Hook<br/>Central Brain<br/>Watches state changes]

D --> E[weatherQuery<br/>Current Weather]
D --> F[forecastQuery<br/>Forecast Data]

E --> G[API Layer (weather.ts)<br/>Get API key (.env)<br/>Axios GET request<br/>Handle errors]
F --> G

G --> H[Data returned to Hook]

H --> I[App.tsx<br/>Guard Clause<br/>weather && forecast]

I --> J[WeatherCard<br/>Temp / Humidity]
I --> K[HourlyGraph<br/>Trend Chart]
I --> L[DailyForecast<br/>5-Day Outlook]
I --> M[MapBox<br/>Center on coords]

J --> N[UI Layer<br/>Tailwind CSS<br/>WeatherIcon<br/>date-fns]
K --> N
L --> N
M --> N
```
