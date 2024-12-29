export async function modifyUsersId(client) {
    try {
        await client.query('BEGIN');
        // Drop existing foreign key constraints
        await client.query(`
      ALTER TABLE user_profiles 
      DROP CONSTRAINT IF EXISTS user_profiles_user_id_fkey;
    `);
        // Modify the id column in users table
        await client.query(`
      ALTER TABLE users 
      ALTER COLUMN id TYPE TEXT;
    `);
        // Modify the user_id column in user_profiles table
        await client.query(`
      ALTER TABLE user_profiles 
      ALTER COLUMN user_id TYPE TEXT;
    `);
        // Recreate the foreign key constraint
        await client.query(`
      ALTER TABLE user_profiles
      ADD CONSTRAINT user_profiles_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE;
    `);
        await client.query('COMMIT');
        console.log('Successfully modified users table id to TEXT type');
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Error modifying users table:', error);
        throw error;
    }
}
