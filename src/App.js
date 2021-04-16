import React from "react";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./pages/Home";
import SearchBar from "./components/SearchBar";
import LoadingScreen from "./components/LoadingScreen";
import Alerts from "./components/Alerts";

function App() {
  return (
    <div>
      <GlobalStyles />
      <Alerts />
      <SearchBar />
      <LoadingScreen />
      <Home />
    </div>
  );
}

export default App;
