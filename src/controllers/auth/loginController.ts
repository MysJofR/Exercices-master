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



export default async function loginController(req: Request<{},{},bodyType>, res: Response) {

    const token = await getToken(req.body.username,req.body.password)
   
    // Se chegou até aqui, o usuário está certo
    const userInfo = await getInfoFromUser(token,req.body.username)
   
    
    
    const {fullname,email,idnumber,id} = userInfo

    const { year,courseName } = await getYearAndCourse(token,id)

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
            role:{
                name:process.env.DEFAULT_JOB_NAME || "Aluno",
                perms: [
                    "exercice",
                    "exercicelist",
                    "exercicesubmit",
                    "me",
                    "role"
                ]
            }
        })

        const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET);
        
        res.json({
            
            token:token,
            
        }).status(200)

    }
    
}