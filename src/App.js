import React from "react";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import LoadingScreen from "./components/LoadingScreen";
import Alerts from "./components/Alerts";

function App() {

  return (
    <div>  
      <GlobalStyles />
      <Alerts />
      <Nav />
      <LoadingScreen />
      <Home />
    </div>
  );
}

export default App;
