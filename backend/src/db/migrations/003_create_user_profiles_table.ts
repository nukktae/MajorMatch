import { Client } from 'pg';

export async function createUserProfilesTable(client: Client): Promise<void> {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        major VARCHAR(255),
        interests TEXT[],
        completed_assessments INTEGER DEFAULT 0,
        assessment_results JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create trigger for updated_at
      DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
      CREATE TRIGGER update_user_profiles_updated_at
        BEFORE UPDATE ON user_profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log('User profiles table created successfully');
  } catch (error) {
    console.error('Error creating user profiles table:', error);
    throw error;
  }
} 