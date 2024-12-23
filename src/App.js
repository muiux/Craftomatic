import React from "react";
import { WeatherProvider } from "./WeatherContext";
import Main from "./components/Main";
import { ToastContainer } from "react-toast";

function App() {
  return (
    <WeatherProvider>
      <Main />
      <ToastContainer position="top-right" delay={2000} />
    </WeatherProvider>
  );
}

export default App;
