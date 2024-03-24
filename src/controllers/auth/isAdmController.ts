import { Request, Response } from "express";
import { InferType } from "yup";
import loginSchema from "../../schemas/loginSchema";
import login from "../../models/auth/login";
import genJWToken from "../../functions/genJWToken";
import getInfoUser from "../../models/auth/getInfoUser";


export default async function isAdmController(req: Request<{}, {}, {}>, res: Response) {
    
const user = await getInfoUser((req as any).user) 

const perm = user.role.routesAllow 


    res.status(200).json({
      
        routesAllow: perm
    })

}