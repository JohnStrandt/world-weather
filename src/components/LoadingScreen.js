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
  let screen = null;

  if (loading) {
    screen = (
      <Loading>
        <h2>Weather Vane</h2>

        <PuffLoader color={"#fff"} loading={loading && !GPSError} size={50} />
        <img src={globe} alt="globe" />

        {!GPSError && <p>loading...</p>}

        {GPSError && (
          <div>
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
  height: 90vh;
  width: 100%;
  padding: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    font-weight: 100;
    font-size: 2rem;
    margin-bottom: 2.5em;
  }
  p {
    margin-bottom: 0.5em;
    line-height: 1.5em;
  }
  img {
    max-width: 40%;
    margin-bottom: 2rem;
  }
`;

export default LoadingScreen;
