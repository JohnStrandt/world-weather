import React from "react";
import styled from "styled-components";
import { getHour, unixToLocalTime } from "../util/time";

const HourlyTemps= ({
  timezone,
  hourly,
}) => {

  return (
    <Scroll>
      {hourly.map((hour) => (
        <Hour
          key={hour.dt}
        >
          <div>
          {getHour(unixToLocalTime(hour.dt, timezone))}
          </div>
          <div>
            <i className={`owi owi-${hour.weather[0].icon}`}></i>
          </div>
          <div>
            {Math.round(hour.temp)}°
          </div>        
        </Hour>
      ))}
    </Scroll>
  );
};

const Scroll = styled.div`
  font-size: .8rem;
  text-align: center;
  display: flex;
  overflow: auto;
  white-space: nowrap;
  :hover {
    cursor: pointer;
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

const Hour = styled.div`
  padding-right: 2rem;
  i {
    font-size: 1.2rem;
  }
`;

export default HourlyTemps;
