import React from "react";
import styled from "styled-components";

import { unixToLocalTime, getDay } from "../util/time";
import down from "../images/down.svg";

const DaySummary = ({ day, icon, timezone, high, low, conditions }) => {
  let weekday = getDay(unixToLocalTime(day, timezone));
  let highTemp = Math.round(high);
  let lowTemp = Math.round(low);

  return (
    <Day>
      <div className="date">{weekday}</div>
      <div className={`owi owi-${icon}`}>
        {` ${highTemp}/${lowTemp}`}
      </div>
      <div className="description">{conditions}</div>
      <div className="arrow">
        <img src={down} alt="down" />
      </div>
    </Day>
  );
};

const Day = styled.div`
  line-height: 2.1rem;
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
  :hover{
    cursor: pointer;
    background: var(--color-darker);
  }
`;

export default DaySummary;
