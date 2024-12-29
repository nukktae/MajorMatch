import { Router, Response } from 'express';
import { admin } from '../config/firebase-admin';
import { AuthRequest } from '../types/auth';

const router = Router();

router.post('/set-role', async (req: AuthRequest, res: Response) => {
  try {
    const { role } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await admin.auth().setCustomUserClaims(userId, { role });
    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error setting role:', error);
    res.status(500).json({ error: 'Failed to update role' });
  }
});

export default router; 