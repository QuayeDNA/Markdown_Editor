import { useTheme } from 'styled-components';

function Editor() {
    const theme = useTheme();
  
    return (
   <header className="w-full h-12 flex items-center p-4 border-r border-white" style={{ backgroundColor: theme.headerBg, color: theme.headerText }}>
    Markdown
   </header>
  )
}

export default Editor