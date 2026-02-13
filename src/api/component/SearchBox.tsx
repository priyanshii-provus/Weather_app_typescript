// src/components/SearchBox.tsx

interface SearchBoxProps {
    city: string;
    setCity: (city: string) => void;
    handleSearch: () => void;
    handleLocationClick: () => void;
  }
  
  export const SearchBox = ({ city, setCity, handleSearch, handleLocationClick }: SearchBoxProps) => {
    return (
      <div className="flex gap-2 mb-8 shadow-lg p-2 rounded-xl bg-white/30 backdrop-blur-sm">
        <input
          type="text"
          placeholder="Enter city name..."
          className="px-4 py-2 rounded-lg text-slate-800 w-64 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Search
        </button>
        <button
          onClick={handleLocationClick}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
          title="Use My Location"
        >
          📍
        </button>
      </div>
    );
  };