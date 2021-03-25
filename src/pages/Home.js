import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
// Components
import CurrentWeather from "../components/CurrentWeather";
import HourlyTemps from "../components/HourlyTemps";
import DaySummary from "../components/DaySummary";
import DayDetails from "../components/DayDetails";
import ScrollingHeader from "../components/ScrollingHeader";
import { getGPSWeather } from "../actions/weatherAction";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // get geolocation on startup
    const success = (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      dispatch(getGPSWeather(lat, lon));
    };
    const fail = (error) => {
      console.error(error);
    };
    navigator.geolocation.getCurrentPosition(success, fail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useSelector((state) => state.location);
  const current = useSelector((state) => state.current);
  const daily = useSelector((state) => state.daily);
  const hourly = useSelector((state) => state.hourly);
  // Forecast States
  const [currentDay, setCurrentDay] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  // toggle forecast detail state
  const [showDetails, setShowDetails] = useState(false);

  const toggler = () => {
    showDetails ? setShowDetails(false) : setShowDetails(true);
  };

  useEffect(() => {
    setShowDetails(false);
  }, [location]);

  useEffect(() => {
    setCurrentData(daily.find((day) => day.dt === currentDay));
  }, [currentDay, daily]);

  return (
    <Page>
      {current && location ? (
        <Today>
          <CurrentWeather location={location} current={current} />
        </Today>
      ) : (
        ""
      )}
      {hourly && location ? (
        <Hourly>
          <HourlyTemps timezone={location.timezone} hourly={hourly} />
        </Hourly>
      ) : (
        ""
      )}
      <Week>
        {!showDetails && daily && location ? (
          <Preview>
            {daily.map((day) => (
              <DaySummary
                key={day.dt}
                toggleDetails={toggler}
                setCurrentDay={setCurrentDay}
                timezone={location.timezone}
                day={day}
              />
            ))}
          </Preview>
        ) : (
          ""
        )}
        <>
          {showDetails ? (
            <Details>
              {location && daily ? (
                <ScrollingHeader
                  toggleDetails={toggler}
                  currentDay={currentDay}
                  setCurrentDay={setCurrentDay}
                  timezone={location.timezone}
                  daily={daily}
                />
              ) : (
                ""
              )}
              {location && currentData ? (
                <DayDetails timezone={location.timezone} data={currentData} />
              ) : (
                ""
              )}
            </Details>
          ) : (
            ""
          )}
        </>
      </Week>
    </Page>
  );
};

const Page = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
`;

const Today = styled.div`
  margin: 0 auto;
  max-width: 500px;
  overflow: hidden;
  text-align: center;
`;

const Hourly = styled.div`
  margin: 1.2rem 1rem;
`;

const Week = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  ul {
    list-style: none;
  }
`;

const Preview = styled.div`
  width: 100%;
`;

const Details = styled.div`
  width: 100%;
  padding: 0 10px;
`;

export default Home;
