import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  --color-primary: #2292d1;
  --color-darker: #1a71a3;
  --color-accent: #ff7676;
}
  *, html{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    /* max-width: 800px; */
    /* margin: 0 auto; */
  font-family: 'Montserrat', sans-serif;
  }

`;
export default GlobalStyles;

// font-family: 'Gochi Hand', cursive;
// font-family: 'Poppins', sans-serif;
