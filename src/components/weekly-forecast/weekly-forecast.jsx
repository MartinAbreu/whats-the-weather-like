import React, { Component } from "react";
import ApiKeys from "../../apiKeys";
import Card from "../card/card.component";
import "./weekly-forecast.style.scss";

class WeeklyForecast extends Component {
  constructor() {
    super();

    this.state = {
      fullData: [],
      dailyData: [],
    };
  }

  //fetch the weather API by Geolocation
  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
        exclude=hourly,minutely&units=imperial&appid=${ApiKeys}`;

        fetch(weatherURL)
          .then((res) => res.json())
          .then((data) => {
            const fiveDayData = data.daily.slice(1, 6);
            this.setState({ dailyData: fiveDayData });
          });
      });
    }
  };

  //Making 5 day forecast cards
  makeDayCards = () => {
    return this.state.dailyData.map((obj, inx) => (
      <Card reading={obj} key={inx} />
    ));
  };

  render() {
    return (
      <div className="card-list-wrap">
        <span className="forecast-title">5 Day Forecast</span>
        <div className="weather-card-list">{this.makeDayCards()}</div>
        <span className="author-title">Developed by Martin Abreu</span>
      </div>
    );
  }
}

export default WeeklyForecast;
