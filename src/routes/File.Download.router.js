import express from 'express';
import path from 'path';
import fs from 'fs';
import File from '../models/file.models.js';

const Router = express.Router();

Router.get('/download/:id', async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) {
    return res.status(404).json({ success: false, message: 'File not found' });
  }

  const filePath = path.resolve(file.path);
  res.download(filePath, file.name);
});

Router.get('download/:filename', (req, res) => {
  const UploadDir = path.join(process.cwd(), '/uploads');
  const filepath = path.join(UploadDir, req.params.filename);
  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: "File not found",
        error: {
          code: 404,
          details: `No file with name ${req.params.filename} found on server.`
        }
      });
    }
    res.download(filepath); // Added missing response to serve the file
  });
});

Router.get("/:filename",(req,res)=>{
    const filepath=path.join(__dirname,'uploads',req.params.filename);
    if(fs.existsSync(filepath)){
        res.status(200);
        res.download(filepath);
    }
    else{
        res.status(404).json({message:"File doesn't exist on the server or has been moved"})
    }
})

export default Router;