import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import remarkGfm from "remark-gfm"; // Import the plugin
import rehypeRaw from "rehype-raw";
import StyledMarkdown from "../utils/styledMarkdown";

interface PreviewProps {

}

const Preview: React.FC<PreviewProps> = () => {
  const isPreviewExpanded = useSelector(
    (state: RootState) => state.preview.isPreviewExpanded
  );
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const selectedDocument = useSelector((state: RootState) => state.document.selectedDocument);

  useEffect(() => {
    // No need for any action here, just useEffect to trigger re-render
  }, [selectedDocument]);

  return (
    <div
      className={`font-roboto-slab transition duration-300 flex-1 py-8 px-4 ${
        isPreviewExpanded ? "md:w-2/4 mx-auto" : ""
      } ${isDarkMode ? "bg-dark-1 text-light-4" : "bg-light text-grey-3"}`}>
      <StyledMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      skipHtml={false}
      unwrapDisallowed={false}
      isDarkMode={isDarkMode}
    >
     {selectedDocument ? selectedDocument.content : ''}
    </StyledMarkdown>
    </div>
  );
};

export default Preview;
