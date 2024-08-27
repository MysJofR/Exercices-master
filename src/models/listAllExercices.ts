import AppErrorConstructor from "../Errors/errorConstructor";
import prisma from "../libs/prisma/prisma";
import getUserById from "./user/getUserById";

export default async function listAllExercices() {
    try {
        const exercices = await prisma.exercice.findMany({
            include: {
                tests: true,
                doneBy: true,
                creator: true,
                submissions: {
                    include: {
                        user: true,
                        
                    }
                }
            },
        });

        console.log("Exercices retrieved:", exercices);

        return exercices.length > 0 ? exercices : [];
    } catch (error) {
        console.error("Error retrieving exercices:", error);
        throw new AppErrorConstructor("Failed to retrieve exercices", 500);
    }
}
