import React, { useEffect } from "react";
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
  const setId = (day) => {
    let id = day;
    if (currentDay === day) id = "highlighted";
    return id;
  };

  useEffect(() => {
    let element = document.querySelector("#highlighted");
    element.scrollIntoView({ behavior: "smooth", inline: "center" });
    // scrolls to current day after render
  });

  return (
    <Header>
      <Scroll>
        {daily.map((day) => (
          <div
            id={setId(day.dt)}
            key={day.dt}
            className="date"
            onClick={() => setCurrentDay(day.dt)}
          >
            {getDay(unixToLocalTime(day.dt, timezone))}
          </div>
        ))}
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
    padding: 0 .5em;
  }
`;

const Toggler = styled.div`
  position: relative;
  width: 4em;
  padding: 0 0.5em;
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
