import prisma from "../libs/prisma/prisma";
import getUserById from "./user/getUserById";

export default async function listAllExercices(userId: string) {


    let user = await getUserById(userId);
 
    const userCourses = await prisma.courseAndRole.findMany({
        where: {
            userId: userId,
        },
        select: {
            courseId: true,
        },
    });


    const courseIds = userCourses.map(courseAndRole => courseAndRole.courseId);

    const exercices = await prisma.exercice.findMany({
        where: {
            courses: {
                some: {
                    id: {
                        in: courseIds,
                    },
                },
            },
        },
        include: {
            tests: true,
            doneBy: true,
            courses: {
                include: {
                    members: {
                        include: {
                        user: true
                        }
                    }
                }
            },
            creator: true
        },
    });

    return exercices? exercices : [];
}
