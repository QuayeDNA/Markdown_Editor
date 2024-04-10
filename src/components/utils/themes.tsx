import { createGlobalStyle } from 'styled-components';

interface Theme {
  body: string;
  text: string;
  // Add other theme colors here
}

const lightTheme: Theme = {
  body: '#FFF',
  text: '#000',
  // Add other light theme colors here
};

const darkTheme: Theme = {
  body: '#000',
  text: '#FFF',
  // Add other dark theme colors here
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: background-color 0.5s ease, color 0.5s ease;
  }
`;

export { lightTheme, darkTheme, GlobalStyle };