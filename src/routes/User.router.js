import mongoose from "mongoose";
import { Router } from "express";
import app from "../app.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { UserData } from "../utils/UserData.js";
import  User  from "../models/user.models.js";
const router=Router();
// router.get('/user/:username',asyncHandler(UserData));
// router.get('/user/password/:password',asyncHandler(UserData));
// router.get('/user/email/:email',asyncHandler(UserData));
router.get('/users',asyncHandler(async (req,res)=>{
  const userdetails= await User.find();
  if(userdetails.length===0){
    return res.status(404).json({message:"No users found"});
  }
  else{
    return res.status(200).json(userdetails);
  }
}))
export default router
