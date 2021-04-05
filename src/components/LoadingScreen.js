import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import globe from "../images/globe.png";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingScreen = ({ GPSError }) => {
  const loading = useSelector((state) => state.loading);
  let screen = null;

  if (loading) {
    screen = (
      <Loading>
        <h2>Weather App</h2>

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
  height: 80vh;
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
