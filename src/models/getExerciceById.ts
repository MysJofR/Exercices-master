import AppErrorConstructor from "../Errors/errorConstructor"
import prisma from "../libs/prisma/prisma"



export default async function getExerciceById(id: string){

    try {
        console.log(id)
        const exercice = await prisma.exercice.findUnique({
            where: {
                id: id
            },
            include:{
             doneBy: true,
             creator: true,
             tests: true
             
             
               
            }
        })
        
        if(!exercice) throw new AppErrorConstructor('Exercice not found', 404)


        return {
            ...exercice,
        }

    } catch (err) {
        if(err instanceof AppErrorConstructor) throw err
        throw new AppErrorConstructor('Error geting exercice', 500)
    }

}