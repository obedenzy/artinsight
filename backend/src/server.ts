import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import artworkRoutes from './routes/artworkRoutes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json({ limit: '50mb' })); // Increase payload size limit for base64 images
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Art Analysis Backend is running!');
});

app.use('/api/artworks', artworkRoutes);

// Basic Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
