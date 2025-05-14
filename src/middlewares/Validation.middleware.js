import  User  from "../models/user.models.js";
import bcrypt from 'bcrypt';
export const ValidateUser=async (req,res,next)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user) return res.status(401).json({message:"Invalid email!"});
        const validpassword=await bcrypt.compare(password,user.passwordHash);
        if(!validpassword) return res.status(401).json({message:"Invalid password!"})
        return res.json({
         user:{
            id:user._id,
            username:user.username,
         }
    })
    } catch(err) {
        next(err);
    }
}
