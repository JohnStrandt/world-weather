import React from "react";
import styled from "styled-components";

import {
  getCurrentTime,
  dateAndTime,
} from "../util/time";

const CurrentWeather = ({
  city,
  country,
  timezone,
  alerts,
  temp,
  feels_like,
  humidity,
  pressure,
  dew_point,
  conditions,
  icon,
  wind,
  wind_deg,
  visibility,
}) => {
  let localTime = dateAndTime(getCurrentTime(timezone));
  let currentTemp = Math.round(temp);
  let feelsLike = Math.round(feels_like);
  let _visibility = Math.round(visibility/1609.34);
  let _pressure = Math.round(pressure/33.8639);
  let _wind = Math.round(wind);
  let _dew_point = Math.round(dew_point);

  if (alerts) {
    alerts.forEach((alert) => {
      console.log(alert);
    });
  }

  return (
  <Current>
    <div>
      <h3>{city}, {country}</h3>
      <p className="small-font">{localTime}</p>
    </div>
    <div className="conditions">
      <p className={`owi owi-${icon}`}> {currentTemp}°F
        <span className="wi-fahrenheit"></span>
      </p>
    </div>
    <div className="bold">{conditions}, feels like {feelsLike}°</div>
    <ConditionsSecondary>
      <li>
        <p wind className="wi wi-wind from-330-deg"></p>
        {_wind}mph {wind_deg}°
      </li>
      <li className="wi wi-barometer">{_pressure}"Hg</li>
      <li>{humidity}%<span className="wi wi-humidity"> Humidity</span></li>
      <li>Dew Point {_dew_point}°F</li>
      <li>Visibility {_visibility}mi</li>
    </ConditionsSecondary>
    {alerts ? 
      alerts.map(alert => (
        <div className="alerts">
          <p>Alert: {alert.event}</p>
          {/* alert.description for details */}
        </div>
      )) : ""}
  </Current>
  );
};

const Current = styled.div `
  width: 100%;
  .conditions {
    padding: .5rem 0;
    font-size: 3rem;
  }
  h3 {
    line-height: 1.5rem;
  }
  .bold {
    font-weight: 600; 
  }
  .small-font {
    font-size: .9rem;
  }
  .alerts {
    font-weight:bold;
    color: red;
    line-height: 2rem;
  }
`;

const ConditionsSecondary = styled.ul `
  display: flex;
  flex-wrap: wrap;
  line-height: 1.5rem;
  list-style-type: none;
  margin-top: 10px;
  li {
  padding-right: 1rem;
}
`;

export default CurrentWeather;