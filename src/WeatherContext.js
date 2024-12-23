import React, { createContext, useState, useContext, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toast";

export const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [currentData, setCurrentData] = useState({});
  const [forcastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [degree, setDegree] = useState("F");

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=6d2abd52a5048a5120acce017451baf4`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=6d2abd52a5048a5120acce017451baf4`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        setLoading(true);
        const fetchData = async (url, setter) => {
          const response = await axios.get(url);
          setter(response.data);
        };
        await fetchData(currentUrl, setCurrentData);
        await fetchData(forecastUrl, setForecastData);
        toast.success(`Here is the weather of ${location}!`)
        setLocation("");
      } catch (error) {
        console.log(error.status)
        if (error.status === 404) toast.error("Oops! Location Not Found.");
        else toast.error("Oops! Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
  };

  const Forecast = useMemo(() => {
    if (forcastData.list === undefined) return [];
    const newForecastData = forcastData.list.map((element) => {
      return { ...element, date: element.dt_txt.split(" ")[0] };
    });
    const groupedData = newForecastData.reduce((acc, element) => {
      const date = element.date;

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(element);

      return acc;
    }, {});
    return groupedData;
  }, [forcastData]);

  const dailyData = useMemo(() => {
      const F2C = (fahrenheit) => {
        return ((fahrenheit - 32) * 5) / 9;
      };
      const result = [];
      for (let dateKey in Forecast) {
        const elements = Forecast[dateKey];
        if (degree === "C") {
        }
        const calculateAverage = (key) =>
          elements.reduce((sum, val) => sum + val.main[key], 0) / elements.length;
  
        const temp = {
          high:
            degree === "C"
              ? F2C(calculateAverage("temp")).toFixed(1)
              : calculateAverage("temp").toFixed(1),
          low:
            degree === "C"
              ? F2C(calculateAverage("feels_like")).toFixed(1)
              : calculateAverage("feels_like").toFixed(1),
        };
  
        const weather = {
          img: `https://openweathermap.org/img/wn/${elements[0].weather[0].icon}.png`,
          title: elements[0].weather[0].main,
          desc: elements[0].weather[0].description,
        };
        const date = dateKey;
        result.push({ temp, weather, date });
      }
      return result;
    }, [Forecast, degree]);

  return (
    <WeatherContext.Provider
      value={{
        location,
        forcastData,
        currentData,
        loading,
        degree,
        Forecast,
        dailyData,
        setCurrentData,
        setForecastData,
        setLocation,
        searchLocation,
        setDegree,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
