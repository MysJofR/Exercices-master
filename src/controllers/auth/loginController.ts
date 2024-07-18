import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { InferType } from 'yup';
import loginSchema from '../../schemas/loginSchema';
type bodyType = InferType<typeof loginSchema>;

import getToken from '../../services/getToken';
import getInfoFromUser from '../../services/getInfoFromUser';
import checkIfUserExistsByschoolId from '../../models/user/checkIfUserExistsByschoolId';
import updateUser from '../../models/user/updateUser';
import addUserToDb from "../../models/user/addUserToDb"
import getYearAndCourse from '../../services/getYearAndCourse';
import saveImageToDb from '../../functions/saveImageToDb';
import exercice from '../../routes/exercice';
import getUserCoursesAndRoles from '../../services/getRoles';


export default async function loginController(req: Request<{},{},bodyType>, res: Response) {

    const token = await getToken(req.body.username,req.body.password)
   
  
    const userInfo = await getInfoFromUser(token ,req.body.username)

    const {fullname,email,idnumber,id} = userInfo
    
    const { year,courseName } = await getYearAndCourse(token,id)
  
    const rolesInfo: object[] = await getUserCoursesAndRoles(token, id)

    const getRoleNameAndPerms = () => {
        if(rolesInfo.includes({
            role: 'teacher'
        })) return { name: 'Professor', perms: [ "exercice",
            "exercicelist",
            "exercicesubmit",
            "me",
            "exerciceadd",
            "exercicedelete",
            "exerciceupdate",
        "courses"] }
        else return { name: 'Aluno', perms: [ "exercice",
            "exercicelist",
            "exercicesubmit",
            "me",
            "exerciceadd",
            "exercicedelete",
            "exerciceupdate",
            "courses"] }
    }
    const role = getRoleNameAndPerms()
    const profilePicture = await saveImageToDb(token,userInfo.profileimageurl,fullname,id)
    
    if(await checkIfUserExistsByschoolId(idnumber)){



        //Usuário já existe no banco de dados
        const user = await updateUser({
            schoolId:idnumber,
            newFullName:fullname,
            newEmail:email,
            newProfilePicture:profilePicture,
            newYear:year,
            newCourse:courseName,
            newCourses: rolesInfo,
            newRole:{
                name:role.name,
                perms:role.perms
            }
        })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        
        res.json({
            token:token,
        }).status(200)

    }else{


        
        const user = await addUserToDb({
            year:year,
            course:courseName,
            schoolId:idnumber,
            fullname:fullname,
            email:email,
            profilePicture:profilePicture,
            courses: rolesInfo, 
         
            role:{
                name:role.name,
                perms:role.perms
            }
           
        })


        const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET);
        
        res.json({
            token:token,
            
        }).status(200)

    }
    
}