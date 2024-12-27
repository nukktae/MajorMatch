import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Apply CORS middleware before routes
app.use(corsMiddleware);
app.use(express.json());

// Add GET route to profileRoutes
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 