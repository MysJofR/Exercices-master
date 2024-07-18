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
    let courses;
if(data.courses){
     courses = await prisma.course.findMany({
        where: {
            name: {
                in: data.courses,
            },
        },
    });

    if (courses.length !== data.courses.length) {
        throw new AppErrorConstructor('One or more courses could not be found', 400);
    } 
    
}

    
const newExercice = await prisma.exercice.update({
    where: {
        id: data.id
    },
    data: {
        name: data.name,
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
        },
        courses: {
            connect: courses.map(course => ({
                id: course.id,
            })),
        },
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