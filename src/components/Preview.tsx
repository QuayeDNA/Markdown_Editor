import React from 'react';
import ShowPreviewIcon from "../assets/icon-show-preview.svg";
import { useTheme } from 'styled-components';

import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'; 

import StyledMarkdown from './ui/StyledMarkdown';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  const theme = useTheme();
  
  return (
    <div className='h-full'>
      <header className="w-full h-12 flex items-center justify-between p-4 sticky top-0" style={{ backgroundColor: theme.headerBg, color: theme.headerText }}>
        <div>Preview</div>
        <img src={ShowPreviewIcon} alt="Show Preview" />
      </header>
      <div className="w-full h-full p-4 overflow-auto border border-gray-300 pt-16">
      <StyledMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        skipHtml={false}
        unwrapDisallowed={false}
      >
        {content}
      </StyledMarkdown>
      </div>
    </div>
  );
};

export default Preview;