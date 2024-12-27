import { Router } from 'express';
import { profileController } from '../controllers/profileController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

// Update routes to not use ID parameter
router.get('/', profileController.getProfile);
router.put('/update', profileController.updateProfile);
router.put('/assessment', profileController.updateAssessment);
router.delete('/assessment-results', profileController.deleteAssessmentResults);

export default router; 