import mongoose from 'mongoose';
import User from './user.models.js'

let FileSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  path: { type: String, required: true, trim: true },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  ownerby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  gridFSId: { // Add GridFS ID for storing file in MongoDB
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  }
}, { timestamps: true });

const File = mongoose.model('File', FileSchema);
export default File;