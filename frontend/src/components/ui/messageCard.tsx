import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearMessages } from '../../redux/messageSlice';

const MessageCard: React.FC = () => {
  const dispatch = useDispatch();
  const showMessage = useSelector((state: RootState) => state.messages.messages.length > 0);
  const messages = useSelector((state: RootState) => state.messages.messages);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>; // Define variable to store timeout ID

    if (showMessage) {
      // Set timeout to clear messages after 5 seconds (adjust as needed)
      timeoutId = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    }

    // Clean up timeout on component unmount or when showMessage becomes false
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showMessage, dispatch]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 rounded-lg  ${isDarkMode ? 'bg-dark-1 text-light-4 border border-light' : 'bg-light text-grey-3 border border-grey-1'} ${showMessage ? 'block' : 'hidden'}`}>
      <div className="rounded-lg shadow-md p-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">{message}</div>
        ))}
      </div>
    </div>
  );
};

export default MessageCard;
