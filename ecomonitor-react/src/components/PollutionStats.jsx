import { Card } from './ui/card';



export function PollutionStats({ pollutionType, average, max, min, unit }) {
  return (
    <Card className="p-4 bg-white/95 backdrop-blur">
      <h3 className="font-semibold mb-3">Statistics</h3>
      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-600">Average</div>
          <div className="text-2xl font-semibold">{average.toFixed(1)} {unit}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Max</div>
            <div className="text-lg font-medium">{max} {unit}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Min</div>
            <div className="text-lg font-medium">{min} {unit}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
