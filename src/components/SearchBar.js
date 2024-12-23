import React from "react";
import { useWeather } from "../WeatherContext";

const SearchBar = () => {
  const { location, setLocation, searchLocation } = useWeather();
  return (
    <div className="search">
      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder="Enter Location"
        type="text"
      />
    </div>
  );
};

export default SearchBar;
