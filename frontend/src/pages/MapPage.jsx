import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PollutionLegend } from '../components/PollutionLegend';
import { PollutionStats } from '../components/PollutionStats';
import { PollutionMap } from '../components/PollutionMap';
import axios from 'axios';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Wind, Droplets, Factory, ChevronUp, ChevronDown, Car } from 'lucide-react';
import { Button } from '../components/ui/button';

// Mock pollution data for different types with percentage positions
// Each location has measurements for all 5 pollutants
const pollutionTypes = [
  { value: 'co', labelKey: 'pollutionTypes.co', icon: Car, unit: 'AQI' },
  { value: 'alcohol', labelKey: 'pollutionTypes.alcohol', icon: Droplets, unit: 'AQI' },
  { value: 'co2', labelKey: 'pollutionTypes.co2', icon: Factory, unit: 'AQI' },
  { value: 'toluene', labelKey: 'pollutionTypes.toluene', icon: Droplets, unit: 'AQI' },
  { value: 'nh3', labelKey: 'pollutionTypes.nh3', icon: Wind, unit: 'AQI' },
];

export function MapPage() {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState('co2');
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [pointOnMap, setPoints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([49.444, 32.06]);
  const [mapZoom, setMapZoom] = useState(13);

  const currentType = pollutionTypes.find((t) => t.value === selectedType);
  const currentTypeLabel = currentType ? t(currentType.labelKey) : '';
  const Icon = currentType?.icon;
  
  const average = 0;
  const max = 0;
  const min = 0;

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/data');
          console.log(response.data);
          setPoints(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch", error);
        }
      };
      fetchData();
    }, []);
//  raw search bar implementation 
  // const handleSearch = async (event) => {
  //   event.preventDefault();
  //   if (!searchQuery.trim()) return;

  //   setSearchLoading(true);
  //   setSearchError('');

  //   try {
  //     const params = new URLSearchParams({
  //       q: searchQuery,
  //       format: 'json',
  //       limit: '1',
  //       api_key: 'API_KEY'
  //     });

  //     const response = await axios.get(`https://geocode.maps.co/search?${params.toString()}`);
  //     const result = response.data?.[0];

  //     if (!result) {
  //       setSearchError('Location not found');
  //       return;
  //     }

  //     setMapCenter([parseFloat(result.lat), parseFloat(result.lon)]);
  //     setMapZoom(14);
  //   } catch (err) {
  //     console.error('Search failed', err);
  //     setSearchError('Search failed. Please try again.');
  //   } finally {
  //     setSearchLoading(false);
  //   }
  // };

  return (
    <div className="h-full  flex-1 flex flex-col bg-gray-100">
      {/* Controls Bar */}
      <div className="bg-white border-b px-4 md:px-6 py-3 positions:absolute z-[9999]">
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs md:text-sm text-gray-600">{t('mapPage.type_label')}</span>
            <Select className="bg-white" value={selectedType} onValueChange={(value) => setSelectedType(value)}>
              <SelectTrigger className="w-32 md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-[9999] shadow-md border border-gray-200">
                {pollutionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {t(type.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
       {/*raw search bar implementation  */}
{/*             
            <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 min-w-[240px] md:min-w-[340px]">
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search location..."
                className="flex-1 bg-white"
              />
              <Button type="submit" variant="outline" size="sm" className="whitespace-nowrap" disabled={searchLoading}>
                {searchLoading ? 'Searching…' : 'Search'}
              </Button>
            </form>

            {searchError ? (
              <div className="text-xs text-rose-600">{searchError}</div>
            ) : null} */}
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
          <PollutionMap points={pointOnMap} selected={selectedType} center={mapCenter} zoom={mapZoom} />
        </div>
        
        {/* Desktop Overlay Cards - Right Side */}
      <div className="hidden md:block absolute top-2 right-2 space-y-2 w-52 z-[1000] scale-[0.85] origin-top-right transition-all">
        <Card className="p-2.5 bg-white/95 backdrop-blur shadow-sm border-gray-100">
          <div className="flex items-center gap-2"> 
            <div className="size-8 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
              <Icon className="size-4 text-blue-600" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-gray-500 uppercase leading-none mb-0.5">{t('mapPage.type')}</div>
              <div className="font-bold text-xs truncate uppercase tracking-tight">
                {currentTypeLabel}
              </div>
            </div>
          </div>
        </Card>
        
        <PollutionStats
          pollutionType={currentTypeLabel}
          average={average}
          max={max}
          min={min}
          unit={currentType.unit}
        />
        
        <PollutionLegend pollutionType={currentTypeLabel} />
      </div>

      {/* Mobile Info Panel */}
      {isInfoOpen && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-[1000] bg-white border-t shadow-2xl max-h-[50vh] overflow-y-auto">
          <div className="p-3 space-y-3 scale-90 origin-bottom"> 
            <Card className="p-3 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon className="size-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-600">{t('mapPage.current_type')}</div>
                  <div className="font-semibold text-sm">{currentTypeLabel}</div>
                </div>
              </div>
            </Card>
            
            <PollutionStats
              pollutionType={currentTypeLabel}
              average={average}
              max={max}
              min={min}
              unit={currentType.unit}
            />
            
            <PollutionLegend pollutionType={currentTypeLabel} />
          </div>
        </div>
      )}

        {/* Bottom Info Bar - Desktop Only */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t px-6 py-3 z-[1000]">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <div className="text-gray-600">
              {t('mapPage.last_updated')} {new Date().toLocaleString()}
            </div>
            <div className="flex items-center gap-6">
              <div>
                <span className="text-gray-600">{t('mapPage.monitoring_stations')} </span>
                <span className="font-medium">{0}</span>
              </div>
              <div>
                <span className="text-gray-600">{t('mapPage.coverage_area')} </span>
                <span className="font-medium">72 km²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}