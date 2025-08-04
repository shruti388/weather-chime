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
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
        <h1 className="text-4xl font-bold text-foreground mb-4">Weather Search</h1>
        
        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <div className="flex items-center gap-2 text-foreground/80">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {weatherData && !isLoading && <WeatherCard weather={weatherData} />}
      </div>
    </div>
  );
};

export default Index;
