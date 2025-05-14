import cors from 'cors';

export const corsMiddleware = cors({
  origin: '*', // Allow all origins (use specific domains in production for security)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies and credentials to be sent
});
