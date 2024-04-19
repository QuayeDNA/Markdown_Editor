import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import gfm from "remark-gfm"; // Import the plugin
import rehypeRaw from "rehype-raw";
import StyledMarkdown from "../utils/styledMarkdown";

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  const isPreviewExpanded = useSelector(
    (state: RootState) => state.preview.isPreviewExpanded
  );
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  
  return (
    <div
      className={`font-roboto-slab transition duration-300 flex-1 py-8 px-4 ${
        isPreviewExpanded ? "md:mx-[200px] mx-auto" : ""
      } ${isDarkMode ? "bg-dark-1 text-light-4" : "bg-light text-grey-3"}`}>
      <StyledMarkdown
      remarkPlugins={[gfm]}
      rehypePlugins={[rehypeRaw]}
      skipHtml={false}
      unwrapDisallowed={false}
      isDarkMode={isDarkMode}
    >
      {content}
    </StyledMarkdown>
    </div>
  );
};

export default Preview;
