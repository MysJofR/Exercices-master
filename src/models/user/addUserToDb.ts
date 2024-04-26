
import AppErrorConstructor from '../../Errors/errorConstructor'

import prisma from '../../libs/prisma/prisma'
import checkIfUserExistsByschoolId from './checkIfUserExistsByschoolId'

export default async function addUserToDb(Info ) {

    try {
        if(await checkIfUserExistsByschoolId(Info.schoolId)) throw new AppErrorConstructor('User already exists', 400)
        if(Info.role){

            const result = await prisma.role.upsert({
                where: {
                    name: Info.role.name
                },
                create: {
                    name: Info.role.name,
                    routesAllow: {
                        set: Info.role.perms
                    }
                },
                update: {
                    name: Info.role.name,
                    routesAllow: {
                        set: Info.role.perms
                    }
                },
            })

        }
        
        const result = await prisma.user.create({
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
                        
                    }
                }
            }

        })

        if(!result) throw new AppErrorConstructor('Error while creating user', 500)
        
        return result

    } catch (error) {
        console.log(error)
        if(error instanceof AppErrorConstructor) throw error
        throw new AppErrorConstructor('Error while creating user', 500)
    }

}