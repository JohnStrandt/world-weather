import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { iconStyle } from "../util/styles";

import { unixToLocalTime, formatTime } from "../util/time";
import { windDirection } from "../util/utilities";

const DayDetails = ({ data }) => {

  const timezone = useSelector((state) => state.location.timezone);

  let _sunrise = formatTime(unixToLocalTime(data.sunrise, timezone));
  let _sunset = formatTime(unixToLocalTime(data.sunset, timezone));
  let highTemp = Math.round(data.temp.max);
  let lowTemp = Math.round(data.temp.min);
  let windSpeed = Math.round(data.wind_speed);
  let wind_dir = windDirection(data.wind_deg);
  let hgPressure = Math.round(data.pressure / 33.8639);
  let precip = Math.round(data.pop * 100);
  let dew = Math.round(data.dew_point);

  return (
    <Card>
      <div className="headline">
        <div>
          <i className={iconStyle(data.weather[0].icon)}></i>
        </div>
        <div>
          <p>{data.weather[0].description}</p>
          <p>
            high {highTemp}° ~ low {lowTemp}°
          </p>
        </div>
      </div>
      <ul className="details">
        <li>
          wind {wind_dir} {windSpeed}
          <span className="small-text">mph</span>
        </li>
        <li>
          BP {hgPressure}"<span className="small-text">Hg</span>
        </li>
        <li>{data.humidity}% Humidity</li>
        <li>Dew Point {dew}°</li>
        <li>UV {data.uvi}</li>
        <li>Precip {precip}%</li>
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
          <div>{Math.round(data.temp.morn)}°</div>
          <div>{Math.round(data.temp.day)}°</div>
          <div>{Math.round(data.temp.eve)}°</div>
          <div>{Math.round(data.temp.night)}°</div>
        </div>
        <div className="row">
          <div className="small-text">feels like</div>
          <div>{Math.round(data.feels_like.morn)}°</div>
          <div>{Math.round(data.feels_like.day)}°</div>
          <div>{Math.round(data.feels_like.eve)}°</div>
          <div>{Math.round(data.feels_like.night)}°</div>
        </div>
      </Temps>
      <div className="sunTimes">
        <p>sunrise {_sunrise}</p>
        <p>sunset {_sunset}</p>
      </div>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  .headline {
    display: flex;
    padding: 0.8em 0;
    justify-content: center;
    line-height: 1.5em;
  }
  .headline i {
    font-size: 3rem;
    padding-right: 1em;
  }
  .details {
    padding-bottom: 0.8em;
    display: flex;
    justify-content: center;
    line-height: 1.5em;
  }
  .small-text {
    font-size: 0.8rem;
  }
  .sunTimes {
    display: flex;
    justify-content: space-between;
    padding: 0.8em 0 0 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
  li {
    padding-right: 1em;
  }
`;

const Temps = styled.div`
  .row {
    display: grid;
    line-height: 1.8em;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export default DayDetails;
