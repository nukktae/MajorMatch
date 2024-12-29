import express from 'express';
import cors from 'cors';
import { userController } from './controllers/userController.js';
import { profileRoutes } from './routes/profileRoutes.js';
import emailRouter from './routes/email.js';
import { authMiddleware } from './middleware/auth.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import fs from 'fs';

const app = express();

// CORS configuration with updated headers
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/profile-photos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files with absolute path
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// Mount other routes
app.use('/api', emailRouter);
app.post('/api/users', userController.createUser);
app.get('/api/users/:id', authMiddleware, userController.getUser);
app.use('/api/profile', profileRoutes);

export default app; 