import AppErrorConstructor from "../../Errors/errorConstructor"
import prisma from "../../libs/prisma/prisma"


export default async function checkIfUserExistsByschoolId(id: string):Promise<boolean>{
    
    try {

        const user = await prisma.user.findUnique({
            where: {
                schoolId: id
            }
        })

        if(user){
            return true
        }else{
            return false
        }

    } catch (err) {
        console.log(err)
        throw new AppErrorConstructor('Error while checking if user exists', 500)
    }

}