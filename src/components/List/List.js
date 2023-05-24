import React from "react";
import "./List.css";

export default function List({ activities, goodWeather, onDeleteActivity }) {
  return (
    <>
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
