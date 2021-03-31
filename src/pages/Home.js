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
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    setShowDetails(false);
  }, [location]);

  useEffect(() => {
    setCurrentData(daily.find((day) => day.dt === currentDay));
  }, [currentDay, daily]);

  return (
    <Page>
      <DynamicMargin />

      {location && current && (  
      <CurrentWeather location={location} current={current} />)}

      <DynamicMargin />

      {location && hourly && (
      <HourlyTemps timezone={location.timezone} hourly={hourly} />)}

      <DynamicMargin />

      {!showDetails && daily && location && (
        <div>
          {daily.map((day) => (
            <DaySummary
              key={day.dt}
              toggleDetails={toggler}
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
              toggleDetails={toggler}
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
