import { Request, Response, response } from 'express';


import getUserByid from '../../models/user/getUserById';
import returnUsablePathFromPicture from '../../functions/returnUsablePathFromPicture';
import AppErrorConstructor from '../../Errors/errorConstructor';
import { InferType, string } from 'yup';
import getExerciceById from '../../models/getExerciceById';


export default async function getExerciceByIdController(req: Request<{}, {}, body>, res: Response) {
    
    const id = req.params.id


    

    let exercice = await getExerciceById(id)

    
    
    
    const response = exercice
    console.log(exercice)
    res.status(200).json(response)
}