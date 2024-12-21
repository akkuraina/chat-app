import React from 'react';

const Message = ({ message }) => {
    const { content, senderId, timestamp } = message;

    return (
        <div className={`message ${senderId === 'userId' ? 'sender' : 'receiver'}`}>
            <p>{content}</p>
            <span>{new Date(timestamp).toLocaleTimeString()}</span>
        </div>
    );
};

export default Message;
