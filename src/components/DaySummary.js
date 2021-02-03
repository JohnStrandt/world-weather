import React from "react";
import styled from "styled-components";

import { unixToLocalTime, getDay } from "../util/time";
import down from "../images/down.svg";

const DaySummary = ({ toggleDetails, setCurrentDay, day, timezone }) => {
  let weekday = getDay(unixToLocalTime(day.dt, timezone));
  let high = Math.round(day.temp.max);
  let low = Math.round(day.temp.min);

  const clickHandler = () => {
    setCurrentDay(day.dt);
    toggleDetails();
  };

  return (
    <Day onClick={clickHandler}>
      <div className="date">{weekday}</div>
      <div
        className={`owi owi-${day.weather[0].icon}`}
      >{` ${high}/${low}`}</div>
      <div className="description">{day.weather[0].description}</div>
      <div className="arrow">
        <img src={down} alt="down" />
      </div>
    </Day>
  );
};

const Day = styled.div`
  line-height: 2.3rem;
  border-bottom: 1px solid white;
  display: grid;
  grid-template-columns: 4fr 3fr 4fr 1fr;
  img {
    width: 0.7rem;
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
    text-align: center;
  }
  :hover {
    cursor: pointer;
    background: var(--color-darker);
  }
`;

export default DaySummary;
