import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
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
  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  color: white;
}

`;
export default GlobalStyles;
