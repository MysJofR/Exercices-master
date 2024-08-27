import { Request, Response, response } from 'express';


import getUserByid from '../../models/user/getUserById';
import returnUsablePathFromPicture from '../../functions/returnUsablePathFromPicture';
import AppErrorConstructor from '../../Errors/errorConstructor';
import { string } from 'yup';

export default async function getRoleController(req: Request, res: Response) {
    


    
    if(!req.body.userId) throw new AppErrorConstructor("invalid token", 401)
    const id = req.body.userId

    let user = await getUserByid(id)

   
    

    const response = user.role
    res.status(200).json(response)
}