import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { connectToDB } from './config/db.mjs';
import chatRoutes from './routes/chatRoutes.js';
import { authMiddleware } from './utils/authUtils.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectToDB();

// Socket.io setup
app.set('socketIo', io); // Exposing io instance to routes

// Routes
app.use('/api/chats', chatRoutes);

// Socket.IO Events
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
