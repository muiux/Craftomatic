import React from "react";

const DailyForecast = ({ day }) => {
  return (
    <div className="day">
      <div className="date">{day.date}</div>
      <img src={day.weather.img} alt={day.weather.title} />
      <div className="temp">
        <p className="high">{day.temp.high}°</p>
        <p className="low">{day.temp.low}°</p>
      </div>
      <div className="desc">{day.weather.desc}</div>
    </div>
  );
};

export default DailyForecast;
