import pkg from 'pg';
const { Client } = pkg;
import { createUsersTable } from './migrations/001_create_users_table.js';
import { createSessionsTable } from './migrations/002_create_sessions_table.js';
import { createUserProfilesTable } from './migrations/003_create_user_profiles_table.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

async function resetDatabase() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB
  });

  try {
    await client.connect();
    console.log('Connected to database');
    
    // Drop existing tables
    await client.query(`
      DROP TABLE IF EXISTS sessions CASCADE;
      DROP TABLE IF EXISTS user_profiles CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);

    // Create tables in order
    await createUsersTable(client);
    await createUserProfilesTable(client);
    await createSessionsTable(client);

    console.log('Database reset successful');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await client.end();
  }
}

resetDatabase(); 