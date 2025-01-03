import { Client } from 'pg';

export async function modifyUsersDisplayName(client: Client): Promise<void> {
  try {
    await client.query('BEGIN');

    // Set default value first
    await client.query(`
      ALTER TABLE users 
      ALTER COLUMN display_name SET DEFAULT 'Anonymous';
    `);

    // Update any null values to 'Anonymous'
    await client.query(`
      UPDATE users 
      SET display_name = 'Anonymous' 
      WHERE display_name IS NULL;
    `);

    // Then set not null constraint
    await client.query(`
      ALTER TABLE users 
      ALTER COLUMN display_name SET NOT NULL;
    `);

    await client.query('COMMIT');
    console.log('Successfully modified users table display_name column');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error modifying users table:', error);
    throw error;
  }
} 