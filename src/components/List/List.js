import React from "react";
import "./List.css";

export default function List({ activities, goodWeather, onDeleteActivity }) {
  return (
    <>
      <ul className="list">
        {activities?.map((activity) => (
          <li key={activity.id} className="list__item">
            {activity.name}
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
