import React from "react";
import styled from "styled-components";
import { getDay, unixToLocalTime } from "../util/time";
import clear from "../images/clear.svg";

const ScrollingHeader = ({
  toggleDetails,
  currentDay,
  setCurrentDay,
  timezone,
  daily,
}) => {

  const checkDay = (day) => {
    let id = day;
    if (currentDay === day) id = "highlighted";
    return id;
  };

  const scrollActiveDay = () => {
    let element = document.querySelector('#highlighted');
    if (element !== null) element.scrollIntoViewIfNeeded(true);
    // true is an optional boolean to center the element
    return ""; // <== this is just to avoid a nag message
  };

  return (
    <Header>
      <Scroll>
        {daily.map((day) => (
          <div
            id={checkDay(day.dt)}
            key={day.dt}
            className="date"
            onClick={() => setCurrentDay(day.dt)}
          >
            {getDay(unixToLocalTime(day.dt, timezone))}
          </div>
        ))}
        {scrollActiveDay()}
      </Scroll>
      <Toggler onClick={toggleDetails}>
        <img src={clear} alt="exit" />
      </Toggler>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  #highlighted {
    font-weight: bold;
    color: var(--color-accent);
  }
`;

const Scroll = styled.div`
  display: flex;
  padding: 0.4em 0;
  overflow: auto;
  white-space: nowrap;
  :hover {
    cursor: pointer;
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .date {
    display: inline-block;
    padding-right: 1em;
  }
`;

const Toggler = styled.div`
  position: relative;
  width: 4em;
  padding: 0 .5em;
  :hover {
    cursor: pointer;
  }
  img {
    width: 1.5em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default ScrollingHeader;
