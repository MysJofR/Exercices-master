import AppErrorConstructor from '../Errors/errorConstructor'
import prisma from "../libs/prisma/prisma";


export default async function deleteExercice(id: string) {
    
    const exercice = await prisma.exercice.findUnique({
        where:{
            id: id
        }
    })
    if(!exercice) throw new AppErrorConstructor("Exercice not found",404)

    const exerciceDelete = prisma.exercice.delete({
        where:{
            id: id
        }
    })

    const testsToDelete = prisma.tests.deleteMany({
        where:{
           exerciseId: exercice.id
        }
    })

    await prisma.$transaction([testsToDelete, exerciceDelete])
    
    return true

}