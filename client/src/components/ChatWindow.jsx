import React, { useEffect, useState } from 'react';
import Message from './Message';
import { io } from 'socket.io';

const socket = io('http://localhost:5000'); // Adjust your server URL if necessary

const ChatWindow = ({ chatId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch existing messages from the server (you'll implement this API endpoint later)
        // FetchMessages(chatId);

        socket.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.off('receive_message');
    }, [chatId]);

    return (
        <div className="chat-container">
            {messages.map((message) => (
                <Message key={message._id} message={message} />
            ))}
        </div>
    );
};

export default ChatWindow;
