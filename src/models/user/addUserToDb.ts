import { courseAndRole } from '@prisma/client';
import App from '../../../my-vue-app/src/App.vue';
import AppErrorConstructor from '../../Errors/errorConstructor';
import prisma from '../../libs/prisma/prisma';
import checkIfUserExistsByschoolId from './checkIfUserExistsByschoolId';

export default async function addUserToDb(Info) {
    try {
        if (await checkIfUserExistsByschoolId(Info.schoolId)) {
            throw new AppErrorConstructor('User already exists', 400);
        }

        let roleResult;
        if (Info.role) {
            roleResult = await prisma.role.upsert({
                where: {
                    name: Info.role.name,
                },
                create: {
                    name: Info.role.name,
                    routesAllow: {
                        set: Info.role.perms,
                    },
                },
                update: {
                    name: Info.role.name,
                    routesAllow: {
                        set: Info.role.perms,
                    },
                },
            });
        }

        const userResult = await prisma.user.create({
            data: {
                fullname: Info.fullname,
                email: Info.email,
                schoolId: Info.schoolId,
                profilePicture: Info.profilePicture,
                course: Info.course,
                year: Info.year,
                role: {
                    connect: {
                        name: Info.role.name,
                    },
                },
            },
        });

        for (let i in Info.courses) {
            const courseName = Info.courses[i].course;
           
            const courseRole = Info.courses[i].roles[0];

            let course = await prisma.course.findUnique({
                where: {
                    name: courseName,
                },
            });

            if (!course) {
                console.log("criando novo curso: ", courseName)
                course = await prisma.course.create({
                    data: {
                        name: courseName
                    }
                })
            }

            await prisma.courseAndRole.create({
                data: {
                    courseId: course.id,
                    userId: userResult.id,
                    role: courseRole,
                },
            });
        }

        return userResult;
    } catch (error) {
        console.log(error);
        if (error instanceof AppErrorConstructor) {
            throw error;
        }
        throw new AppErrorConstructor('Error while creating user', 500);
    }
}
