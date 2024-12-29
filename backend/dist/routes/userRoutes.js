import { Router } from 'express';
import { userController } from '../controllers/userController.js';
const router = Router();
router.post('/', userController.createUser);
router.get('/', userController.getUser);
// Add other user routes here
export default router;
