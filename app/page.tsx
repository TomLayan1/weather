"use client"

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { fetchWeatherData } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Thermometer } from "lucide-react";
import { Droplets } from "lucide-react";
import { Wind } from "lucide-react";
import { WeatherDataType } from "@/types/interface";
import { motion } from "motion/react";

function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      className="cursor-pointer bg-gray-800"
      disabled={pending}
    >
      <Search className={`${pending ? 'animate-spin' : ''}`} />
    </Button>
  );
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [error, setError] = useState<string>("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setWeatherData(null);
    
    if (!city.trim()) {
      setError("Enter a city");
      return;
    }

    const data = await fetchWeatherData(city);

    if ("error" in data) {
      setError(data.error);
      return;
    }
    setWeatherData(data);
    setCity("");
  }

  return (
    <div className='w-full h-screen flex-shrink-0 overflow-hidden'>
      <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0">
        <div className="w-[90%] md:w-[80%] lg:w-[40%] p-5">
          {/* Error message */}
          {error && <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full bg-blue-600/35 text-white text-center py-2 rounded-lg mb-5"
          >
            {error}
          </motion.div>}
          
          {/* Weather data */}
          {weatherData && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`border border-white/40 bg-white/20 ${weatherData ? 'h-auto p-3 md:p-5' : 'h-0'} duration-300 mb-5`}>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-2xl text-white text-center font-bold mb-5">{weatherData?.name}</motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="flex items-center justify-center text-white mb-5">
                <img 
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData?.weather[0].description}
                  width={64}
                  height={64}
                />
                <h3 className="text-4xl text-center font-bold">{Math.round(weatherData?.main.temp)}&deg;C</h3>
              </motion.div>

                
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className="text-white text-center font-bold mb-7">{weatherData?.weather[0].description}</motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.2, duration: 0.3 }}
                className="w-full flex items-center justify-between"
              >
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white/70">Feels like</p>
                  <Thermometer size={20} className="text-[#f1b958]" />
                  <p className="text-white">{Math.round(weatherData?.main.feels_like)}&deg;C</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white/70">Humidity</p>
                  <Droplets size={20} className="text-[#f1b958]" />
                  <p className="text-white">{weatherData?.main.humidity}%</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white/70">Wind</p>
                  <Wind size={20} className="text-[#f1b958]" />
                  <p className="text-white">{weatherData?.wind.speed}m/s</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSearch} className="flex gap-1.5">
            <Input
              type="text"
              name="city"
              placeholder="Search city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-white/90"
            />
            <SearchButton />
          </form>
        </div>
      </div>
    </div>
  );
}
