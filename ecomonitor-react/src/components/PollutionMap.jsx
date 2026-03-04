import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// Function to get color based on pollution level
function getColor(value, max){
  const ratio = value / max;
  
  if (ratio > 0.8) return '#8B0000'; // Dark red - Very high
  if (ratio > 0.6) return '#DC143C'; // Crimson - High
  if (ratio > 0.4) return '#FF6347'; // Tomato - Moderate-high
  if (ratio > 0.2) return '#FFA500'; // Orange - Moderate
  return '#FFD700'; // Gold - Low
}


const createPoint = (color) => {
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    className: 'custom-leaflet-marker', 
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

export function PollutionMap({ pollutionType, data = [] }) {
  // Координати центру карти (наприклад, Київ)
  data = [
  {
    id: 1,
    location: "Центр міста",
    lat: 49.4444, // Широта (Latitude)
    lng: 32.0597, // Довгота (Longitude)
    value: 45,    // Значення забруднення (те, що йде в getColor)
  },
  {
    id: 2,
    location: "26 школа",
    lat: 49.42681078002194,
    lng: 32.01669953437859,
    value: 460,
  },]
  const center = [49.4444, 32.0597];
  const maxValue = data.length > 0 ? Math.max(...data.map(d => d.value)) : 1;

  return (
    <div className="size-full relative overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={13} 
        className="size-full z-0"
        zoomControl={false} // Можна вимкнути, щоб не заважало вашим карткам
      >
        {/* Стильна світла карта (CartoDB Positron) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {data.map((point) => {
          const color = getColor(point.value, maxValue);
          
          return (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]} // Тепер використовуємо реальні координати
              icon={createPoint(color)}
            >
              {/* Ваш Tooltip тепер вбудований у Leaflet */}
              <Tooltip direction="top" offset={[0, -10]} opacity={1} className="custom-leaflet-tooltip">
                <div className="p-1">
                  <div className="font-semibold text-gray-900">{point.location}</div>
                  <div className="text-sm text-gray-600">
                    {pollutionType}: <span className="font-medium text-black">{point.value}</span>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
