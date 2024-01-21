import { Router, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";


const router = Router();

router.get("/",expressAsyncHandler(async (req:Request,res:Response)=>{
    res.send("Server is working")
}))




module.exports=router