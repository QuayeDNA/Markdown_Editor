import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

interface StyledMarkdownProps {
    isDarkMode: boolean;
  }
  

  const StyledMarkdown = styled(ReactMarkdown)<StyledMarkdownProps>`
  & code, & pre, & blockquote {
    background-color: ${props => props.isDarkMode ? '#2b2d31ff' : '#f5f5f5'};
    transition: background-color 0.3s;
  };
  & h1 {
    font-size: 2em;
    font-weight: bold;
  }
  & h2 {
    font-size: 1.5em;
    font-weight: ;
  }
  & h3 {
    font-size: 1.25em;
    font-weight: bold;
  }
  & h4 {
    font-size: 1em;
    font-weight: bold;
  }
  & h5 {
    font-size: 0.8em;
    font-weight: bold;
  }
  & h6 {
    font-size: 0.65em;
    font-weight: bold;
  }
  & p {
    font-size: 1em;
    line-height: 1.5;
  }
  & code {
    font-size: 1em;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  & pre {
    font-size: 0.9em;
    padding: 0.5em;
    border-radius: 3px;
  }
  & blockquote {
    font-size: 1.2em;
    font-weight: bold;
    padding: 0.5em;
    border-radius: 3px;
    border-left: 4px solid #E46643;
    padding-left: 1em;
    margin-left: 0;
  }
  & ul {
    list-style-type: disc;
    margin-left: 1em;
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
    margin-bottom: 0.5em; /* Added margin for better spacing */
  }
  & hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 1em 0;
  }
  & table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 0.5em; /* Added margin for better spacing */
  }
  & th,
  & td {
    border: 1px solid #ccc;
    padding: 0.5em;
    text-align: left;
  }
  & th {
    font-weight: bold;
  }
  & td {
    vertical-align: top;
  }
  & a {
    color: #0070f3;
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
  /* Add some space between paragraphs */
  p + p {
    margin-top: 1em;
  }

  /* Add some space between list items */
  li + li {
    margin-top: 0.5em;
  }

  /* Add some space between headings and the content below them */
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1em;
  }
`;

export default StyledMarkdown;