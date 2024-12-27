import { Router } from 'express';
import { profileController } from '../controllers/profileController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);
router.get('/:id', profileController.getProfile);
router.put('/update', profileController.updateProfile);
router.put('/assessment', profileController.updateAssessment);
router.delete('/assessment-results', profileController.deleteAssessmentResults);

export default router; 