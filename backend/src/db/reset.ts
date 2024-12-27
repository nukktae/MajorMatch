import { pool } from './index.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function resetDatabase() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Drop existing tables
    await client.query(`
      DROP TABLE IF EXISTS user_profiles CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    
    // Read and execute schema
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = await readFile(schemaPath, 'utf-8');
    await client.query(schema);
    
    await client.query('COMMIT');
    console.log('Database reset successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error resetting database:', err);
    throw err;
  } finally {
    client.release();
  }
}

resetDatabase().catch(console.error); 