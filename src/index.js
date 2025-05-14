import dotenv from "dotenv"
import mongoose from 'mongoose';
import { DB_Name } from './constants.js';
import ConnectDb from './db/index.js';
import { response } from "express";
import app from './app.js';
import User from './models/user.models.js';
dotenv.config();


ConnectDb().then(()=>{
    app.on("error",(err)=>{
        console.error("Connection Failed",err);
        throw err; 
    })
    console.log("Database has been succesfully connected!!")
}).catch((error)=>{"ERROR:",error});
app.get('/login',(req,res)=>{
    res.send("login page");
})
app.listen(process.env.PORT||4000,(err)=>{
    if(err){
        console.error("Server failed to start :",err);
    }
    else{
        console.log("server is running on port",process.env.PORT);
    }
})
// const users = [
//     { username: 'Shaun_doe', email: 'Shaun@example.com', passwordHash: 'password556' },
//     { username: 'Sara_doe', email: 'Sara@example.com', passwordHash: 'password666' },
//   ];

//   await User.insertMany(users);
  console.log('Sample data inserted successfully');













// import express from 'express';
// const app=express();
// ( async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`)
//         app.on("error",(error)=>{
//             console.log("Error :",error);
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.error("ERROR :", error);
        
//     }
// })()