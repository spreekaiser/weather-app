import React from "react";
import "./List.css";

export default function List({activities}) {
    return (
        <ul className="list">
            {activities?.map((activity) => (
                <li key={activity.id} className='list__item'>
                <h3>{activity.name}</h3>
                </li>
            ))}
        </ul>
    );
}