import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const WeatherSearch = ({ onSearch, isLoading }: WeatherSearchProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 bg-cloud-white/80 backdrop-blur-sm border-weather-shadow/20 focus:border-primary/50"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !city.trim()}
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
      >
        <Search className="w-4 h-4" />
      </Button>
    </form>
  );
};