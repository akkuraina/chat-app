import pkg from 'pg'; // Import the PostgreSQL library
const { Pool } = pkg;

// Create a connection pool
export const pool = new Pool({
    user: 'your-username',
    host: 'localhost',
    database: 'chatapp',
    password: 'your-password',
    port: 5432,
});

// Handle successful connection
pool.on('connect', () => {
    console.log("Database connected successfully");
});

// Handle errors with the connection pool
pool.on('error', (err) => {
    console.error("Unexpected database error", err.stack);
});
