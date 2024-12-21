import React, { useState } from 'react';
import Navbar from './Navbar';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

const WindowDisplay = () => {
    const [chatId] = useState('sampleChatId'); // Replace with actual chat ID logic

    return (
        <div className="window-display">
            <Navbar />
            <ChatWindow chatId={chatId} />
            <MessageInput chatId={chatId} />
        </div>
    );
};

export default WindowDisplay;
