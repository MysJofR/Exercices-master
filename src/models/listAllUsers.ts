import AppErrorConstructor from "../Errors/errorConstructor";
import prisma from "../libs/prisma/prisma";

export default async function listAllUsers() {

    try{ 
    const users = await prisma.user.findMany({
        
        select:{
            fullname: true,
            exercisesDone: true,
            schoolId: true
        }

    });
    return users;
    } catch (err){
        throw new AppErrorConstructor('Não foi possivel listar os usuários', 404)
    }
} 


