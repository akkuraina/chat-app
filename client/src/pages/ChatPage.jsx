import React from 'react';
import WindowDisplay from '../components/WindowDisplay';
import { useChat } from '../components/ChatWindow';

const ChatPage = () => {
  const { chatId } = useChat();

  if (!chatId) {
    return <div>Please select a chat to start messaging.</div>;
  }

  return (
    <div className="chat-page">
      <WindowDisplay />
    </div>
  );
};

export default ChatPage;
