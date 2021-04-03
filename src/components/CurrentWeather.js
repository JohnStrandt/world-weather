import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCurrentTime, dateAndTime } from "../util/time";
import Alerts from "./Alerts";

const CurrentWeather = ({ location, current }) => {
  let localTime = dateAndTime(getCurrentTime(location.timezone));
  let currentTemp = Math.round(current.temp);
  let highTemp = Math.round(current.high_temp);
  let lowTemp = Math.round(current.low_temp);
  let alerts = current.alerts;

  const [currentTime, setCurrentTime] = useState(localTime);

  // live clock is a running clock that updates local time
  // clearInterval is a cleanup function necessary to prevent
  // strange side effects such as multiple instances running.
  // after changing locations...
  useEffect(() => {
    const liveClock = setInterval(() => {
      let now = dateAndTime(getCurrentTime(location.timezone));
      if (currentTime !== now) {
        setCurrentTime(now);
      }
    }, 1000);
    return () => {
      clearInterval(liveClock);
    };
  });

  return (
    <Current>
      <div>
        <p className="city-font">{location.city}</p>
        <p className="text-small">{currentTime}</p>
      </div>

      <div className="conditions">
        <p className="text-small">{current.weather[0].description}</p>
        <p className="temp-font">{currentTemp}°</p>
        <p className="text-small">
          high {highTemp}° ~ low {lowTemp}°
        </p>
      </div>

      {alerts && (
        <>
          {alerts.map(alert => (
          <p className="alerts" key={alert.event}>
            {alert.event}</p>
          ))}
          {/* <Alerts /> */}
        </>
      )}
    </Current>
  );
};

const Current = styled.div`
  position: relative;
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
