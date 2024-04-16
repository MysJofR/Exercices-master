import { compare } from "bcrypt";
import AppErrorConstructor from "../../Errors/errorConstructor";

import prisma from "../../libs/prisma/prisma";

export default async function login(user:string){

    const userData = await prisma.user.findUnique({
        where:{
            id:user
        }
    })
    
    if(!userData) throw new AppErrorConstructor("User not found",404)
    
    return userData
}   