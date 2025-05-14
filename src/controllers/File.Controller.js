import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import {MongoClient, GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import path from 'path';
import File from '../models/file.models.js';

const router2 = Router();

// MongoDB GridFS setup
const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [''];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } 
  }
});

// Route to upload files to GridFS
router2.post('/upload-to-db', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }

  const { originalname, path: filePath } = req.file;

  // Upload file to GridFS
  const uploadStream = gfs.openUploadStream(originalname);
  fs.createReadStream(filePath).pipe(uploadStream);

  uploadStream.on('finish', (file) => {
    res.status(200).json({
      success: true,
      message: "File uploaded to database successfully",
      file: {
        id: file._id,
        name: file.filename,
        size: file.length,
        uploadDate: file.uploadDate
      }
    });
  });

  uploadStream.on('error', (err) => {
    res.status(500).json({
      success: false,
      message: "File upload failed",
      error: err.message
    });
  });
});

export default router2;

