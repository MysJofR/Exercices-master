import { Request, Response } from "express";
import { InferType } from "yup";
import loginSchema from "../../schemas/loginSchema";
import login from "../../models/auth/login";
import genJWToken from "../../functions/genJWToken";
import getInfoUser from "../../models/auth/getInfoUser";
import listAllUsers from "../../models/listAllUsers";
import listMembers from "../../models/courses/listMembers";
import listMembersSchema from "../../schemas/listMembersSchema";
import prisma from "../../libs/prisma/prisma";


export default async function getCoursesController(req: Request<{}, {}, {}>, res: Response) {
    
   
    const courses = await prisma.course.findMany({
      where: {
       members: {
        some: {
          userId: (req as any).user
        }
       }
      }
    })

    res.status(200).json({
        
      courses: courses
       
    })

}