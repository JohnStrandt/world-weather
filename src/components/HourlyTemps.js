import React, { useEffect } from "react";
import styled from "styled-components";
import { iconStyle } from "../util/styles";

const HourlyTemps = ({ hourlyForecast }) => {

  useEffect(() => {
    // reset hourly forecast scroll position on location change
    let firstDay = document.getElementsByClassName("hours")[0];
    let firstHour = firstDay.firstElementChild;
    firstHour.scrollIntoView({ behavior: "smooth", inline: "start" });
  });

  return (
    <Scroll>
      {hourlyForecast.map((day) => (

        <div key={day.label}>
          <p className="day-label">{day.label}</p>

          <div className="hours">
          {day.hours.map(hour => (

            <div className="hour" key={hour.time}>
              <div>{hour.time}</div>
              <div>
                <i className={iconStyle(hour.icon)}></i>
              </div>
              <div>{hour.temp}°</div>
            </div>

          ))}
          </div>
        </div>
      ))}
    </Scroll>
  );
};


const Scroll = styled.div`
  font-size: 0.8rem;
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
  .day-label {
  position: -webkit-sticky;
  position: sticky;
  display: inline-block;/* this is key to sticky working */
  left: 0;
  margin-right: 2rem;
  margin-bottom: .75em;
  }
  .hours {
    display: flex;
  }
  .hour{
    text-align: center;
    margin-right: 2rem;
    i {
      font-size: 1.2rem;
  }
}
`;


export default HourlyTemps;
