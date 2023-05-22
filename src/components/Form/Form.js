import React from "react";
import { uid } from "uid";
import "./Form.css";

export default function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();

    const activity = event.target.elements.activity.value;
    const isGoodWeather = event.target.elements.isGoodWeather.checked;
    const formData = {
      id: uid(),
      name: activity,
      isGoodWeather: isGoodWeather,
    };
    console.log("Form: ", formData);

    onAddActivity(formData);

    event.target.reset();
    event.target.elements.activity.focus();
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="activity" className="form__label">
        Name of activity:
      </label>
      <input
        id="activity"
        name="activity"
        type="text"
        className="form__input"
      ></input>
      <label htmlFor="isGoodWeather" className="form__label">
        Outdoor activity?
      </label>
      <input
        id="isGoodWeather"
        name="isGoodWeather"
        type="checkbox"
        className="form__input"
      ></input>
      <button type="submit" className="form__button">
        Submit
      </button>
    </form>
  );
}
