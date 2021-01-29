import React from "react";
import styled from "styled-components";

import {
  getCurrentTime,
  dateAndTime,
  unixToLocalTime,
  formatTime,
} from "../util/time";

const Forecast = ({
  day,
  timezone,
  dew,
  humidity,
  precipitation,
  sunrise,
  sunset,
  high,
  low,
  uvi,
  conditions,
  icon,
  wind_speed,
  wind_direction,
  pressure,
}) => {
// pop: probablility of precipitation (chance of rain/snow)  0.6 = 60%
// pressure units: hPa (same as millibar) - barometric
// barometric pressure on tv weather reports use inches of mercury "Hg
//  33.8639 millibars = 1 inch of mercury
// samsung s6 Viewport 360 x 640
  let weekday = unixToLocalTime(day, timezone).substring(0, 3);
  let _sunrise = formatTime(unixToLocalTime(sunrise, timezone));
  let _sunset = formatTime(unixToLocalTime(sunset, timezone));
  let highTemp = Math.round(high);
  let lowTemp = Math.round(low);
  let windSpeed = Math.round(wind_speed);
  let hgPressure = Math.round(pressure / 33.8639);
  let precip = precipitation * 100;

  return (
    <Row>
      <Main>
        <Flex>
          <h2>{weekday}</h2>
          <h1 className={`owi owi-${icon} owi-4x`} alt="weather graphic"></h1>
        </Flex>
        <Flex>
          <p>
            {highTemp}°/{lowTemp}°
          </p>
          <p>{conditions}</p>
        </Flex>
      </Main>
      <Secondary>
        <div>
          <p>sunrise {_sunrise}</p>
          <p>sunset {_sunset}</p>
          <p>uv index: {uvi}</p>
        </div>

        <div>
          <p>Wind {windSpeed}mph</p>
          <p>direction {wind_direction}°</p>
          <p>air pressure {hgPressure}"Hg</p>
        </div>

        <div>
          <p>dew point: {dew}°F</p>
          <p>Humidity {humidity}%</p>
          <p>precipitation {precip}%</p>
        </div>
      </Secondary>
    </Row>
  );
};

const Row = styled.div`
  width: 100%;
  height: 120px;
  margin: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  p {
    font-size: 0.8rem;
  }
`;

const Main = styled.div`
  background-color: #c6c2c2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Secondary = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default Forecast;
