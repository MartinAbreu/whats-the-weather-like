import React, { Component } from "react";
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

        const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&
        exclude=hourly,minutely&units=imperial&cnt=5&appid=${this.props.apiKey}`;

        fetch(weatherURL)
          .then((res) => res.json())
          .then((data) => {
            const fiveDayData = data.list;
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
      <div className='card-list-wrap'>
        <span className='forecast-title'>A Look Ahead...</span>
        <div className='weather-card-list'>{this.makeDayCards()}</div>
      </div>
    );
  }
}

export default WeeklyForecast;
