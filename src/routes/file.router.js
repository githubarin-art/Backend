import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { saveFileMetadata } from '../utils/FileService.js';

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add a timestamp to the filename
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No files are uploaded' });
  }

  // Save file metadata
  saveFileMetadata(req.file);

  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    }
  });
});

export default router;