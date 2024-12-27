import { Request, Response } from 'express';
import { pool } from '../db/index.js';
import { User, UserProfile } from '../types/user.js';

export const userController = {
  async createUser(req: Request, res: Response) {
    const { id, email, name, photoURL } = req.body;

    try {
      const client = await pool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Insert into users table
        const userResult = await client.query(
          'INSERT INTO users (id, email, name, photo_url) VALUES ($1, $2, $3, $4) RETURNING *',
          [id, email, name, photoURL]
        );

        // Create user profile
        await client.query(
          'INSERT INTO user_profiles (user_id) VALUES ($1)',
          [id]
        );

        await client.query('COMMIT');
        res.status(201).json(userResult.rows[0]);
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  async getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await pool.query(
        `SELECT u.*, up.* 
         FROM users u 
         LEFT JOIN user_profiles up ON u.id = up.user_id 
         WHERE u.id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }
}; 