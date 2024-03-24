import { Request, Response } from "express";
import { InferType } from "yup";
import loginSchema from "../../schemas/loginSchema";
import login from "../../models/auth/login";
import genJWToken from "../../functions/genJWToken";
import getInfoUser from "../../models/auth/getInfoUser";
import listAllUsers from "../../models/listAllUsers";


export default async function listUsersController(req: Request<{}, {}, {}>, res: Response) {
    
const user = await listAllUsers() 


    res.status(200).json({
      
        users: user
    })

}