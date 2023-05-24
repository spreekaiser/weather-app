import React from "react";
import { uid } from "uid";
import "./Form.css";

export default function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const activity = event.target.elements.activity.value;
    const isGoodWeather = (() => {
      if (event.target.elements.outdoor.value === 'outdoor') {
        return true
      } else return false
    })();
    const formData = {
      id: uid(),
      name: activity,
      isGoodWeather: isGoodWeather,
    };
    onAddActivity(formData);
    event.target.reset();
    event.target.elements.activity.focus();
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add activity:</h2>
      <div className="form__input">
        <input
          id="activity"
          name="activity"
          type="text"
          className="form__input"
        ></input>
      </div>
      <div className="form__select">
        <input type="radio" id="outdoor" name="outdoor" value="outdoor"></input>
        <label htmlFor="outdoor">Outdoor</label>
        <input type="radio" id="indoor" name="outdoor"></input>
        <label htmlFor="indoor">Indoor</label>
        <button type="submit" className="form__button">
          Submit
        </button>
      </div>
    </form>
  );
}
