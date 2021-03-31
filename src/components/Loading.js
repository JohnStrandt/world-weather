import React from "react";

import styled from "styled-components";
import globe from "../images/globe.png";

const Loading = () => {
  return (
    <LoadingScreen>
      <img src={globe} alt="globe" />
    </LoadingScreen>
  );
};

const LoadingScreen = styled.div`
  img {
    text-align: center;
  }
`;

export default Loading;
