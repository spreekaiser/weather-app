import React from "react";
import "./List.css";

export default function List({ activities, goodWeather, onDeleteActivity }) {
  return (
    <>
      <h3 className="list__heading">
        {goodWeather
          ? `It is good Weather 🕺🏻 \n go out and have fun!`
          : "It is realy bad weather. \n Stay home 😩 and do the best you can."}
      </h3>
      <p className="list__top">You could do:</p>
      <ul className="list">
        {activities?.map((activity) => (
          <li key={activity.id} className="list__item">
            <h3 className="list__activity">{activity.name}</h3>
            <button
              className="list__button"
              onClick={() => onDeleteActivity(activity.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
