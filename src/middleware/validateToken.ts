import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt, { DecodeOptions, GetPublicKeyOrSecret, Secret } from "jsonwebtoken"
import { IRequest} from "../types/custom";

const validateToken=expressAsyncHandler(async (req:Request,res:Response,next:NextFunction)=>{

  try{
    const token=req.headers.authorization!.split(" ")[1];
    const SECRET_KEY=process.env.SECRET_KEY;
    const decode =jwt.verify(token,SECRET_KEY as Secret|GetPublicKeyOrSecret) as any;

    (req as IRequest).user=decode.user;
    console.log("user validated")
    next()
  }
  catch(err:any){
        console.log(err.message)
        res.status(401);
        throw new Error("User is not authorized");
  }
})
export default validateToken;