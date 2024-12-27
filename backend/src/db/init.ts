import { pool } from './index.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initDatabase() {
  try {
    // Read the schema file
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = await readFile(schemaPath, 'utf-8');
    
    // Connect to database
    const client = await pool.connect();
    
    try {
      // Execute schema
      await client.query(schema);
      console.log('Database schema created successfully');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    await pool.end();
  }
}

// Run if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  initDatabase().catch(console.error);
} 