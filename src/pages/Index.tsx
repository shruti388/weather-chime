import { useState } from "react";
import { WeatherSearch } from "@/components/WeatherSearch";
import { WeatherCard, WeatherData } from "@/components/WeatherCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { fetchWeatherData } from "@/services/weatherApi";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Cloud } from "lucide-react";
import weatherHeroBg from "@/assets/weather-hero-bg.jpg";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      toast({
        title: "Weather data loaded",
        description: `Successfully loaded weather for ${data.city}, ${data.country}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch weather data";
      setError(errorMessage);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-sky-gradient-start to-sky-gradient-end relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(var(--sky-gradient-start)) 0%, hsl(var(--sky-gradient-end)) 100%), url(${weatherHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Floating clouds decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Cloud className="absolute top-20 left-10 text-cloud-white/30 w-16 h-16 animate-pulse" />
        <Cloud className="absolute top-40 right-20 text-cloud-white/20 w-12 h-12 animate-pulse delay-1000" />
        <Cloud className="absolute bottom-40 left-1/4 text-cloud-white/25 w-14 h-14 animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground drop-shadow-lg">
            Weather
            <span className="text-primary"> Finder</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-md">
            Get real-time weather information for any city around the world
          </p>
        </div>

        {/* Search */}
        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center gap-2 text-foreground/80">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading weather data...</span>
          </div>
        )}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Weather Data */}
        {weatherData && !isLoading && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <WeatherCard weather={weatherData} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-foreground/60 text-sm">
          <p>Powered by OpenWeatherMap API</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
