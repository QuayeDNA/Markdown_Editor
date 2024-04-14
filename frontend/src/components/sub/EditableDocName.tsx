import { useState } from 'react';

const EditableDocName = ({ initialName }: { initialName: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [docName, setDocName] = useState(initialName);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleTouch = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  return (
    isEditing ? (
     <input
  type="text"
  value={docName}
  onBlur={handleBlur}
  onChange={handleChange}
  onKeyDown={handleKeyDown}
  autoFocus
  className='w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-white pb-1'
  style={{ caretColor: 'orange' }}
/>
    ) : (
      <span
        role="button"
        tabIndex={0}
        onDoubleClick={handleDoubleClick}
        onClick={handleClick}
        onTouchStart={handleTouch}
      >
        {docName}
      </span>
    )
  );
};

export default EditableDocName;
