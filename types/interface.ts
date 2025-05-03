export interface WeatherDataType {
  id: number;
  name: string;
  main: {
    feels_like: number;
    temp: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    icon: string;
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  }
}