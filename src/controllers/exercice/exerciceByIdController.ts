import { Request, Response } from 'express';
import getExerciceById from '../../models/getExerciceById';

export default async function getExerciceByIdController(req: Request, res: Response) {
    const id = req.params.id;
    
    

    try {
        const exercice = await getExerciceById(id);
      

     
        res.status(200).json(exercice);
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
