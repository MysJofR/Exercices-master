import AppErrorConstructor from "../Errors/errorConstructor";
import prisma from "../libs/prisma/prisma";

export default async function getExerciceById(id: string) {
    console.time('DB Query');

    try {
        const exercice = await prisma.exercice.findUnique({
            where: {
                id: id,
            },
            include: {
                doneBy: true,
                submissions: {
                    include: {
                        user: true
                    }
                },
                creator: true,
                tests: true,
            },
        });

        console.timeEnd('DB Query');

        if (!exercice) throw new AppErrorConstructor('Exercice not found', 404);

        return {
            ...exercice,
        };
    } catch (err) {
        console.timeEnd('DB Query');
        if (err instanceof AppErrorConstructor) throw err;
        throw new AppErrorConstructor('Error getting exercice', 500);
    }
}
