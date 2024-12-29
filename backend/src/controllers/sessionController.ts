import { Response } from 'express';
import { pool } from '../db/index.js';
import { AuthRequest } from '../types/auth.js';

export const sessionController = {
  async createSession(req: AuthRequest, res: Response) {
    const studentId = req.user?.uid;
    const { mentorId, date, time, message } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO sessions 
         (mentor_id, student_id, date, time, message) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [mentorId, studentId, date, time, message]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({ error: 'Failed to create session' });
    }
  },

  async updateSessionStatus(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { status, meetingLink } = req.body;
    const userId = req.user?.uid;

    try {
      const result = await pool.query(
        `UPDATE sessions 
         SET status = $1, 
             meeting_link = $2,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $3 
         AND mentor_id = $4
         RETURNING *`,
        [status, meetingLink, id, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Session not found or unauthorized' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating session:', error);
      res.status(500).json({ error: 'Failed to update session' });
    }
  },

  async getSessions(req: AuthRequest, res: Response) {
    const userId = req.user?.uid;
    const { role } = req.query;

    try {
      let query = `
        SELECT s.*, 
               u1.display_name as mentor_name,
               u1.email as mentor_email,
               u2.display_name as student_name,
               u2.email as student_email
        FROM sessions s
        JOIN users u1 ON s.mentor_id = u1.id
        JOIN users u2 ON s.student_id = u2.id
        WHERE ${role === 'mentor' ? 's.mentor_id' : 's.student_id'} = $1
        ORDER BY s.date DESC, s.time DESC
      `;

      const result = await pool.query(query, [userId]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({ error: 'Failed to fetch sessions' });
    }
  }
}; 