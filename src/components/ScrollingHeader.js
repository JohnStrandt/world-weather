import React from "react";
import styled from "styled-components";
import { getDay, unixToLocalTime } from "../util/time";
import up from "../images/up.svg";

const ScrollingHeader = ({
  toggleDetails,
  currentDay,
  setCurrentDay,
  timezone,
  daily,
}) => {
  const checkDay = (day) => {
    let textStyle = "normal";
    if (currentDay === day) textStyle = "highlighted";
    return textStyle;
  };

  return (
    <Header>
      <Scroll>
        {daily.map((day) => (
          <div
            id="date"
            key={day.dt}
            className={checkDay(day.dt)}
            onClick={() => setCurrentDay(day.dt)}
          >
            {getDay(unixToLocalTime(day.dt, timezone))}
          </div>
        ))}
      </Scroll>
      <Toggler onClick={toggleDetails}>
        <img src={up} alt="up arrow" />
      </Toggler>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  .highlighted {
    font-weight: bold;
    color: var(--color-accent);
  }
`;

const Scroll = styled.div`
  background-color: var(--color-secondary);
  display: flex;
  padding: 0.5rem 0;
  overflow: auto;
  white-space: nowrap;
  :hover {
    cursor: pointer;
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  #date {
    display: inline-block;
    padding-right: 1rem;
  }
`;

const Toggler = styled.div`
  width: 3rem;
  padding: 0.5rem 1rem;
  :hover {
    cursor: pointer;
    background-color: var(--color-secondary);
  }
  img {
    width: 1rem;
  }
`;

export default ScrollingHeader;
