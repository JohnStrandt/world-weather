import React from "react";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";

import Home from "./pages/Home";
import Nav from "./components/Nav";

import largeSky from "./images/large-sky.jpg";
import mobileSky from "./images/mobile-sky.jpg";

function App() {
  return (
    <Background>
      <GlobalStyles />
      <Top>
        <Nav />
      </Top>
      <Main>
        <Home />
      </Main>
    </Background>
  );
}

const Background = styled.div`
  background-image: url(${largeSky});
  height: 100%;
  min-height: 100vh;
  background-size: cover;
  @media only screen and (max-width: 600px) {
    background-image: url(${mobileSky});
  }
`;

const Top = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Main = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default App;
