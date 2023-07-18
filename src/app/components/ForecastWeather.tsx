import React from "react";
import Forecast from "./Forecast";
import styles from "../styles/ForecastWeather.module.css";

const ForecastWeather: React.FC<any> = ({ weatherForecastList }) => {
  
  return (
    <div className={styles.ForecastWeather}>
      {weatherForecastList.map((weatherForecast: {}, index: number) => {
        return <Forecast key={index} data={weatherForecast} />;
      })}
    </div>
  );
};

export default ForecastWeather;
