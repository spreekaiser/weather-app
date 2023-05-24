import React from "react";
import "./Header.css";

export default function Header({ weather }) {
  return (
  <div className="header">
    <div className="header__weather">
      <div>{weather.condition}</div>
      <h1>{weather.temperature}°C</h1>
    </div>
    <h2 className="header__call">
      {weather.isGoodWeather
        ? "The weather is good, you could..."
        : "Sorry it's bad weather, but you could..."
      }
    </h2>
  </div>
  );
}
