import { Router, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
const User=require("../models/userModel")
import bcrypt from "bcrypt"
import jwt, {Secret } from "jsonwebtoken"

const router = Router();

router.get("/",expressAsyncHandler(async (req:Request,res:Response)=>{
    res.send("Server is working")
}))

router.post("/signup",expressAsyncHandler(async (req:Request,res:Response)=>{
    const {username,password}=req.body
    const userAvailable = await User.findOne({ username:username });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }
    const hashed_password=await bcrypt.hash(password,10)
    let newUser=""
    newUser= await User.create({username,password:hashed_password})
    if(!newUser)
    {
        res.status(400);
    throw new Error("User data us not valid");
    }
    console.log(newUser)
    res.status(200).json({
        "success":true,
        "newUser":newUser
    })

}))

router.post("/login",expressAsyncHandler(async (req:Request,res:Response)=>{
    const {username,password}=req.body
    console.log(username,password)
    if(!username||!password)
    {
        res.status(400)
        throw new Error("Please enter username and password")
    }
    const user=await User.findOne({username:username})
    if(!user)
    {
        res.status(404)
        throw new Error("Username does not exist")
    }
    const hashed_password=await bcrypt.compare(password,user.password)
    if(!hashed_password)
    {
        res.status(400)
        throw new Error("Username or password is wrong")
    }
    const accessToken=jwt.sign({
        user:{
            username:user.username
    }},process.env.SECRET_KEY as Secret,{
        expiresIn:"1h"
    })
    res.status(200).json({
        "success":true,
        "token":accessToken
    });
}))



module.exports=router