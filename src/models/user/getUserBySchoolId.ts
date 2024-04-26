import AppErrorConstructor from "../../Errors/errorConstructor"
import prisma from "../../libs/prisma/prisma"

export default async function getUserBySchoolId(id: string){
    
    try {
        
        const user = await prisma.user.findUnique({
            where: {
                schoolId: id
            }
        })
        if(!user) throw new AppErrorConstructor('User not found', 404)

        return user

    } catch (err) {
        throw new AppErrorConstructor('Error geting user', 500)
    }

}