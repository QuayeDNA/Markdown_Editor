import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

interface StyledMarkdownProps {
  isDarkMode: boolean;
}

const StyledMarkdown = styled(ReactMarkdown)<StyledMarkdownProps>`
  & code,
  & pre,
  & blockquote {
    background-color: ${props => props.isDarkMode ? '#2b2d31ff' : '#f5f5f5'};
    transition: background-color 0.3s;
  }

  * {
    margin-bottom: 2.0em;
  }

  & h1 {
    font-size: 32px;
    font-weight: bold;
  }

  & h2 {
    font-size: 28px;
    font-weight: light;
  }

  & h3 {
    font-size: 24px;
    font-weight: bold;
  }

  & h4 {
    font-size: 20px;
    font-weight: bold;
  }

  & h5 {
    font-size: 16px;
    font-weight: bold;
  }

  & h6 {
    font-size: 14px;
    font-weight: bold;
    color: #E46643;
  }

  & p {
    font-size: 1em;
    line-height: 1.5;
    margin: 0.5em auto;
  }

  & code {
    font-size: 1em;
    padding: 0.1em 0.4em;
    border-radius: 6px;
    margin-bottom: 0.5em;
    background-color: ${props => props.isDarkMode ? '#373c3e' : '#f0f0f0'};
    color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
    box-sizing: border-box;
  }
  

  & pre {
    font-size: 0.9em;
    padding: 0.5em;
    border-radius: 3px;
    background-color: ${props => props.isDarkMode ? '#373c3e' : '#f0f0f0'}; /* Updated background color */
    color: ${props => props.isDarkMode ? '#ffffff' : '#000000'}; /* Updated text color */
  }

  & blockquote {
    font-size: 1.0em;
    font-weight: bold;
    padding: 0.5em;
    border-radius: 5px;
    border-left: 4px solid #E46643;
    margin-left: 0;
  }

  & ul {
    list-style-type: none;
    margin-left: 1em;
  }

  & ul li::before {
    content: '•'; /* Bullet character */
    color: #E46643;
    font-size: 1.2em;
    margin-right: 0.5em;
  }

  & ol {
    list-style-type: decimal;
    margin-left: 1em;
  }

  & li {
    margin-bottom: 0.5em;
  }

  & img {
    max-width: 100%;
    height: auto;
    margin-bottom: 0.5em;
  }

  & hr {
    border: none;
    border-top: 2px solid ${props => props.isDarkMode ? '#ffffff' : '#000000'};
    margin: 1em 0;
  }

  & a {
    text-decoration: underline;
  }

  & a:hover {
    text-decoration: underline;
  }

  & sup {
    font-size: 0.8em;
    vertical-align: super;
  }

  & sub {
    font-size: 0.8em;
    vertical-align: sub;
  }

  & strong {
    font-weight: bold;
  }

  & em {
    font-style: italic;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th, td {
    border: 1px solid ${props => props.isDarkMode ? '#E4E4E4' : '#7C8187'};
    padding: 8px;
  }
  
  

  /* Add some space between paragraphs */
  p + p {
    margin-top: 2em;
  }

  /* Add some space between list items */
  li + li {
    margin-top: 0.5em;
  }

  /* Add some space between headings and the content below them */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 20px 0 10px 0;
  }
`;

export default StyledMarkdown;
