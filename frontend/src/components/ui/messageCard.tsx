import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearMessages } from '../../redux/messageSlice';

const MessageCard: React.FC = () => {
  const dispatch = useDispatch();
  const showMessage = useSelector((state: RootState) => state.messages.messages.length > 0);
  const messages = useSelector((state: RootState) => state.messages.messages);
  const messageType = useSelector((state: RootState) => state.document.type);
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

  // Function to determine background color based on message type
  const getMessageBackgroundColor = () => {
    switch (messageType) {
      case 'delete':
        return isDarkMode ? 'bg-red-800' : 'bg-red-500';
      case 'save':
        return isDarkMode ? 'bg-green-800' : 'bg-green-500';
      case 'create':
        return isDarkMode ? 'bg-yellow-800' : 'bg-yellow-500';
      default:
        return isDarkMode ? 'bg-dark-1' : 'bg-light';
    }
  };

 return (
  <div className={`fixed bottom-4 right-4 z-50 rounded-lg transition-all duration-500 ease-in-out transform ${showMessage ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} ${getMessageBackgroundColor()} text-white border border-white`}>
    <div className="rounded-lg shadow-md p-4">
      {messages.map((message) => (
        <div key={message}>{message}</div>
      ))}
    </div>
  </div>
)
};

export default MessageCard;
