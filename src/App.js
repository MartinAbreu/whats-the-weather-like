import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import WeeklyForecast from "./components/weekly-forecast/weekly-forecast";
import DailyForecast from "./components/daily-forecast/daily-forecast";

function App() {
  return (
    <div className="App">
      <h1>What's The Weather Like?</h1>
      <WeeklyForecast />
      <DailyForecast />
    </div>
  );
}

export default App;
