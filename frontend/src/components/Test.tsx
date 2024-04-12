import ShowPreviewIcon from "../assets/icon-show-preview.svg";
import { useTheme } from 'styled-components';
interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  // Function to sanitize HTML content
  const sanitizeHtml = (html: string) => {
    // Remove any <script> tags
    return html.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
  };

  // Function to convert Markdown to HTML
  const markdownToHtml = (markdown: string) => {
    if (!markdown) return "";

    // Sanitize HTML
    markdown = sanitizeHtml(markdown);

    // Replace Markdown headings (up to h6)
    markdown = markdown.replace(
      /^(#{1,6})\s*(.*?)$/gm,
      (_, level, text) => `<h${level.length}>${text}</h${level.length}>`
    );

    // Replace Markdown bold (**text**)
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Replace Markdown italic (*text*)
    markdown = markdown.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Replace Markdown code (`code`)
    markdown = markdown.replace(/`(.*?)`/g, "<code>$1</code>");

    // Replace Markdown links ([text](url))
    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Replace Markdown inline code (`code`)
    markdown = markdown.replace(/`(.*?)`/g, "<code>$1</code>");

    // Replace Markdown line breaks
    markdown = markdown.replace(/\n/g, "<br>");

    // Replace Markdown unordered lists
    markdown = markdown.replace(/^\s*-\s(.+)$/gm, "<li>$1</li>\n");
    markdown = markdown.replace(/(<li>.+<\/li>)(?!\n<\/ul>)/gs, "<ul>$1</ul>");

    // Replace Markdown ordered lists
    markdown = markdown.replace(/^\s*\d+\.\s(.+)$/gm, "<li>$1</li>\n");
    markdown = markdown.replace(/(<li>.+<\/li>)(?!\n<\/ol>)/gs, "<ol>$1</ol>");

    // Replace Markdown code blocks
    markdown = markdown.replace(
      /```(?:\w+)?\n([\s\S]+?)\n```/g,
      "<pre><code>$1</code></pre>"
    );

    // Replace Markdown blockquotes
    markdown = markdown.replace(/^(>.+)$/gm, "<blockquote>$1</blockquote>");

    // Replace Markdown horizontal rules
    markdown = markdown.replace(/^---$/gm, "<hr>");

    // Replace Markdown images
    markdown = markdown.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img src="$2" alt="$1">'
    );

    // Replace Markdown task lists
    markdown = markdown.replace(
      /^- \[(x| )\](.*)$/gm,
      '<li><input type="checkbox" $1 />$2</li>'
    );
    markdown = markdown.replace(/(<li>.+<\/li>)(?!\n<\/ul>)/gs, "<ul>$1</ul>");

    // Replace Markdown footnotes
    markdown = markdown.replace(
      /\[\^(.*?)\]:\s*(.*?)$/gm,
      '<sup><a href="#fn:$1">$1</a></sup>'
    );

    return markdown;
  };

  const theme = useTheme();
  
  return (
    <div>
    <header className="w-full h-12 flex items-center justify-between p-4" style={{ backgroundColor: theme.headerBg, color: theme.headerText }}>
      <div>Preview</div>
      <img src={ShowPreviewIcon} alt="Show Preview" />
    </header>
    <div className="w-full h-full p-4 overflow-auto border border-gray-300"  dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
    </div>
  );
};

export default Preview;
