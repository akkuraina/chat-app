export const getMessages = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const query = 'SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC';
        const result = await pool.query(query, [chatId]);

        res.status(200).json({
            success: true,
            messages: result.rows,
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Send a new message to a chat
export const sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { senderId, content } = req.body;

        const query = `
            INSERT INTO messages (chat_id, sender_id, content, created_at)
            VALUES ($1, $2, $3, NOW())
            RETURNING *`;
        const values = [chatId, senderId, content];
        const result = await pool.query(query, values);

        const newMessage = result.rows[0];
        req.app.get('socketIo').emit('receive_message', newMessage);

        res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
