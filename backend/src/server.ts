import app from './app.js';
import { verifyConnection } from './db/index.js';

export const startServer = async (port: number) => {
  try {
    // Verify database connection
    await verifyConnection();
    
    // Start the Express server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    throw error;
  }
}; 