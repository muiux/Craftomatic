import React from "react";
import { useWeather } from "../WeatherContext";
import DailyForecast from "./DailyForecast";

const Forecast = () => {
  const { dailyData, forcastData } = useWeather();

  return (
    <div>
      {forcastData.list && <p className="bottom-title">Daily</p>}
      <div className="forecast">
        {dailyData.map((day, index) => {
          return <DailyForecast key={`day_${index}`} day={day} />;
        })}
      </div>
    </div>
  );
};

export default Forecast;
