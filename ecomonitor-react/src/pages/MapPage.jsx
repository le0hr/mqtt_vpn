import { useState, useEffect } from 'react';
import { PollutionLegend } from '../components/PollutionLegend';
import { PollutionStats } from '../components/PollutionStats';
import { PollutionMap } from '../components/PollutionMap';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Wind, Droplets, Factory, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';

// Mock pollution data for different types with percentage positions
// Each location has measurements for all 5 pollutants
const pollutionLocations = [
  { 
    id: 1, 
    x: 45, 
    y: 25, 
    location: 'Times Square',
    co: 850,
    no: 62,
    alcohol: 15,
    pm25: 45,
    o3: 78
  },
  { 
    id: 2, 
    x: 50, 
    y: 35, 
    location: 'Central Park South',
    co: 620,
    no: 45,
    alcohol: 8,
    pm25: 38,
    o3: 65
  },
  { 
    id: 3, 
    x: 55, 
    y: 28, 
    location: 'Midtown East',
    co: 920,
    no: 71,
    alcohol: 22,
    pm25: 52,
    o3: 85
  },
  { 
    id: 4, 
    x: 40, 
    y: 75, 
    location: 'Financial District',
    co: 780,
    no: 58,
    alcohol: 12,
    pm25: 41,
    o3: 72
  },
  { 
    id: 5, 
    x: 75, 
    y: 40, 
    location: 'Queens Center',
    co: 540,
    no: 42,
    alcohol: 6,
    pm25: 35,
    o3: 58
  },
  { 
    id: 6, 
    x: 35, 
    y: 65, 
    location: 'Brooklyn',
    co: 710,
    no: 55,
    alcohol: 10,
    pm25: 48,
    o3: 68
  },
  { 
    id: 7, 
    x: 48, 
    y: 20, 
    location: 'Upper West Side',
    co: 650,
    no: 49,
    alcohol: 9,
    pm25: 43,
    o3: 61
  },
  { 
    id: 8, 
    x: 42, 
    y: 70, 
    location: 'Tribeca',
    co: 690,
    no: 52,
    alcohol: 11,
    pm25: 39,
    o3: 64
  },
];

const pollutionTypes = [
  { value: 'pm25', label: 'PPM2.5', icon: Droplets, unit: 'ppm' },
  { value: 'no', label: 'NO', icon: Factory, unit: 'ppm' },
  { value: 'co', label: 'CO', icon: Wind, unit: 'ppm' },
  { value: 'alcohol', label: 'Alcohol', icon: Droplets, unit: 'ppm' },
  { value: 'o3', label: 'O₃', icon: Wind, unit: 'ppm' },
];

// Function to get color based on value and type
const getColorForValue = (value, type) => {
  let threshold;
  if (type === 'co') {
    threshold = [900, 800, 700, 600, 0];
  } else if (type === 'alcohol') {
    threshold = [20, 15, 10, 5, 0];
  } else if (type === 'o3') {
    threshold = [80, 70, 60, 50, 0];
  } else {
    threshold = [60, 50, 45, 40, 0]; // pm25, no
  }
  if (value >= threshold[0]) return '#8B0000';
  if (value >= threshold[1]) return '#DC143C';
  if (value >= threshold[2]) return '#FF6347';
  if (value >= threshold[3]) return '#FFA500';
  return '#FFD700';
};

export function MapPage() {
  const [selectedType, setSelectedType] = useState('no');
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  const currentType = pollutionTypes.find(t => t.value === selectedType);
  const Icon = currentType.icon;
  
  const values = pollutionLocations.map(loc => loc[selectedType]);
  const average = values.reduce((sum, v) => sum + v, 0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);



  return (
    <div className="h-full  flex-1 flex flex-col bg-gray-100">
      {/* Controls Bar */}
      <div className="bg-white border-b px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-gray-600">Type:</span>
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value)}>
              <SelectTrigger className="w-32 md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pollutionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Mobile Info Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setIsInfoOpen(!isInfoOpen)}
          >
            Info
            {isInfoOpen ? (
              <ChevronDown className="size-4 ml-1" />
            ) : (
              <ChevronUp className="size-4 ml-1" />
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Map area with gradient background */}
        <div className="size-full bg-gradient-to-br from-slate-100 to-slate-200 relative">
          {/* Pollution markers */}
          <PollutionMap></PollutionMap>
        </div>
        
        {/* Desktop Overlay Cards - Right Side */}
      <div className="hidden md:block absolute top-2 right-2 space-y-2 w-52 z-[1000] scale-[0.85] origin-top-right transition-all">
        <Card className="p-2.5 bg-white/95 backdrop-blur shadow-sm border-gray-100">
          <div className="flex items-center gap-2"> 
            <div className="size-8 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
              <Icon className="size-4 text-blue-600" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-gray-500 uppercase leading-none mb-0.5">Type</div>
              <div className="font-bold text-xs truncate uppercase tracking-tight">
                {currentType.label}
              </div>
            </div>
          </div>
        </Card>
        
        <PollutionStats
          pollutionType={currentType.label}
          average={average}
          max={max}
          min={min}
          unit={currentType.unit}
        />
        
        <PollutionLegend pollutionType={currentType.label} />
      </div>

      {/* Mobile Info Panel - Теж компактніший */}
      {isInfoOpen && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-[1000] bg-white border-t shadow-2xl max-h-[50vh] overflow-y-auto">
          <div className="p-3 space-y-3 scale-90 origin-bottom"> 
            <Card className="p-3 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon className="size-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-600">Current Type</div>
                  <div className="font-semibold text-sm">{currentType.label}</div>
                </div>
              </div>
            </Card>
            
            <PollutionStats
              pollutionType={currentType.label}
              average={average}
              max={max}
              min={min}
              unit={currentType.unit}
            />
            
            <PollutionLegend pollutionType={currentType.label} />
          </div>
        </div>
      )}

        {/* Bottom Info Bar - Desktop Only */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t px-6 py-3 z-[1000]">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <div className="text-gray-600">
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex items-center gap-6">
              <div>
                <span className="text-gray-600">Monitoring Stations: </span>
                <span className="font-medium">{pollutionLocations.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Coverage Area: </span>
                <span className="font-medium">468 km²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}