import { pool } from '../config/db.js'; // PostgreSQL connection pool

// Create a new chat
export const createChat = async (chatName, participants) => {
    const client = await pool.connect();
    try {
        // Start a transaction
        await client.query('BEGIN');

        // Insert into chats table
        const chatResult = await client.query(
            'INSERT INTO chats (chat_name) VALUES ($1) RETURNING *',
            [chatName]
        );

        const chatId = chatResult.rows[0].id;

        // Insert participants into chat_participants table
        const participantPromises = participants.map((userId) =>
            client.query(
                'INSERT INTO chat_participants (chat_id, user_id) VALUES ($1, $2)',
                [chatId, userId]
            )
        );

        await Promise.all(participantPromises);

        // Commit transaction
        await client.query('COMMIT');

        return { id: chatId, chatName, participants };
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error creating chat:', err);
        throw err;
    } finally {
        client.release();
    }
};

// Get a chat by ID
export const getChatById = async (chatId) => {
    const query = `
        SELECT c.id, c.chat_name, c.created_at, 
               ARRAY_AGG(cp.user_id) AS participants
        FROM chats c
        LEFT JOIN chat_participants cp ON c.id = cp.chat_id
        WHERE c.id = $1
        GROUP BY c.id;
    `;
    const { rows } = await pool.query(query, [chatId]);
    return rows[0];
};
