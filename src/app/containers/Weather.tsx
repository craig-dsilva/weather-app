"use client";
import React, { useState, useEffect, useRef } from "react";
import CurrentWeather from "./CurrentWeather";
import styles from "../styles/Weather.module.css";

const Weather = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [currentWeatherData, setCurrentWeatherData] = useState();

  const cityQuery = useRef<HTMLInputElement>(null);

  const getGeoWeather = async (latitude: number, longitude: number) => {
    if (latitude !== 0) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_ID}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setCurrentWeatherData(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getWeatherByCity = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_ID}`
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      setCurrentWeatherData(data);
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

  const searchCity = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    getWeatherByCity(`${cityQuery.current?.value}`);
    cityQuery.current.value = ""
  };

  return (
    <div className={styles.weather}>
      <form className={styles.weatherSearch}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Enter a city"
          ref={cityQuery}
        />
        <input
          type="submit"
          className={styles.searchButton}
          onClick={searchCity}
          value="Search"
        />
      </form>
      {currentWeatherData && (
        <CurrentWeather weatherData={currentWeatherData} />
      )}
    </div>
  );
};

export default Weather;
