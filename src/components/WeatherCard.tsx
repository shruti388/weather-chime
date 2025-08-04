import { Cloud, Droplets, Wind, Gauge, Eye, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_direction: number;
  visibility: number;
  description: string;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const temperatureColor = weather.temperature > 20 ? "text-temperature-warm" : "text-temperature-cold";

  return (
    <Card className="w-full max-w-md bg-cloud-white/90 backdrop-blur-sm border-weather-shadow/20 shadow-xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-foreground">
          {weather.city}, {weather.country}
        </CardTitle>
        <p className="text-muted-foreground capitalize">{weather.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Temperature */}
        <div className="text-center">
          <div className={`text-6xl font-bold ${temperatureColor} mb-2`}>
            {Math.round(weather.temperature)}°C
          </div>
          <p className="text-muted-foreground">
            Feels like {Math.round(weather.feels_like)}°C
          </p>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
            <Droplets className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
            <Wind className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-semibold">{weather.wind_speed} m/s</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
            <Gauge className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Pressure</p>
              <p className="font-semibold">{weather.pressure} hPa</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
            <Eye className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Visibility</p>
              <p className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};