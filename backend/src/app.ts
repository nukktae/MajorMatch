import express from 'express';
import cors from 'cors';
import { userController } from './controllers/userController.js';
import profileRoutes from './routes/profileRoutes.js';
import emailRouter from './routes/email.js';
import { authMiddleware } from './middleware/auth.js';

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

// Mount routes
app.use('/api', emailRouter); // Add email routes
app.post('/api/users', userController.createUser);
app.get('/api/users/:id', authMiddleware, userController.getUser);

// Profile routes - mount the router
app.use('/api/profile', profileRoutes);

export default app; 