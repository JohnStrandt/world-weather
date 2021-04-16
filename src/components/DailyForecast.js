import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { iconStyle } from "../util/styles";
import next from "../images/next.svg";

const DailyForecast = ({ toggleDetails, setCurrentDay }) => {

  const daily = useSelector((state) => state.dailySummary);

  let dailyForecast = daily.map((day) => (
    <Day
      key={day.dt}
      onClick={() => {
        setCurrentDay(day.dt);
        toggleDetails();
      }}
    >
      <div className="day">{day.weekday}</div>
      <div className="hilo">
        <div className={iconStyle(day.icon)}></div>
        <div>
          {day.high} <span className="light">{day.low}</span>
        </div>
      </div>
      <div className="description">{day.description}</div>
      <div className="arrow">
        <img src={next} alt="next" />
      </div>
    </Day>
  ));

  return dailyForecast;
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

export default DailyForecast;
