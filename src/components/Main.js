import React from "react";
import { ScaleLoader } from "react-spinners";
import SearchBar from "./SearchBar";
import Current from "./Current";
import Forecast from "./Forecast";
import { useWeather } from "../WeatherContext";

const Main = () => {
  const { loading, currentData } = useWeather();

  return (
    <div className="app">
      <SearchBar />
      {currentData.weather !== undefined ? (
        loading ? (
          <div className="loading">
            <ScaleLoader color="#ffffff" height={70} width={10} />
          </div>
        ) : (
          <div className="container">
            <Current />
            <Forecast />
          </div>
        )
      ) : (
        <div>Please type the location and press Enter.</div>
      )}
    </div>
  );
};

export default Main;
