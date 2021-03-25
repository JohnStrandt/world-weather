import React from "react";
import styled from "styled-components";

import { unixToLocalTime, getWeekday } from "../util/time";
import next from "../images/next.svg";

const DaySummary = ({ toggleDetails, setCurrentDay, day, timezone }) => {
  let weekday = getWeekday(unixToLocalTime(day.dt, timezone));
  let high = Math.round(day.temp.max);
  let low = Math.round(day.temp.min);

  const clickHandler = () => {
    setCurrentDay(day.dt);
    toggleDetails();
  };

  return (
    <Day onClick={clickHandler}>
      <div className="date">{weekday}</div>
      <div className="hilo">
        <div className={`owi owi-${day.weather[0].icon}`}></div>
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
  line-height: 1.9rem;
  display: grid;
  grid-template-columns: 4fr 3fr 4fr 1fr;
  img {
    width: 0.7rem;
  }
  .hilo {
    display: flex;
    gap: 1rem;
  }
  .owi {
    padding-top: 0.5rem;
  }
  .date {
    padding-left: 0.5rem;
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
    left: 0;
    right: 0;
    bottom: 0;
  }
  :hover {
    cursor: pointer;
    background-color:#0247a8;
  }
  .light {
    font-weight: 100;
  }
`;

export default DaySummary;
