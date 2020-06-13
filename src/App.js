import React, { Component } from "react";
import ApiKeys from "./apiKeys";
import "./App.css";
import WeeklyForecast from "./components/weekly-forecast/weekly-forecast";
import DailyForecast from "./components/daily-forecast/daily-forecast";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherCon: "",
      dayOrNight: "",
      background: "",
    };
  }

  conditionHandler = (e) => {
    switch (true) {
      case e === "Clouds":
        this.setState({ weatherCon: "clouds" });
        break;
      case e === "Rain" || e === "Thunderstorm" || e === "Drizzle":
        this.setState({ weatherCon: "rain" });
        break;
      case e === "Snow":
        this.setState({ weatherCon: "snow" });
        break;
      case e === "Clear":
        this.setState({ weatherCon: "clear" });
        break;
      default:
        this.setState({ weatherCon: "day" });
    }
  };

  nightNDayHandler = (e) => {
    switch (true) {
      case e >= 18:
        this.setState({ dayOrNight: "night" });
        break;
      case e < 18:
        this.setState({ dayOrNight: "day" });
        break;
      default:
        this.setState({ dayOrNight: "" });
    }
  };

  backgroundHandler = (e) => {
    const timeOfDay = this.state.dayOrNight;
    const weather = this.state.weatherCon;

    switch (true) {
      case timeOfDay === "night" && weather === "clear":
        return "night";
      case timeOfDay === "night" && weather === "clouds":
        return "clouds-night";
      case timeOfDay === "night" && weather === "rain":
        return "rain-night";
      case timeOfDay === "night" && weather === "snow":
        return "snow-night";
      case timeOfDay === "day" && weather === "clear":
        return "day";
      case timeOfDay === "day" && weather === "clouds":
        return "clouds";
      case timeOfDay === "day" && weather === "rain":
        return "rain";
      case timeOfDay === "day" && weather === "snow":
        return "snow";
      default:
        return null;
    }
  };

  render() {
    return (
      <div className={`App title ${this.backgroundHandler()}`}>
        <span>What's The Weather Like</span>
        <DailyForecast
          apiKey={ApiKeys}
          timeOfDay={this.nightNDayHandler}
          condition={this.conditionHandler}
        />
        <WeeklyForecast apiKey={ApiKeys} />
      </div>
    );
  }
}

export default App;
