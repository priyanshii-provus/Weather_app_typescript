import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // IMPORTANT: Import Leaflet CSS
import { useEffect } from "react";
import L from "leaflet";

// Fix for the broken default marker icon in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// --- Helper Component to animate movement ---
function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
 // Add 'map' to the dependency array
useEffect(() => {
    map.flyTo([lat, lon], 13, { duration: 2 });
 }, [lat, lon, map]);
  return null;
}

interface MapBoxProps {
  lat: number;
  lon: number;
}

export const MapBox = ({ lat, lon }: MapBoxProps) => {
  return (
    <div className="h-full w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 relative z-0">
      <MapContainer 
        center={[lat, lon]} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>Here is the weather!</Popup>
        </Marker>
        
        {/* This helper makes the map fly! */}
        <RecenterMap lat={lat} lon={lon} />
      </MapContainer>
    </div>
  );
};