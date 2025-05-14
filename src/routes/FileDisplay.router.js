import {Router} from "express";
import fs from 'fs';
import path from 'path';
const DRouter=Router();
DRouter.get('/files',(req,res)=>{
    const UploadDir=path.join(process.cwd(),'/uploads');
    fs.readdir(UploadDir,(err,files)=>{
        if(err){
            return res.status(500).json({
                success:false,
                message:"Files are not read properly..",
                error:err.message
            })
        }
        res.status(200).json({
            success:true,
            files:files
        })
    })
})
export default DRouter;