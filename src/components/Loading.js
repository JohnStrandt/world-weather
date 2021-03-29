import React from "react";
import styled from "styled-components";
import globe from "../images/globe.png";

const Loading = () => {
  return (
    <LoadingScreen>
      <div className="center">
        <img src={globe} alt="globe" />
      </div>
    </LoadingScreen>
  );
};

const LoadingScreen = styled.div``;

export default Loading;
