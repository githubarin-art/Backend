import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve('uploads');

export const saveFileMetadata = (file) => {
  const metadata = {
    originalName: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    uploadDate: new Date(),
  };
  const metadataPath = path.join(uploadDir, `${file.filename}.json`);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
};

export const getFileMetadata = (filename) => {
  const metadataPath = path.join(uploadDir, `${filename}.json`);
  if (!fs.existsSync(metadataPath)) {
    throw new Error('Metadata not found');
  }
  return JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
};
