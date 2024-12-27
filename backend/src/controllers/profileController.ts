import { Request, Response } from 'express';
import { pool } from '../db/index.js';
import { AuthRequest } from '../middleware/auth.js';

export const profileController = {
  async getProfile(req: AuthRequest, res: Response) {
    const userId = req.user?.uid;
    
    try {
      const client = await pool.connect();
      
      try {
        // Get complete profile data with user information
        const result = await client.query(
          `SELECT 
            u.id,
            u.email,
            u.display_name,
            u.photo_url,
            u.custom_user_id,
            u.nickname,
            up.major,
            up.interests,
            up.completed_assessments,
            up.assessment_results
           FROM users u
           LEFT JOIN user_profiles up ON u.id = up.user_id
           WHERE u.id = $1`,
          [userId]
        );

        if (result.rows.length === 0) {
          // If user doesn't exist, create profile
          await client.query('BEGIN');
          
          // Insert user if not exists
          await client.query(
            `INSERT INTO users (id, email)
             VALUES ($1, $2)
             ON CONFLICT (id) DO NOTHING`,
            [userId, req.user?.email]
          );

          // Insert profile if not exists
          await client.query(
            `INSERT INTO user_profiles (user_id)
             VALUES ($1)
             ON CONFLICT (user_id) DO NOTHING`,
            [userId]
          );

          // Get the newly created profile
          const newResult = await client.query(
            `SELECT 
              u.id,
              u.email,
              u.display_name,
              u.photo_url,
              u.custom_user_id,
              u.nickname,
              up.major,
              up.interests,
              up.completed_assessments,
              up.assessment_results
             FROM users u
             LEFT JOIN user_profiles up ON u.id = up.user_id
             WHERE u.id = $1`,
            [userId]
          );

          await client.query('COMMIT');
          return res.json(newResult.rows[0]);
        }

        res.json(result.rows[0]);
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  },

  async updateProfile(req: AuthRequest, res: Response) {
    const userId = req.user?.uid;
    const { major, interests, custom_user_id, nickname } = req.body;

    try {
      const client = await pool.connect();
      
      try {
        await client.query('BEGIN');

        // Update users table
        await client.query(
          `UPDATE users 
           SET custom_user_id = $1, 
               nickname = $2, 
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $3`,
          [custom_user_id || null, nickname || null, userId]
        );

        // Update user_profiles table
        await client.query(
          `UPDATE user_profiles 
           SET major = $1, 
               interests = $2, 
               updated_at = CURRENT_TIMESTAMP
           WHERE user_id = $3`,
          [major || null, interests || [], userId]
        );

        // Get updated profile data
        const result = await client.query(
          `SELECT 
            u.id,
            u.email,
            u.display_name,
            u.photo_url,
            u.custom_user_id,
            u.nickname,
            up.major,
            up.interests,
            up.completed_assessments,
            up.assessment_results
           FROM users u
           JOIN user_profiles up ON u.id = up.user_id
           WHERE u.id = $1`,
          [userId]
        );

        await client.query('COMMIT');
        res.json(result.rows[0]);
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  },

  async updateAssessment(req: AuthRequest, res: Response) {
    const userId = req.user?.uid;
    const { results } = req.body;

    try {
      const result = await pool.query(
        `UPDATE user_profiles 
         SET assessment_results = $1, 
             completed_assessments = completed_assessments + 1,
             updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $2
         RETURNING *`,
        [results, userId]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating assessment:', err);
      res.status(500).json({ error: 'Failed to update assessment' });
    }
  },

  async deleteAssessmentResults(req: AuthRequest, res: Response) {
    const userId = req.user?.uid;
    const { dates } = req.body;

    try {
      const result = await pool.query(
        `UPDATE user_profiles 
         SET assessment_results = (
           SELECT jsonb_agg(result)
           FROM jsonb_array_elements(assessment_results) result
           WHERE result->>'date' != ANY($1)
         ),
         completed_assessments = completed_assessments - $2,
         updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $3
         RETURNING *`,
        [dates, dates.length, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error deleting assessment results:', err);
      throw err;
    }
  },

  async updateCustomId(req: AuthRequest, res: Response) {
    const userId = req.user?.uid;
    const { custom_user_id } = req.body;

    try {
      // Check if custom_user_id is already taken
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE custom_user_id = $1 AND id != $2',
        [custom_user_id, userId]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'This user ID is already taken' });
      }

      // Update user
      const result = await pool.query(
        `UPDATE users 
         SET custom_user_id = $1, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [custom_user_id, userId]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating custom user ID:', err);
      res.status(500).json({ 
        error: 'Failed to update user ID',
        details: process.env.NODE_ENV === 'development' 
          ? (err instanceof Error ? err.message : String(err))
          : undefined
      });
    }
  },

  async updateNickname(req: AuthRequest, res: Response) {
    const userId = req.user?.uid;
    const { nickname } = req.body;

    try {
      const result = await pool.query(
        `UPDATE users 
         SET nickname = $1, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [nickname, userId]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating nickname:', err);
      res.status(500).json({ 
        error: 'Failed to update nickname',
        details: process.env.NODE_ENV === 'development' 
          ? (err instanceof Error ? err.message : String(err))
          : undefined
      });
    }
  }
}; 