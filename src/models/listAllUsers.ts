import AppErrorConstructor from "../Errors/errorConstructor";
import returnUsablePathFromPicture from "../functions/returnUsablePathFromPicture";
import prisma from "../libs/prisma/prisma";

export default async function listAllUsers() {

    try{ 
    const users = await prisma.user.findMany({
        
        select:{
            fullname: true,
            exercisesDone: true,
            schoolId: true,
            profilePicture: true,
            submissions: true
        }

    });

    users.map(e => {
        e.profilePicture = returnUsablePathFromPicture(e.profilePicture)
    })


    return users;
    } catch (err){
        throw new AppErrorConstructor('Não foi possivel listar os usuários', 404)
    }
} 


