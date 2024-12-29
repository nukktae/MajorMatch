import { pool } from '../db/index.js';
export const userController = {
    async createUser(req, res) {
        const { id, email, name: display_name, photoURL: photo_url } = req.body;
        try {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                // Insert or update user
                const userResult = await client.query(`INSERT INTO users (id, email, display_name, photo_url)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (id) DO UPDATE
           SET email = EXCLUDED.email,
               display_name = EXCLUDED.display_name,
               photo_url = EXCLUDED.photo_url
           RETURNING *`, [id, email, display_name, photo_url]);
                // Create profile if it doesn't exist
                await client.query(`INSERT INTO user_profiles (user_id)
           VALUES ($1)
           ON CONFLICT (user_id) DO NOTHING`, [id]);
                await client.query('COMMIT');
                res.json(userResult.rows[0]);
            }
            catch (err) {
                await client.query('ROLLBACK');
                throw err;
            }
            finally {
                client.release();
            }
        }
        catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },
    async getUser(req, res) {
        const { id } = req.params;
        try {
            const result = await pool.query(`SELECT u.*, up.* 
         FROM users u 
         LEFT JOIN user_profiles up ON u.id = up.user_id 
         WHERE u.id = $1`, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(result.rows[0]);
        }
        catch (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }
};
