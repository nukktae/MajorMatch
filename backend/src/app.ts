import express from 'express';
import cors from 'cors';
import { userController } from './controllers/userController';
import { profileController } from './controllers/profileController';
import { authMiddleware } from './middleware/auth';

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());

// User routes
app.post('/api/users', userController.createUser);
app.get('/api/users/:id', authMiddleware, userController.getUser);

// Profile routes
app.get('/api/profile/:id', authMiddleware, profileController.getProfile);
app.put('/api/profile/update', authMiddleware, profileController.updateProfile);
app.put('/api/profile/assessment', authMiddleware, profileController.updateAssessment);
app.delete('/api/profile/assessment-results', authMiddleware, profileController.deleteAssessmentResults);

export default app; 