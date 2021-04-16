import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// Components
import {
  CurrentWeather,
  HourlyTemps,
  DailyForecast,
  ScrollingHeader,
  DayDetails,
} from "../components";

const Home = () => {
  const { location, daily, loading } = useSelector(
    (state) => state
  );

  // Forecast Details State
  const [currentDay, setCurrentDay] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  // used to toggle Forecast Details render
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setCurrentData(daily.find((day) => day.dt === currentDay));
  }, [currentDay, daily]);// really triggered by currentDay

  useEffect(() => {
    setShowDetails(false);
    // hide details on location change
  }, [location]); 

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  let home = "";

  if (!loading) {
    home = (
      <Page>
        <CurrentWeather />
        <DynamicMargin />
        <HourlyTemps />
        <DynamicMargin />

        {!showDetails && (
          <DailyForecast
            toggleDetails={toggleDetails}
            setCurrentDay={setCurrentDay}
          />
        )}

        {showDetails && currentData && (
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
// maybe change Page to justify-content: space-around??
const DynamicMargin = styled.div`
  margin-top: 4vh;
`;

export default Home;
