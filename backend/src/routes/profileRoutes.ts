import { Router } from 'express';
import { profileController } from '../controllers/profileController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

// Profile routes
router.get('/', profileController.getProfile);
router.put('/update', profileController.updateProfile);
router.put('/assessment', profileController.updateAssessment);
router.delete('/assessment-results', profileController.deleteAssessmentResults);
router.get('/check-custom-id', profileController.checkCustomId);
router.post('/photo', profileController.updateProfilePhoto);
router.delete('/delete-user', profileController.deleteUser);

export { router as profileRoutes }; 