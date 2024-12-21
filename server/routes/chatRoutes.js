import express from 'express';
import { getMessages, sendMessage } from '../controllers/chatControllers.js'; 
import { authMiddleware } from '../utils/authUtils.js';

const router = express.Router();

// Route to get all messages for a specific chat
router.get('/:chatId/messages', async (req, res) => {
    try {
        await getMessages(req, res);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get messages', details: err.message });
    }
});

// Route to send a new message (with authentication)
router.post('/:chatId/messages', authMiddleware, async (req, res) => {
    try {
        await sendMessage(req, res, req.app.get('socketIo'));
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message', details: err.message });
    }
});

export default router;
