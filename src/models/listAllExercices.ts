import prisma from "../libs/prisma/prisma";

export default async function listAllExercices() {
    const exercices = await prisma.exercice.findMany({
        
        include:{
            tests:true,
            doneBy: true
        }

    });
    return exercices ? exercices : [];
}