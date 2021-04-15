import React from "react";
import styled from "styled-components";
import { iconStyle } from "../util/styles";
import next from "../images/next.svg";

import {
  unixToLocalTime,
  getWeekday,
  getCurrentTime,
  getDay,
} from "../util/time";

const DaySummary = ({ toggleDetails, setCurrentDay, day, timezone }) => {
  let localTime = unixToLocalTime(day.dt, timezone);
  let weekday = getWeekday(localTime);
  let high = Math.round(day.temp.max);
  let low = Math.round(day.temp.min);
  // dates compared in format: Tue, Apr 06
  let currentDay = getDay(localTime);
  let today = getDay(getCurrentTime(timezone));
  if (currentDay === today) {
    weekday = "Today";
  }

  const clickHandler = () => {
    setCurrentDay(day.dt);
    toggleDetails();
  };

  return (
    <Day onClick={clickHandler}>
      <div className="day">{weekday}</div>
      <div className="hilo">
        <div className={iconStyle(day.weather[0].icon)}></div>
        <div>
          {high} <span className="light">{low}</span>
        </div>
      </div>
      <div className="description">{day.weather[0].description}</div>
      <div className="arrow">
        <img src={next} alt="next" />
      </div>
    </Day>
  );
};

const Day = styled.div`
  line-height: 1.8em;
  display: grid;
  grid-template-columns: 4fr 3fr 4fr 1fr;
  img {
    width: 1em;
  }
  .hilo {
    display: flex;
    gap: 1em;
    @supports (-webkit-touch-callout: none) {
      justify-content: space-evenly;
    }
  }
  .owi {
    padding-top: 0.5em;
  }
  .description {
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .arrow {
    position: relative;
  }
  .arrow img {
    width: 1rem;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
  }
  :hover {
    cursor: pointer;
    background-color: var(--color-hover);
  }
  .light {
    font-weight: 100;
  }
`;

export default DaySummary;
