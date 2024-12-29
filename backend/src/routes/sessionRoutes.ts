import { Router } from 'express';
import { sessionController } from '../controllers/sessionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.post('/sessions', sessionController.createSession);
router.put('/sessions/:id/status', sessionController.updateSessionStatus);
router.get('/sessions', sessionController.getSessions);

export { router as sessionRoutes }; 