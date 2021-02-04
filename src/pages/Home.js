import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
// Components
import CurrentWeather from "../components/CurrentWeather";
import DaySummary from "../components/DaySummary";
import DayDetails from "../components/DayDetails";
import ScrollingHeader from "../components/ScrollingHeader";

const Home = () => {
  const location = useSelector((state) => state.location);
  const current = useSelector((state) => state.current);
  const daily = useSelector((state) => state.daily);
  // const hourly = useSelector((state) => state.hourly);
  // console.log(hourly);

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
      {current ? (
        <Today>
          <CurrentWeather location={location} current={current} />
        </Today>
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
  height: 299px;
  background-color: var(--color-primary);
  color: white;

  TableRow:hover {
    cursor: pointer;
    background-color: var(--color-darker);
  }
`;

const Details = styled.div`
  width: 100%;
  /* height: 299px; */
  padding: 10px;
  background-color: var(--color-primary);
  color: white;
`;

export default Home;
