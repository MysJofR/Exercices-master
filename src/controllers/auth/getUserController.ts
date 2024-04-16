import { Request, Response, response } from 'express';


import getUserByid from '../../models/user/getUserById';
import returnUsablePathFromPicture from '../../functions/returnUsablePathFromPicture';
import AppErrorConstructor from '../../Errors/errorConstructor';
import { string } from 'yup';

export default async function getUsersController(req: Request, res: Response) {
    



    if(!req.body.userId) throw new AppErrorConstructor("invalid token", 401)
    const id = req.body.userId

    let user = await getUserByid(id)

    user.profilePicture = returnUsablePathFromPicture(user.profilePicture)
    
    const { roleId:_,email:__,id:___, ...userInfo} = user
    const response = userInfo
    res.status(200).json(response)
}