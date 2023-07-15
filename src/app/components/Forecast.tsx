import React from "react";

const Forecast: React.FC<any> = ({ data }) => {
  return (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt=""
      />
      <p>{Math.round(data.main.temp)}&deg;C</p>
      <p>{data.dt_txt.split(" ")[1].substring(0, 5)}</p>
      <p>{data.dt_txt.split(" ")[0].substring(5).replace("-", "/")}</p>
    </div>
  );
};

export default Forecast;
