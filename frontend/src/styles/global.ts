import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  outline: 0;
}

html {
  /* A cada 1rem será considera 10px */
  font-size: 62.5%;
 }

body{
  background:#FFF;
  color: #1C1C1C;
  -webkit-font-smoothing: antialiased;
  font-size: 1.6rem;


}
border-style, :-ms-input-placeholder, button {
  font-family: 'Roboto', serif;
}
h1, h2, h3, h4, h5, h6, strong {
  font-weight: 500;

}
button {
  cursor: pointer;
}
`;
