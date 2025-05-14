import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path'; // Import 'path' for directory resolution
import FileRouter from './routes/file.router.js';
import UserRouter from './routes/User.router.js';
import DownloadRouter from './routes/File.Download.router.js';
import ErrorHandler from './utils/ErrorHandler.js';
import DRouter from './routes/FileDisplay.router.js';
import { corsMiddleware } from "./middlewares/CorsMiddleware.js";
import FileController from './controllers/file.controller.js';
import FileUploadRouter from './routes/FileUpload.router.js';

const app = express();

// Core Middlewares
app.use([
  cors({
    origin: [`http://localhost:${process.env.PORT || 4000}`],
    credentials: true
  }),
  express.json({ limit: "20kb" }),
  express.urlencoded({ extended: true, limit: "20kb" }),
  express.static("public"),
  cookieParser(),
  // corsMiddleware 
]);

// Set up view engine and views folder
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views')); // Ensure this matches your directory structure
app.use(express.static(path.join(process.cwd(), 'src', 'public'))); // Serve static files

// Route-Level Middlewares
app.use('/file', FileRouter);
app.use('/user', UserRouter);
app.use('/download', DownloadRouter);
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});
app.use('/api', DRouter);
app.use('/uploads', FileUploadRouter); // Fixed incorrect route registration
app.use('/file-controller', FileController); // Ensure unique path for FileController
app.use(corsMiddleware);

// Error Handling (MUST remain last)
app.use(ErrorHandler);

export default app;
