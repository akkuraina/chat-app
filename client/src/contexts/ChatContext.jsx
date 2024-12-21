import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider value={{ chatId, setChatId, messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
