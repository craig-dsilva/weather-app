"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/weather.module.css";

const Weather = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [weatherData, setWeatherData] = useState<any>();

  const getGeoWeather = async (latitude: number, longitude: number) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_ID}`
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });

    getGeoWeather(lat, lon);
  }, [lat, lon]);

  console.log(weatherData);

  return (
    weatherData && (
      <div className={styles.weather}>
        <h2>{weatherData.name}</h2>

        <h1>{Math.round(weatherData.main.temp)}</h1>
        <p>Feels like {Math.round(weatherData.main.feels_like)}</p>
        <div className={styles.weatherDescription}>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="weather icon"
          />
          <p className={styles.weatherDescriptionText}>
            {weatherData.weather[0].description}
          </p>
        </div>
        <p>Humidity: {weatherData.main.humidity}</p>
        <p>Wind speed: {weatherData.wind.speed}</p>
      </div>
    )
  );
};

export default Weather;
