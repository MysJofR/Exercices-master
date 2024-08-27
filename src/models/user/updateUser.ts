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
             
            },
        });

        // Atualize associações de cursos e roles
        

        return updatedUser;
    } catch (error) {
        console.log(error);
        if (error instanceof AppErrorConstructor) {
            throw error;
        }
        throw new AppErrorConstructor('Error while updating user', 500);
    }
}
