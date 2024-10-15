import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentTime, dateAndTime } from "../util/time";
import { windDirection } from "../util/utilities";
// import arrow from "../images/double_arrow_accent.svg";

const CurrentWeather = () => {

  const { location, current } = useSelector((state) => state);

  let localTime = dateAndTime(getCurrentTime(location.timezone));
  let currentTemp = Math.round(current.temp);
  let alerts = current.alerts;
  let wind_speed = Math.round(current.wind_speed);
  let wind_dir = windDirection(current.wind_deg);
  const [currentTime, setCurrentTime] = useState(localTime);
  const dispatch = useDispatch();

  useEffect(() => {
    const liveClock = setInterval(() => {
      let now = dateAndTime(getCurrentTime(location.timezone));
      if (currentTime !== now) {
        setCurrentTime(now);
      }
    }, 1000);
    return () => {
      clearInterval(liveClock);
      // cleanup function clears instances of clock when changing locations
    };
  });

  const alertClickHandler = () => {
    dispatch({
      type: "TOGGLE_SHOW_ALERTS",
    });
  };

// ORIGINAL ALERT SECTION DISPLAYING HEADLINES OF EACH ALERT
// I COULD NOT COMMENT OUT IN PLACE
  // {alerts && (
  //   <div className="alerts">
      // {alerts.map((alert) => (
      //   <div className="alert" onClick={alertClickHandler} key={alert.event}>
  //         <p key={alert.event}>
  //           {alert.event} <img src={arrow} alt="details" />
  //         </p>
  //       </div>
  //     ))}

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

          <p className="alert" onClick={alertClickHandler} >
            Weather Alert!
          </p>

      )}
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
  .small-text {
    font-size: 0.9em;
  }
  .alerts {
    margin: 0.5em 0;
  }
  .alert {
    cursor: pointer;
    position: relative;
    font-weight: 400;
    color: var(--color-accent);
    //line-height: 1.2em;
    margin-top: 0.7em; // added
  }
  .alert img {
    width: 1em;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
  }
  .conditions {
    padding: 0;
    margin-top: 1em;
  }
`;

export default CurrentWeather;
