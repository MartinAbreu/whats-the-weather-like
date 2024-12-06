import React, { Component } from "react";
import "./daily-forecast.style.scss";
var moment = require("moment");

class DailyForecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTodaysData: [],
      currentWeather: [],
      weatherDescription: [],
      weatherId: "",
      weatherCon: "",
    };
  }

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.props.apiKey}`;

        fetch(weatherURL)
          .then((res) => res.json())
          .then((data) => {
            const todaysInfo = data.main;
            const todaysDescription = data.weather[0].description;
            const allTodaysData = data;
            const weatherId = data.weather[0].id;
            const weatherCon = data.weather[0].main;

            this.setState(
              {
                allTodaysData: allTodaysData,
                currentWeather: todaysInfo,
                weatherDescription: todaysDescription,
                weatherId: weatherId,
                weatherCon: weatherCon,
              },
              () => this.sendCondition()
            );
          });
      });
    }
  };

  sendCondition = (e) => {
    this.props.condition(this.state.weatherCon);
    var hr = new Date().getHours();
    this.props.timeOfDay(hr);
  };

  render() {
    let newDate = new Date();
    const weekday = this.state.allTodaysData.dt * 1000;
    newDate.setTime(weekday);

    return (
      <div className='daily-weather-wrap'>
        <span className='today'>
          {moment(newDate).format("dddd, MMMM Do YYYY")}
        </span>
        <i
          className={`owf owf-${this.state.weatherId} owf-5x weather-icon`}
        ></i>
        <span className='degrees'>
          {String(Math.round(this.state.currentWeather.temp))}
        </span>
        <span className='max-min'>
          H: {String(Math.round(this.state.currentWeather.temp_max))}
        </span>
        <span className='weather-description'>
          {this.state.weatherDescription}
        </span>
        <h1 className='current-area'>{this.state.allTodaysData.name}</h1>
      </div>
    );
  }
}

export default DailyForecast;
