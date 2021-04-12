import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGPSWeather } from "../actions/weatherAction";
import styled from "styled-components";
import globe from "../images/globe.png";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingScreen = () => {
  const [GPSError, setGPSError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // get geolocation on startup to find local weather
    const success = (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      dispatch(getGPSWeather(lat, lon));
    };
    const fail = (error) => {
      console.error(error);
      setGPSError(true);
    };
    navigator.geolocation.getCurrentPosition(success, fail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = useSelector((state) => state.loading);

  let screen = "";

  if (loading) {
    screen = (
      <Loading>
        <h2>Weather Vane</h2>

        <div className="globe">
          <img src={globe} alt="globe" />
          <div className="spinner">
            <PuffLoader
              color={"white"}
              loading={loading && !GPSError}
              size={100}
            />
          </div>
        </div>

        {!GPSError && <p className="loading-text">loading...</p>}

        {GPSError && (
          <div className="error-text">
            <p style={{ color: "var(--color-accent)" }}>GPS Error</p>
            <p>
              If location permissions are not enabled for this site on your
              browser, you will need to enter your location manually.
            </p>
          </div>
        )}
      </Loading>
    );
  }
  return screen;
};

const Loading = styled.div`
  height: 89vh;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2em;
  .globe {
    margin: 5rem auto 2rem auto;
    position: relative;
    width: 50%;
    max-width: 300px;
  }
  .globe img {
    width: 100%;
  }
  .spinner {
    position: absolute;
    top: -10%;
    left: 15%;
    display: flex;
    justify-content: center;
  }
  .loading-text {
    text-align: center;
  }
  .error-text {
    margin-top: 10vh;
  }
  h2 {
    text-align: center;
    font-weight: 100;
    font-size: 2rem;
    margin-top: 1em;
  }
  p {
    margin-bottom: 0.5em;
    line-height: 1.5em;
  }
`;

export default LoadingScreen;
