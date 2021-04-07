import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// Components
import {
  CurrentWeather,
  HourlyTemps,
  DaySummary,
  ScrollingHeader,
  DayDetails,
} from "../components";

const Home = () => {
  // state data for components
  const { location, current, daily, hourly } = useSelector((state) => state);
  // Forecast Details State
  const [currentDay, setCurrentDay] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  // used to toggle Forecast Details render
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setCurrentData(daily.find((day) => day.dt === currentDay));
  }, [currentDay, daily]);

  useEffect(() => {
    setShowDetails(false);
  }, [location]); // hide details on location change

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Page>
      <DynamicMargin />

      {location && current && (
        <CurrentWeather location={location} current={current} />
      )}

      <DynamicMargin />

      {location && hourly && (
        <HourlyTemps timezone={location.timezone} hourly={hourly} />
      )}

      <DynamicMargin />

      {!showDetails && daily && location && (
        <div>
          {daily.map((day) => (
            <DaySummary
              key={day.dt}
              toggleDetails={toggleDetails}
              setCurrentDay={setCurrentDay}
              timezone={location.timezone}
              day={day}
            />
          ))}
        </div>
      )}
      {showDetails && daily && currentData && (
        <div>
          <ScrollingHeader
            toggleDetails={toggleDetails}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            timezone={location.timezone}
            daily={daily}
          />
          <DayDetails timezone={location.timezone} data={currentData} />
        </div>
      )}
    </Page>
  );
};

const Page = styled.div`
  margin: 0 auto;
  padding: 0 0.5em;
  width: min(100%, 550px);
`;

const DynamicMargin = styled.div`
  margin-top: 1.4rem;
  @media only screen and (min-height: 700px) {
    margin-top: 4vh;
  }
`;

export default Home;
