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
  const { location, current, daily, hourly, loading } = useSelector(
    (state) => state
  );
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

  let home = "";

  if (!loading) {
    home = (
      <Page>

        <CurrentWeather location={location} current={current} />
        <DynamicMargin />
        <HourlyTemps timezone={location.timezone} hourly={hourly} />
        <DynamicMargin />

        {!showDetails &&(
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

        {showDetails && (
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
  }
  return home;
};

const Page = styled.div`
  min-height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 1.7rem 0.5rem 1rem 0.5rem;
  width: min(100%, 550px);
`;
// drop the dynamic margins??
const DynamicMargin = styled.div`
  margin-top: 4vh;
`;

export default Home;
