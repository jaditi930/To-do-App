import {Response,Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {IRequest} from "../types/custom"
import validateToken from "../middleware/validateToken"
const ToDo=require("../models/todoModel")

const router = Router();

router.use(validateToken);

router.get("/viewAllTasks",expressAsyncHandler(async (req:IRequest,res:Response)=>{

    const username=req.user.username
    if(!username)
    {
        res.status(400)
        throw new Error("User is not authorized")

    }

    const allTasks=await ToDo.find({username:username})
    res.status(200).send({
        "tasks":allTasks})
}))


router.post("/add",expressAsyncHandler(async (req:IRequest,res:Response)=>{

    const username=req.user.username
    if(!username)
    {
        res.status(400)
        throw new Error("User is not authorized")
    }

    const {desc}=req.body;
    if(!desc)
    {
        res.status(400)
        throw new Error("Task name is mandatory")
    }

    const newTask=await ToDo.create({username,desc})
    console.log(newTask)
    res.status(200).json(newTask)

}))

router.delete("/delete/:id",expressAsyncHandler(async (req:IRequest,res:Response)=>{

    const username=req.user.username
    if(!username)
    {
        res.status(400).send({
        "message": "User is not authorized"
        })
    }

    const id=req.params.id
    const task=await ToDo.findOne({_id:id})

    if(!task){
        res.status(400).send({
            "message":"Invalid task id"
        })
    }

    await ToDo.deleteOne({_id:id})
    res.status(200).send({
        "message":"Task deleted successfully"
    })

}))

router.put("/update/:id",expressAsyncHandler(async (req:IRequest,res:Response)=>{
    
    const username=req.user.username
    if(!username)
    {
        res.status(400).send({
        "message": "User is not authorized"
        })
    }

    const id=req.params.id
    const task=await ToDo.findOne({_id:id})

    if(!task){
        res.status(400).send({
            "message":"Invalid task id"
        })
    }

    const updatedTask=await ToDo.findOneAndUpdate({
    _id:id}, {status:"Completed" })

    res.status(200).send({
        "message":"Task updated successfully"
    })

}))


module.exports=router
