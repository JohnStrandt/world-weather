import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getCurrentTime, dateAndTime } from "../util/time";
import { windDirection } from "../util/utilities";

const CurrentWeather = ({ location, current }) => {
  
  let localTime = dateAndTime(getCurrentTime(location.timezone));
  let currentTemp = Math.round(current.temp);
  let alerts = current.alerts;
  let wind_speed = Math.round(current.wind_speed);
  let wind_dir = windDirection(current.wind_deg);
  const [currentTime, setCurrentTime] = useState(localTime);
  const dispatch = useDispatch();

  // live clock is a running clock that updates local time
  // clearInterval is the cleanup function necessary to prevent
  // strange side effects such as multiple instances running
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

  const alertClickHandler = () =>{
    dispatch({
      type: "TOGGLE_SHOW_ALERTS",
    });
  };


  return (
    <Current>
      <div>
        <p className="city-font">{location.city}</p>
        <p className="small-text">{currentTime}</p>
      </div>
      <div className="conditions">
        <p className="small-text">{current.weather[0].description}</p>
        <p className="temp-font">{currentTemp}°</p>
        <p className="small-text">
          wind {wind_dir} at {wind_speed}
          <span className="small-text">mph</span>
        </p>
      </div>

      {alerts && (
        <div className="alerts" onClick={alertClickHandler}>
          {alerts.map((alert) => (
            <p key={alert.event}>
              {alert.event}
            </p>
          ))}
        </div>
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
  .small-text {
    font-size: 0.9em;
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
