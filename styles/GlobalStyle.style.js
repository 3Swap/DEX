import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  /* @font-face {
   font-family: "Kinn";
   src:local('Kinn'), url("./assets/Kinn-Bold.otf") format("otf");
   src: local('Kinn'),url("./assets/fonts/Kinn-Bold.ttf") format("truetype");
   src: local('Kinn'),url("./assets/fonts/Kinn-Medium.otf") format("otf");
   src: local('Kinn'),url("./assets/fonts/Kinn-Medium.ttf") format("truetype");
   src: local('Kinn'),url("./assets/fonts/Kinn-Regular.otf") format("oft");
   src: local('Kinn'),url("./assets/fonts/Kinn-Regular.ttf") format("truetype");
}; */
  :root{
    --primary-bg:#4500A0;
    --text-bg:#121E49;
    --text-bg-p:#1F1F1F
  }
  body {
  margin: 0;
  font-family: 'Poppins','Kinn' sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a{
  text-decoration: none;
  font-family: 'Poppins',sans-serif;
}
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
`;
export const Column = styled.div`
  flex: ${props => (props.flex ? props.flex : '0.5')};
`;

export const Typography = styled.h1`
  font-size: ${props => (props.fontSize ? props.fontSize : '16px')};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '')};
  letter-spacing: ${props => (props.letterSpacing ? props.letterSpacing : '')};
  line-height: ${props => (props.lineHeight ? props.lineHeight : '')};
  font-style: ${props => (props.fontStyle ? props.fontStyle : 'normal')};
  color: ${props => (props.color ? props.color : '#121212')};
  margin: ${props => (props.margin ? props.margin : '')};
  font-family: ${props => (props.heading ? 'Kinn' : 'Poppins')}; ;
`;

export default GlobalStyle;
