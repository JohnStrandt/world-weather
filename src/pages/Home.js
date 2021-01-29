import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
// Components
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import DaySummary from "../components/DaySummary";
// time utils
import { dateAndTime, unixToLocalTime, getCurrentTime } from "../util/time";

const Home = () => {
  const location = useSelector((state) => state.location);
  const current = useSelector((state) => state.current);
  const daily = useSelector((state) => state.daily);
  const hourly = useSelector((state) => state.hourly);


  console.log(location);
  // console.log(current);
  console.log(daily);
  // console.log(hourly);

  return (
    <Page>
      {current ? (
        <Today>
          <CurrentWeather
            city={location.city}
            country={location.country}
            timezone={location.timezone}
            alerts={current.alerts}
            temp={current.temp}
            feels_like={current.feels_like}
            humidity={current.humidity}
            pressure={current.pressure}
            dew_point={current.dew_point}
            conditions={current.weather[0].description}
            icon={current.weather[0].icon}
            wind={current.wind_speed}
            wind_deg={current.wind_deg}
            visibility={current.visibility}
          />
        </Today>
      ) : (
        ""
      )}
      <Week>
        <Preview>
          {/*   false was _daily ? ...    */}
          {daily
            ? daily.map((day) => (
                <div key={day.dt}>
                  <DaySummary
                    day={day.dt}
                    timezone={location.timezone}
                    icon={day.weather[0].icon}
                    high={day.temp.max}
                    low={day.temp.min}
                    conditions={day.weather[0].description}
                  />
                </div>
              ))
            : ""}
        </Preview>
        <Details>
          {false
            ? daily.map((day) => (
                <li key={day.dt}>
                  <Forecast
                    day={day.dt}
                    timezone={location.timezone}
                    dew={day.dew_point}
                    humidity={day.humidity}
                    precipitation={day.pop}
                    sunrise={day.sunrise}
                    sunset={day.sunset}
                    high={day.temp.max}
                    low={day.temp.min}
                    uvi={day.uvi}
                    conditions={day.weather[0].description}
                    icon={day.weather[0].icon}
                    wind_speed={day.wind_speed}
                    wind_direction={day.wind_deg}
                    pressure={day.pressure}
                  />
                </li>
              ))
            : ""}
        </Details>
      </Week>
    </Page>
  );
};

const Page = styled.div`
  width: 100%;
  /* max-width: 1200px; */
  margin: 25px auto 0 auto;
`;

const Today = styled.div`
  margin-bottom: 1rem;
  color: var(--color-primary);
  margin: 0 auto;
  padding: 1rem;
  max-width: 500px;
  overflow: hidden;
`;

const Week = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 1rem;
  ul {
    list-style: none;
  }
`;

const Preview = styled.div`
  width: 100%;
  background-color: var(--color-primary);
  color: white;

  TableRow:hover{
    cursor: pointer;
    background-color: #1573aa;
  }
`;

const Details = styled.ul``;

export default Home;
