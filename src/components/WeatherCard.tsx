// WeatherCard.tsx
import React from "react";

interface WeatherCardProps {
  data: WeatherData;
  index: number;
  isCentered?: boolean;
}

interface WeatherData {
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

function WeatherCard({
  data,
  index,
  isCentered,
}: WeatherCardProps): JSX.Element {
  const convertKelvinToCelsius = (tempKelvin: number): string => {
    return (tempKelvin - 273).toFixed(2);
  };
  const convertHpaToMmHg = (pressureHpa: number): string => {
    return (pressureHpa * 0.750061561303).toFixed(2);
  };

  const cardClassName = isCentered ? "weather-card-center" : "weather-card";

  return (
    <div className={cardClassName}>
      <h4 className="date">{new Date(data.dt_txt).toLocaleDateString()}</h4>
      <div className="weather-details">
        <div className="weather-icon">
          <img
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt="Weather Icon"
            style={{ width: "80px", height: "80px" }} // Increase image size
          />
        </div>
        <div className="weather-info card-body">
          <p className="description">{data.weather[0].description}</p>
          <p>Min Temp: {convertKelvinToCelsius(data.main.temp_min)}°C</p>
          <p>Max Temp: {convertKelvinToCelsius(data.main.temp_max)}°C</p>
          <p>Feels Like: {convertKelvinToCelsius(data.main.feels_like)}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Pressure: {convertHpaToMmHg(data.main.pressure)} mmHg</p>
          <p>Temperature: {convertKelvinToCelsius(data.main.temp)}°C</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
