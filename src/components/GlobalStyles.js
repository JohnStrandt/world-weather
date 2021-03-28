import { createGlobalStyle } from "styled-components";
import largeSky from "../images/large-sky.jpg";
import mobileSky from "../images/mobile-sky.jpg";
const GlobalStyles = createGlobalStyle`

:root {
  --color-hover: #0247a8;
  --color-accent: #ff7676;
  --color-sun: #F7EA21;
}
/* icon: "01d" sun */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  padding: 0;
}

body{
  /* iPone notch issue */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);

  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  color: white;

  background-image: url(${largeSky});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  @media only screen and (max-width: 600px) {
    background-image: url(${mobileSky});
  }
}

`;
export default GlobalStyles;
