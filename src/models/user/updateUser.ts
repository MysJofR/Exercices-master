import AppErrorConstructor from '../../Errors/errorConstructor'

import prisma from '../../libs/prisma/prisma'
import checkIfUserExistsByschoolId from './checkIfUserExistsByschoolId'

export default async function updateUser(Info) {

    try {
        if(!await checkIfUserExistsByschoolId(Info.schoolId)) throw new AppErrorConstructor('User not found', 400)
        if(Info.role){

            const result = await prisma.role.upsert({
                where: {
                    name: Info.newRole.name
                },
                create: {
                    name: Info.newRole.name,
                    routesAllow: {
                        set: Info.newRole.perms
                    }
                },
                update: {
                    name: Info.newRole.name,
                    routesAllow: {
                        set: Info.newRole.perms
                    }
                },
            })

        }
        
        const result = await prisma.user.update({
            where: {
                schoolId: Info.schoolId
            },

            data: {
                fullname: Info.newFullname,
                email: Info.newEmail,
                schoolId: Info.schoolId,
                profilePicture: Info.newProfilePicture,
                course: Info.newCourse,
                year: Info.newYear,
                role: {

                    connect: {
                        
                            name: Info.newRole.name,
                    
                    }
                }
            }

        })

        if(!result) throw new AppErrorConstructor('Error while updating user', 500)
        
        return result

    } catch (error) {
        console.log(error)
        if(error instanceof AppErrorConstructor) throw error
        throw new AppErrorConstructor('Error while updating user', 500)
    }

}