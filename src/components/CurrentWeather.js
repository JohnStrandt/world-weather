import React from "react";
import styled from "styled-components";
import { getCurrentTime, dateAndTime } from "../util/time";

const CurrentWeather = ({ location, current }) => {
  let localTime = dateAndTime(getCurrentTime(location.timezone));
  let currentTemp = Math.round(current.temp);
  let feelsLike = Math.round(current.feels_like);
  let _visibility = Math.round(current.visibility / 1609.34);
  let _pressure = Math.round(current.pressure / 33.8639);
  let _wind = Math.round(current.wind_speed);
  let _dew_point = Math.round(current.dew_point);
  let alerts = current.alerts;

  return (
    <Current>
      <div>
        <h3>
          {location.city}, {location.country}
        </h3>
        <p className="small-font">{localTime}</p>
      </div>
      <div className="conditions">
        <p className={`owi owi-${current.weather[0].icon}`}>
          {" "}
          {currentTemp}°F
          <span className="wi-fahrenheit"></span>
        </p>
      </div>
      <div className="bold">
        {current.weather[0].description}, feels like {feelsLike}°
      </div>
      <ConditionsSecondary>
        <li>
          <p className="wi wi-wind from-330-deg"></p>
          wind {_wind}mph {current.wind_deg}°
        </li>
        <li className="wi wi-barometer">{_pressure}"Hg</li>
        <li>
          {current.humidity}%<span className="wi wi-humidity"> Humidity</span>
        </li>
        <li>Dew Point {_dew_point}°F</li>
        <li>Visibility {_visibility}mi</li>
      </ConditionsSecondary>
      {alerts
        ? alerts.map((alert) => (
            <div className="alerts" key={alert.event}>
              <p>{alert.event}</p>
              {/* alert.description for details */}
            </div>
          ))
        : ""}
    </Current>
  );
};

const Current = styled.div`
  width: 100%;
  .conditions {
    padding: 0.5rem 0;
    font-size: 3rem;
  }
  h3 {
    line-height: 1.5rem;
  }
  .bold {
    font-weight: 600;
  }
  .small-font {
    font-size: 0.9rem;
  }
  .alerts {
    font-weight: bold;
    color: var(--color-accent);
    line-height: 1.2rem;
  }
`;

const ConditionsSecondary = styled.ul`
  display: flex;
  flex-wrap: wrap;
  line-height: 1.5rem;
  list-style-type: none;
  margin: .7rem 0;
  li {
    padding-right: 1rem;
  }
`;

export default CurrentWeather;
