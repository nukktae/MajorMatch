import { pool } from './db/index.js';

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL');
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('Current time from DB:', result.rows[0]);
    
    client.release();
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    // Close the pool
    await pool.end();
  }
};

testConnection(); 