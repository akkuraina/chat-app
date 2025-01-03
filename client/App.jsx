import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext';
import ChatPage from './pages/ChatPage';
import './styles/index.css';

const App = () => {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
};

export default App;
