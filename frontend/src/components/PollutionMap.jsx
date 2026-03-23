import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// Function to get color based on pollution level
function getColor(value){
  
  if (value <100) return '#41d61f'; // Green - Low
  if (value <200) return '#e4d125'; // Yellow - Moderate
  if (value<300) return '#faa022'; // Desert - Moderate-hight
  if (value< 400) return '#f04f23';// Orange - Hight
  return '#8B0000'; // Dark red - Very high
}

function MapController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (!center || center.length !== 2) return;
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}


const createPoint = (color, value) => {
  return L.divIcon({
    html: `<div style="
        background-color: ${color};
        width: 24px;      
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 3px 6px rgba(0,0,0,0.3);
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        color: white;         
        font-family: sans-serif;
        font-size: 10px;      
        font-weight: bold;
        text-shadow: 0px 1px 2px rgba(0,0,0,0.5); 
        line-height: 1;
      ">
        ${value}
      </div>`,
    className: 'custom-leaflet-marker', 
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

export function PollutionMap({ points = [], selected = 'co2', center = [49.444, 32.06], zoom = 13 }) {
  console.log(points);
  
  // color of the marker depends on max AQI of the point.
  // TODO:
  // fix gas selection menu
  const maxValue = points.length > 0 ? Math.max(...points.map(d => d.value)) : 1;
  return (
    <div className="h-full w-full relative overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        className="size-full z-0"
        zoomControl={false} 
      >        
        <MapController center={center} zoom={zoom} />
        {/* map style (CartoDB Positron) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {points.map((point) => {
          const color = getColor(point[selected]);
          
          return (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}               icon={createPoint(color,point[selected] )}
            >
{/* TODO: Make a normal tooltip */}

              {/*Tooltip window */}
              {/* <Tooltip direction="top" offset={[0, -10]} opacity={1} className="custom-leaflet-tooltip"> */}
                {/* <div className="bg-white px-3 py-2 rounded-lg shadow-xl border border-gray-100 min-w-[120px]"> */}
                  {/* Location header */}
                  {/* <div className="text-[13px] font-bold text-gray-900 border-b border-gray-50 pb-1 mb-1 truncate"> */}
                    {/* {point.location} */}
                  {/* </div> */}
                  
                  {/* Tooltip context */}
                  {/* <div className="flex items-center justify-between gap-3"> */}
                    {/* <div className="flex items-center gap-1.5"> */}
                      {/* <span className="size-2 rounded-full bg-blue-500 animate-pulse" />  */}
                      {/* <span className="text-xs text-gray-500 font-medium">Показник:</span> */}
                    {/* </div> */}
                    {/* <span className="text-sm font-bold text-slate-800"> */}
                      {/* {point.value} <span className="text-[10px] text-gray-400 font-normal">мг/м³</span> */}
                    {/* </span> */}
                  {/* </div> */}
                {/* </div> */}
              {/* </Tooltip> */}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
