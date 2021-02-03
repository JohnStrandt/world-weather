import React from "react";
import styled from "styled-components";

import {
  unixToLocalTime,
  formatTime,
} from "../util/time";

const DayDetails = ({ timezone, data }) => {
  let _sunrise = formatTime(unixToLocalTime(data.sunrise, timezone));
  let _sunset = formatTime(unixToLocalTime(data.sunset, timezone));
  let highTemp = Math.round(data.temp.max);
  let lowTemp = Math.round(data.temp.min);
  let windSpeed = Math.round(data.wind_speed);
  let hgPressure = Math.round(data.pressure / 33.8639);
  let precip = data.pop * 100;
  let dew = Math.round(data.dew_point);
  
  return (
    <Card>
    <div className="headline">
      <div>
        <i className={`owi owi-${data.weather[0].icon}`}></i>
      </div>
      <div>
      <p>{data.weather[0].description}</p>
      <p>High of {highTemp}°F, low of {lowTemp}°F</p>
      </div>
    </div>
    <ul className="details">
      <li>wind {windSpeed}mph {data.wind_deg}°</li>
      <li >{hgPressure}"Hg</li>
      <li>{data.humidity}% Humidity</li>
      <li>Dew Point {dew}°F</li>
      <li>UV {data.uvi}</li>
      <li>Precipitation {precip}%</li>
    </ul>

    <Temps>
        <div className="row">
          <div></div>
          <div className="small-text">Morning</div>
          <div className="small-text">Daytime</div>
          <div className="small-text">Evening</div>
          <div className="small-text">Night</div>
        </div>
        <div className="row">
          <div className="small-text">temp</div>
          <div>{Math.round(data.temp.morn)}°F</div>
          <div>{Math.round(data.temp.day)}°F</div>
          <div>{Math.round(data.temp.eve)}°F</div>
          <div>{Math.round(data.temp.night)}°F</div>
        </div>
        <div className="row">
          <div className="small-text">feels like</div>
          <div>{Math.round(data.feels_like.morn)}°F</div>
          <div>{Math.round(data.feels_like.day)}°F</div>
          <div>{Math.round(data.feels_like.eve)}°F</div>
          <div>{Math.round(data.feels_like.night)}°F</div>
        </div>
      </Temps>
      <div className="sun">sunrise {_sunrise}, sunset {_sunset}</div>
  </Card>
  );
};
const Temps = styled.div`
  .row {
    display: grid;
    line-height: 1.5rem;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media only screen and (max-width: 600px) {
    font-size: .8rem;
  }
`;

const Card = styled.div`
  .headline {
    display: flex;
    align-items: center;
    margin: .5rem 0;
    line-height: 1.5rem;
  }
  .headline i {
    font-size: 3rem;
    padding: 12px 12px 0px 0px;
  }
  .details {
    display: flex;
    line-height: 1.5rem;
    margin: .5rem 0;
  }
  .temps {
    margin-bottom: .5rem;
  }
  .small-text {
    font-size: .8rem;
  }
  .bold {
    font-size: normal;
    font-weight: 600;
  }
  .sun {
    line-height: 2rem;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    align-items: space-around;
    list-style-type: none;
    /* margin: 10px 0; */
    line-height: 1.4rem;
  }
  li {
    padding-right: 1rem;
  }
`;

export default DayDetails;
