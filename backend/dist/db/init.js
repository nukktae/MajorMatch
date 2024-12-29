import { pool, verifyConnection } from './index.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function initDatabase() {
    try {
        // Verify connection first
        await verifyConnection();
        const client = await pool.connect();
        try {
            // Drop existing triggers first
            await client.query(`
        DROP TRIGGER IF EXISTS update_users_updated_at ON users;
        DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
        DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
      `);
            // Read and execute schema
            const schemaPath = join(__dirname, 'schema.sql');
            const schema = await readFile(schemaPath, 'utf-8');
            await client.query(schema);
            console.log('Database schema created successfully');
        }
        finally {
            client.release();
        }
    }
    catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
}
// Run if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    initDatabase().catch(() => process.exit(1));
}
export { initDatabase };
