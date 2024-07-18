import AppErrorConstructor from "../../Errors/errorConstructor"
import prisma from "../../libs/prisma/prisma"


export default async function getUserById(id: string){

    try {
     
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include:{
                role:true,
                exercisesDone: true,
                courses: true
               
            }
        })
        
        if(!user) throw new AppErrorConstructor('User not found', 4004)


        return {
            ...user,
        }

    } catch (err) {
        if(err instanceof AppErrorConstructor) throw err
        throw new AppErrorConstructor('Error geting user', 500)
    }

}