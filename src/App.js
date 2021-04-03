import React from "react";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import styled from "styled-components";

function App() {

  return (
    <Main>
      <GlobalStyles />
      <Nav />
      <Home />
    </Main>
  );
}

const Main = styled.div`
  position: relative;
`;

export default App;