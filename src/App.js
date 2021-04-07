import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import LoadingScreen from "./components/LoadingScreen";
import Alerts from "./components/Alerts";

import { getGPSWeather } from "./actions/weatherAction";

function App() {
  const [GPSError, setGPSError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // get geolocation on startup to find local weather
    // dispatch(showLoader());
    dispatch({ type: "SHOW_LOADER" });
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

  return (
    <div>
      <GlobalStyles />
      <Alerts />
      <Nav />
      <LoadingScreen GPSError={GPSError} />
      <Home />
    </div>
  );
}

export default App;
