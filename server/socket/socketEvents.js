export const emitMessage = (io, messageData) => {
    // Broadcast the message to all connected clients
    io.emit('receive_message', messageData);
};
