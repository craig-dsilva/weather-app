"use client";
import React, { useState, useEffect, useRef } from "react";
import CurrentWeather from "../components/CurrentWeather";
import ForecastWeather from "../components/ForecastWeather";
import styles from "../styles/Weather.module.css";

const Weather = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [currentWeatherData, setCurrentWeatherData] = useState();
  const [forecastWeatherData, setForecastWeatherData] = useState();
  const [cityQueryError, setCityQueryError] = useState(false);
  const [cityQueryValidity, setCityQueryValidity] = useState(false);

  const cityQuery = useRef<HTMLInputElement>(null);

  const getGeoWeather = async (latitude: number, longitude: number) => {
    if (lat !== 0 && lon !== 0) {
      try {
        const res = await Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_ID}`
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=6&appid=${process.env.API_ID}`
          ),
        ]);
        if (!res[0].ok || !res[1].ok) {
          throw new Error("Something went wrong");
        }
        const currentData = await res[0].json();
        const forecastData = await res[1].json();
        forecastData.list.shift();
        setCurrentWeatherData(currentData);
        setForecastWeatherData(forecastData.list);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getWeatherByCity = async (city: string) => {
    setCityQueryValidity(false);
    try {
      const res = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_ID}`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=6&appid=${process.env.API_ID}`
        ),
      ]);

      if (res[0].status === 404 || res[1].status === 404) {
        return setCityQueryValidity(true);
      }
      if (!res[0].ok || !res[1].ok) {
        throw new Error("Something went wrong");
      }
      const currentData = await res[0].json();
      const forecastData = await res[1].json();
      forecastData.list.shift();
      setCurrentWeatherData(currentData);
      setForecastWeatherData(forecastData.list);
    } catch (error) {
      console.error(error);
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
    setCityQueryError(false);
    if (cityQuery.current.value === "") {
      return setCityQueryError(true);
    }
    getWeatherByCity(`${cityQuery.current?.value}`);
    cityQuery.current.value = "";
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
      {cityQueryError && <p>Please enter a city</p>}
      {cityQueryValidity && <p>Sorry, city not found</p>}
      {currentWeatherData && (
        <CurrentWeather weatherData={currentWeatherData} />
      )}
      {Array.isArray(forecastWeatherData) && (
        <ForecastWeather weatherForecastList={forecastWeatherData} />
      )}
    </div>
  );
};

export default Weather;
