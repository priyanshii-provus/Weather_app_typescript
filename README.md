# Weather_app_typescript


# ☁️ WeatherDash

A sleek, modern weather dashboard built with **React**, **TypeScript**, and **Tailwind CSS**. This application provides real-time weather insights, 5-day forecasts, and interactive mapping for a premium user experience.

---

## 🚀 Features

* **Real-time Weather**: Instant access to temperature, humidity, wind speed, and atmospheric conditions.
* **Interactive Maps**: Dynamic map centering using **MapBox** based on city coordinates.
* **Visual Trends**: Hourly temperature and condition graphs using **Recharts** for intuitive data visualization.
* **5-Day Outlook**: Detailed daily forecast for long-term planning.
* **WMO Icon Mapping**: High-quality official weather icons from the World Meteorological Organization with a reliable fallback to OpenWeather icons.
* **Favorites System**: Pin up to 5 cities for quick access; data is persisted across sessions via **LocalStorage**.
* **Unit Conversion**: Toggle effortlessly between Metric (°C) and Imperial (°F) units.

---

## 🛠️ Tech Stack

* **Framework**: [React 18 (Vite)](https://vitejs.dev/)
* **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
* **API Client**: [Axios](https://axios-http.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Mapping**: [MapBox GL JS](https://www.mapbox.com/)
* **Icons**: WMO Official Icons & OpenWeather

---

## 📦 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/weather-dash.git](https://github.com/your-username/weather-dash.git)
    cd weather-dash
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your keys:
    ```env
    VITE_OPENWEATHER_API_KEY=your_openweather_key_here
    VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
    ```

4.  **Start Development Server**
    ```bash
    npm run dev
    ```

---

## 📂 Project Architecture

* `src/api/`: API logic and centralized error handling using Axios.
* `src/components/`: Modular UI components like `WeatherCard`, `MapBox`, and `HourlyGraph`.
* `src/hooks/`: Central state management via the custom `useWeather` hook.
* `src/utils/`: Formatting utilities (`cn` utility) and icon mapping logic.

---

## 🔧 Reliability & Best Practices

* **Type Safety**: Built with TypeScript for rigorous type checking across API responses and UI components.
* **Responsive UI**: Mobile-first design using Tailwind's grid and flexbox utilities.
* **Safe Data Extraction**: Utilizes optional chaining and nullish coalescing to handle missing API data gracefully.
* **Conflict Resolution**: Uses `tailwind-merge` to resolve CSS class name collisions dynamically.

---

## 📄 License


This project is licensed under the **MIT License**.
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/4ce46304-2338-4c15-80e5-96bea25de060" />
## Weather App Workflow

##error handling 
<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/f2c518c4-638e-4ef0-9f35-2478b4e61a41" />



