import AppErrorConstructor from "../../Errors/errorConstructor";
import prisma from "../../libs/prisma/prisma";



export default async function getInfoUser(id: string){

        try {
const user = await prisma.user.findFirstOrThrow({

    where: 
            {
                id: id
            },
            include: {
                
                exercisesDone: true,
                role: true
            }
})

return user
        } catch (err){
            throw new AppErrorConstructor('Usuário não encontrado', 404)
        }
    
}

