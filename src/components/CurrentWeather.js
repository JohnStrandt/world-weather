import React from "react";
import styled from "styled-components";
import { getCurrentTime, dateAndTime } from "../util/time";

const CurrentWeather = ({ location, current }) => {
  let localTime = dateAndTime(getCurrentTime(location.timezone));
  let currentTemp = Math.round(current.temp);
  let highTemp = Math.round(current.high_temp);
  let lowTemp = Math.round(current.low_temp);
  let alerts = current.alerts;

  return (
    <Current>
      <div>
        <p className="city-font">{location.city}</p>
        <p className="text-small">{localTime}</p>
      </div>

      <div className="conditions">
        <p className="text-small">{current.weather[0].description}</p>
        <p className="temp-font">{currentTemp}°</p>
        <p className="text-small">
          high {highTemp}° ~ low {lowTemp}°
        </p>
      </div>

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
  margin: 0 auto;
  text-align: center;

  .city-font {
    font-size: 2rem;
    line-height: 1.2em;
  }
  .temp-font {
    font-size: 4rem;
    line-height: 1em;
  }
  .text-small {
    font-size: 0.9rem;
  }
  .alerts {
    font-weight: normal;
    color: var(--color-accent);
    line-height: 1.2em;
  }
  .conditions {
    padding: 0;
    margin-top: 1em;
  }
`;

export default CurrentWeather;
