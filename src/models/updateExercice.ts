import prisma from "../libs/prisma/prisma";
import exerciceUpdateDTO from '../interfaces/exerciceUpdateDTO'
import AppErrorConstructor from '../Errors/errorConstructor'
import checkIfUserExistsByschoolId from "./user/checkIfUserExistsByschoolId";

export default async function updateExercice(data: exerciceUpdateDTO){
    try {
const exercice = await prisma.exercice.findUnique({
    where: {
        id: data.id
    }
})
if(!exercice) throw new AppErrorConstructor("Exercice not found", 404)

let doneByFormatted=data.doneBy?.map( function (e){
   
    return{
        schoolId:e
    }
    })


    
const newExercice = await prisma.exercice.update({
    where: {
        id: data.id
    },
    data: {
        statement:data.statement,
        difficulty: data.difficulty,
        tests: {
            set: [],
            createMany: {
                data: data.tests || []
            }
        },
        doneBy: {
           set: [],
           connect:doneByFormatted 
        }
    },
    include: {
        doneBy: true,
        tests: true
    }
})

if(!newExercice) throw new AppErrorConstructor("Exercice not updated", 500)
    return newExercice
}
catch (err){
   
    throw new AppErrorConstructor("Exercice not updated", 500)
}




}