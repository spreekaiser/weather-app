import React from "react";
import "./List.css";

export default function List({ activities, goodWeather }) {
  return (
    <>
      <h3 className="list__heading">
        {goodWeather
          ? "It is good Weather 🕺🏻 go out and have fun!"
          : "It is realy bad weather. Stay home 😩 and do the best you can."}
      </h3>
      <p>You could do:</p>
      <ul className="list">
        {activities?.map((activity) => (
          <li key={activity.id} className="list__item">
            <h3>{activity.name}</h3>
          </li>
        ))}
      </ul>
    </>
  );
}
