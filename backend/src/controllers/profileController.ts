import { Request, Response } from 'express';
import { pool } from '../db/index.js';
import { AuthRequest } from '../middleware/auth.js';

export const profileController = {
  async getProfile(req: AuthRequest, res: Response) {
    const { id } = req.params;
    
    try {
      const result = await pool.query(
        `SELECT up.*, u.email, u.name, u.photo_url 
         FROM user_profiles up
         JOIN users u ON up.user_id = u.id
         WHERE up.user_id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching profile:', err);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  },

  async updateProfile(req: AuthRequest, res: Response) {
    const userId = req.user?.uid;
    const { major, interests } = req.body;

    try {
      const result = await pool.query(
        `UPDATE user_profiles 
         SET major = $1, interests = $2, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $3
         RETURNING *`,
        [major, interests, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.json(result.rows[0]);
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
  }
}; 