import cors from 'cors';
const corsOptions = {
    origin: true, // Allow all origins temporarily for development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600
};
export const corsMiddleware = cors(corsOptions);
