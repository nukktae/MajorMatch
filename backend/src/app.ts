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
import { sessionRoutes } from './routes/sessionRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// CORS configuration with updated headers
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
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

// Mount routes
app.use('/api', emailRouter);
app.use('/api/users', userRoutes);
app.use('/api/profile', authMiddleware, profileRoutes);
app.use('/api/sessions', authMiddleware, sessionRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app; 