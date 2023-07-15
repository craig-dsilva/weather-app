import React from "react";
import styles from "../styles/CurentWeather.module.css";

const CurrentWeather: React.FC<any> = ({ weatherData }) => {
  return (
    <div className={styles.currentWeather}>
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
      <p>Humidity: {weatherData.main.humidity} %</p>
      <p>Wind speed: {Math.round(weatherData.wind.speed * 3.6)} km/h</p>
    </div>
  );
};

export default CurrentWeather;
