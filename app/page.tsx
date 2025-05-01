"use client"

import { useState } from "react";
import { fetchWeatherData } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Cloud } from "lucide-react";
import { Thermometer } from "lucide-react";
import { Droplets } from "lucide-react";
import { Wind } from "lucide-react";
import { WeatherDataType } from "@/types/interface";

function SearchButton() {
  return (
    <Button type="submit" className="cursor-pointer bg-gray-700">
      <Search />
    </Button>
  );
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  console.log(weatherData)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await fetchWeatherData(city);
    setWeatherData(data);
    setCity("");
  }


  return (
    <div className="w-full h-screen overflow-hidden">
      <img className="w-full h-full" src='/storm-clouds.jpg' alt="cloud" />
      <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0">
        <div className="w-[90%] md:w-[80%] lg:w-[40%] bg-white/20 p-5 border border-white/40">
          {weatherData && <div className="p-5">
            <h1 className="text-2xl text-white text-center font-bold mb-5">{weatherData?.name}</h1>
            <div className="flex items-center justify-center text-white mb-5">
              <Cloud size={50} />
              <h3 className="text-4xl text-center font-bold">{weatherData?.main.temp}&deg;C</h3>
            </div>
            <p className="text-white text-center font-bold mb-7">Light Rain</p>
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col items-center">
                <p className="text-white/70">Feels like</p>
                <Thermometer size={20} />
                <p className="text-white">{weatherData?.main.feels_like}&deg;C</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-white/70">Humidity</p>
                <Droplets size={20} />
                <p className="text-white">{weatherData?.main.humidity}%</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-white/70">Wind</p>
                <Wind size={20} />
                <p className="text-white">{weatherData?.wind.speed}m/s</p>
              </div>
            </div>
          </div>}
          <form onSubmit={handleSearch} className="flex gap-1.5">
            <Input
              type="text"
              name="city"
              placeholder="Search city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-white/90"
              required
            />
            <SearchButton />
          </form>
        </div>
      </div>
    </div>
  );
}
