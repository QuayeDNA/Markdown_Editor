import React from 'react';
import Header from './sub/headerComponent';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'; 
import { useSelector } from 'react-redux';
import StyledMarkdown from './ui/StyledMarkdown';

interface PreviewProps {
  onPreviewIconClick: () => void;
}

const Preview: React.FC<PreviewProps> = ({ onPreviewIconClick }) => {
  
  const content = useSelector((state: { documents: { currentDocument: { content: string } } }) => state.documents.currentDocument.content);

  return (
    <div className='border-l-2 border-gray-400 flex flex-col h-full'>
     <Header headerName="Preview" onPreviewIconClick={onPreviewIconClick} calledFrom='Preview'/>
      <div className="w-full h-full p-4 overflow-auto pt-4">
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