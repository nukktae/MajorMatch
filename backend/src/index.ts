import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRouter from './routes/email.js';
import { startServer } from './server.js';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', emailRouter);

// Start server with existing configuration
startServer(PORT).catch((err: Error) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default app; 