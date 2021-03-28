import React from "react";
import GlobalStyles from "./components/GlobalStyles";

import Home from "./pages/Home";
import Nav from "./components/Nav";


function App() {
  return (
    <div>
      <GlobalStyles />
      <Nav />
      <Home />
    </div>
  );
}


export default App;
