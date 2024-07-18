import AppErrorConstructor from '../../Errors/errorConstructor';
import prisma from '../../libs/prisma/prisma';
import checkIfUserExistsByschoolId from './checkIfUserExistsByschoolId';

export default async function updateUser(Info) {
    try {
        // Verifique se o usuário existe
        if (!await checkIfUserExistsByschoolId(Info.schoolId)) {
            throw new AppErrorConstructor('User not found', 400);
        }

        // Upsert role se uma nova role for fornecida
        if (Info.newRole) {
            await prisma.role.upsert({
                where: {
                    name: Info.newRole.name,
                },
                create: {
                    name: Info.newRole.name,
                    routesAllow: {
                        set: Info.newRole.perms,
                    },
                },
                update: {
                    name: Info.newRole.name,
                    routesAllow: {
                        set: Info.newRole.perms,
                    },
                },
            });
        }

        // Atualize os dados do usuário
        const updatedUser = await prisma.user.update({
            where: {
                schoolId: Info.schoolId,
            },
            data: {
                fullname: Info.newFullname,
                email: Info.newEmail,
                profilePicture: Info.newProfilePicture,
                course: Info.newCourse,
                year: Info.newYear,
                role: {
                    connect: {
                        name: Info.newRole.name,
                    },
                },
            },
        });

        // Atualize associações de cursos e roles
        if (Info.newCourses) {
            for (let i in Info.newCourses) {
                const courseName = Info.newCourses[i].course;
                const courseRole = Info.newCourses[i].roles[0];
              
                // Verifique se o curso existe
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

                // Verifique se a associação já existe
                const existingAssociation = await prisma.courseAndRole.findFirst({
                    where: {
                            userId: updatedUser.id,
                             courseId: course.id,
                    },
                });

                if (existingAssociation) {
                    // Atualize a associação existente
                    await prisma.courseAndRole.update({
                        where: {
                            id: existingAssociation.id,
                        },
                        data: {
                            role: courseRole,
                        },
                    });
                } else {
                    // Crie uma nova associação
                    await prisma.courseAndRole.create({
                        data: {
                            courseId: course.id,
                            userId: updatedUser.id,
                            role: courseRole,
                        },
                    });
                }
            }
        }

        return updatedUser;
    } catch (error) {
        console.log(error);
        if (error instanceof AppErrorConstructor) {
            throw error;
        }
        throw new AppErrorConstructor('Error while updating user', 500);
    }
}
