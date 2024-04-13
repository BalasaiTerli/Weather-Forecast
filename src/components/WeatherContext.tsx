import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { weatherApiKey,weatherApiUrl } from "../constants/apiConfig.ts";


export interface WeatherData {
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

interface WeatherContextProps {
  weatherData: WeatherData[];
  loading: boolean;
  error: string;
  fetchWeatherData: (location: string) => Promise<void>;
}

const initialContext: WeatherContextProps = {
  weatherData: [],
  loading: false,
  error: "",
  fetchWeatherData: async () => {},
};

export const WeatherContext =
  createContext<WeatherContextProps>(initialContext);

export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeatherData = async (location: string) => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const apiKey = `${weatherApiKey}`// Replace with your API key
      const response = await axios.get(
        `${weatherApiUrl}${location}&appid=${apiKey}`
      );
      const filteredData = response.data.list.filter((_: any, index: number) =>
        [0, 8, 16, 24, 32].includes(index)
      );
      setWeatherData(filteredData);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
      setLoading(false); // Set loading to false if an error occurs
    }
  };

  return (
    <WeatherContext.Provider
      value={{ weatherData, loading, error, fetchWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
