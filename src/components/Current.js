import React from "react";
import { useWeather } from "../WeatherContext";

const Current = () => {
  const { currentData, degree, setDegree } = useWeather();

  const handleClickDegree = (currentDegree) => {
    if (currentDegree === "C") setDegree("F");
    else setDegree("C");
  };

  function convertToTime(timestamp) {
    const date = new Date(timestamp * 1000);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}:${formattedMinutes} ${amPm}`;
  }

  return (
    <div className="top">
      <div className="location">
        <p className="region">{currentData.name}</p>
      </div>
      <div className="weather">
        {currentData.main ? (
          <div className="current-temp">
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}.png`}
                alt={currentData.weather[0].main}
                style={{ height: "75px", width: "75px" }}
              />
            </div>
            <div>
              <h1>
                {degree === "C"
                  ? (((currentData.main.temp - 32) * 5) / 9).toFixed(1)
                  : currentData.main.temp.toFixed(1)}
                °
              </h1>
            </div>
            <div className="degree-group">
              <button
                className={degree === "C" ? "degree focus bold" : "degree"}
                onClick={() => handleClickDegree("F")}
              >
                C
              </button>
              <button
                className={degree === "F" ? "degree focus bold" : "degree"}
                onClick={() => handleClickDegree("C")}
              >
                F
              </button>
            </div>
          </div>
        ) : null}
        <div>
          {currentData.weather ? (
            <p className="description">{currentData.weather[0].description}</p>
          ) : null}
        </div>
        <div>
          {currentData.weather ? (
            <p className="current-time bold">
              Updated as of {convertToTime(currentData.dt)}
            </p>
          ) : null}
        </div>
        <div className="other">
          <div className="other-info">
            {currentData.main ? (
              <div className="detail-info">
                Feels Like:{" "}
                <span className="bold">
                  {degree === "C"
                    ? (((currentData.main.feels_like - 32) * 5) / 9).toFixed(1)
                    : currentData.main.feels_like.toFixed(1)}
                  °
                </span>
              </div>
            ) : null}
            {currentData.main ? (
              <div className="detail-info">
                Humidity:{" "}
                <span className="bold">{currentData.main.humidity}%</span>
              </div>
            ) : null}
            {currentData.main ? (
              <div className="detail-info">
                Wind Speed:{" "}
                <span className="bold">{currentData.wind.speed}MPH</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Current;
