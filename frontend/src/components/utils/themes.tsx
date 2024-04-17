import { createGlobalStyle } from 'styled-components';

interface Theme {
  body: string;
  text: string;
  headerBg: string; 
  headerText: string;
}

const lightTheme: Theme = {
  body: '#FFF',
  text: '#000',
  headerBg: '#F5F5F5', // Light mode header background color
  headerText: '#7C8187', // Light mode header text color
  // Add other light theme colors here
};

const darkTheme: Theme = {
  body: '#151619',
  text: '#FFF',
  headerBg: '#1D1F22', // Dark mode header background color
  headerText: '#C1C4CB', // Dark mode header text color
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: background-color 0.5s ease, color 0.5s ease;
  }
`;

export { lightTheme, darkTheme, GlobalStyle };