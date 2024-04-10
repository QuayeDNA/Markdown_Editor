import ShowPreviewIcon from "../assets/icon-show-preview.svg"
import { useTheme } from 'styled-components';

function Preview() {
    const theme = useTheme();
  
    return (
    <header className="w-full h-12 flex items-center justify-between p-4" style={{ backgroundColor: theme.headerBg, color: theme.headerText }}>
      <div>Preview</div>
      <img src={ShowPreviewIcon} alt="Show Preview" />
    </header>
  )
}

export default Preview