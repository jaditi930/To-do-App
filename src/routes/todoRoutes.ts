import {Response,Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {IRequest} from "../types/custom"
import validateToken from "../middleware/validateToken"

const router = Router();

router.use(validateToken);

router.get("/add",expressAsyncHandler(async (req:IRequest,res:Response)=>{

    const user=req.user.username
    if(!user){
        res.status(400).send("User is not authorized")
    }
    res.status(200).send(user)


}))





module.exports=router
