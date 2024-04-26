import prisma from "../libs/prisma/prisma";


export const checkIfUserExists = async (id:string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if(user) return true
    else return false
}
