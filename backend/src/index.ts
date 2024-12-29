import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes';
import { profileRoutes } from './routes/profileRoutes';
import { authMiddleware } from './middleware/auth';
import fs from 'fs';
import path from 'path';


// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Static files for profile photos
const uploadsDir = './uploads/profile-photos';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/profile', profileRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
