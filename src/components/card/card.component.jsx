import React from "react";
import "./card.style.scss";
var moment = require("moment");

const Card = ({ reading }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);

  return (
    <div className="weather-card">
      <h1>{moment(newDate).format("ddd")}</h1>
      <i className={`owf owf-${reading.weather[0].id} weather-icon`}></i>
      <span className="temp">{Math.round(reading.temp.max)}</span>
      <span>{reading.weather[0].main}</span>
    </div>
  );
};

export default Card;
