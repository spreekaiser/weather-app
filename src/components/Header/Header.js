import React from "react";
import "./Header.css";

export default function Header({ weather }) {
  return (
    <header className="header">
      <div className="header__emoji">{weather.condition}</div>
      <h1 className="header__temperature">{weather.temperature}°C</h1>
    </header>
  );
}
