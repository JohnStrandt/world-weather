import React, { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import globe from "../images/globe.png";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingScreen = () => {
  const [timerRunning, setRunning] = useState(true);
  const loading = useSelector((state) => state.loading);
  let screen = null;

  setTimeout(function () {
    setRunning(false);
  }, 8000);

  if (true) {
    screen = (
      <Loading>
        <h2>Weather App</h2>
        <PuffLoader
          color={"#fff"}
          loading={loading && timerRunning}
          // css={override}
          size={50}
        />
        <img src={globe} alt="globe" />
        <p>Using GPS to find your current location...</p>
        <p>
          If GPS is not enabled, you will need to search your locations
          manually.
        </p>
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
    margin-bottom: 2rem;
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
