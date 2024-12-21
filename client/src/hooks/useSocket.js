import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust your server URL if necessary

export const useSocket = () => {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true);
        });

        socket.on('disconnect', () => {
            setConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    const sendMessage = (message) => {
        socket.emit('send_message', message);
    };

    return { connected, sendMessage };
};
