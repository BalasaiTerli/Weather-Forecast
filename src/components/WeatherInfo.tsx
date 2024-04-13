import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWeather } from "./WeatherContext.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import WeatherCard from "./WeatherCard.tsx";
import { BeatLoader } from "react-spinners";

function WeatherInfo() {
  const { location } = useParams<{ location?: string }>();
  const { weatherData, loading, error, fetchWeatherData } = useWeather();
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (location && !dataLoaded) {
      fetchWeatherData(location).then(() => {
        setDataLoaded(true);
      });
    }
  }, [fetchWeatherData, location, dataLoaded]);

  if (loading) {
    return (
      <div className="loading-icon-container">
        <BeatLoader color={"#007bff"} loading={true} size={15} />
      </div>
    );
  }

  if (error) {
    return <div className="weather-info error">{error}</div>;
  }

  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="weather-info no-data">No weather data available.</div>
    );
  }

  return (
    <div className="weather-info">
      <h3 className="title">Weather Information</h3>
      <h2 className="custom-title">{location}</h2>
      <div className="weather-container">
        <WeatherCard data={weatherData[0]} index={0} isCentered={true} />
        <div className="weather-row">
          {weatherData.slice(1).map((data, index) => (
            <WeatherCard data={data} key={index + 1} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
