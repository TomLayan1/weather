"use server"

export async function fetchWeatherData(city: string) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    if (!response.ok) throw new Error ('City not found');
    const data = await response.json();
    return data
  }
  catch (err) {
    console.log(err);
  }
} 