import express from 'express';
import userRoutes from './userRoutes';
import { profileRoutes } from './profileRoutes';
import { authMiddleware } from '../middleware/auth';
const router = express.Router();
router.use('/users', userRoutes);
router.use('/profile', authMiddleware, profileRoutes);
export default router;
