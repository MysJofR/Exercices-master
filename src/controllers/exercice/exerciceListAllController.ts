import { Request,Response } from "express";
import listAllExercices from "../../models/listAllExercices";
import AppErrorConstructor from "../../Errors/errorConstructor";

export default async function listExerciceController(req:Request,res:Response){

  const result =  await listAllExercices()

    
res.status(200).json(result)

}