import React, { useState } from 'react';
import { io } from 'socket.io';

const socket = io('http://localhost:5000'); // Adjust your server URL if necessary

const MessageInput = ({ chatId }) => {
    const [messageContent, setMessageContent] = useState('');

    const handleSendMessage = () => {
        if (messageContent.trim()) {
            const message = {
                chatId,
                content: messageContent,
                senderId: 'userId', // Replace with actual sender ID logic
            };

            socket.emit('send_message', message);
            setMessageContent('');
        }
    };

    return (
        <div className="message-input">
            <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default MessageInput;
