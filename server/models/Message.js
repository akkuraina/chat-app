import { pool } from '../config/db.mjs';

// Function to create a new message
export const createMessage = async (chatId, senderId, content) => {
    const query = `
        INSERT INTO messages (chat_id, sender_id, content, timestamp)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
    `;
    const values = [chatId, senderId, content];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating message:', error);
        throw error;
    }
};

// Function to get all messages for a specific chat
export const getMessagesByChatId = async (chatId) => {
    const query = `
        SELECT * FROM messages
        WHERE chat_id = $1
        ORDER BY timestamp ASC;
    `;
    const values = [chatId];

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};
