import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import LoadingScreen from "./components/LoadingScreen";


import { showLoader, getGPSWeather } from "./actions/weatherAction";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // get geolocation on startup for local weather
    dispatch(showLoader());
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

  return (
    <Main>
      <GlobalStyles />
      <Nav />
      <LoadingScreen />
      <Home />
    </Main>
  );
}

const Main = styled.div`
  position: relative;
`;

export default App;
