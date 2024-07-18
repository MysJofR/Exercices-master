import { Request,Response } from "express";
import listAllExercices from "../../models/listAllExercices";
import AppErrorConstructor from "../../Errors/errorConstructor";

export default async function listExerciceController(req:Request,res:Response){
   
    if(!req.body.userId) throw new AppErrorConstructor("invalid token", 401)
        const id = req.body.userId
    

    
res.status(200).json(await listAllExercices(id))

}