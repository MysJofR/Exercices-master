import AppErrorConstructor from "../../Errors/errorConstructor";
import prisma from "../../libs/prisma/prisma";


export default async function listMembers(courses) {

    try{ 
  
    const users = await prisma.user.findMany({
        where: {
          courses: {
            some: 
            {
                course: {
                    name: {
                        in: courses
                    }
                }
            }
          }
        }
    })
    return users
    } catch (err){
        throw new AppErrorConstructor('Não foi possivel listar os membros', 404)
    }
} 


