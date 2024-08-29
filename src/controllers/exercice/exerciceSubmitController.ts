import { Request, Response } from "express";

import validateCode from "../../functions/validateCode";

import { InferType } from "yup";
import submitExercicesSchema from "../../schemas/submitExerciceSchema";
import AppErrorConstructor from "../../Errors/errorConstructor";
import { userPass } from "../../models/userPass";
import prisma from "../../libs/prisma/prisma";
type body = InferType<typeof submitExercicesSchema>;

export default async function submitExercice(req: Request<{}, {}, body>, res: Response) {

const validate = await validateCode(req.body.exerciceId, req.body.code)

const submissionExists = await prisma.submission.findFirst({
    where:{
        exerciceId: req.body.exerciceId,
        userId: (req as any).user,
    }
})


if(validate.error instanceof AppErrorConstructor){ 
    if(submissionExists) {
        const submission = await prisma.submission.update({
            where: {
               id: submissionExists.id
            },
            data: {
                attempts: submissionExists.attempts + 1,
                code: req.body.code
            }
        })
    }
    throw new AppErrorConstructor(`Resolução incorreta! Leia o enunciado com atenção e tente novamente!` // ${validate.error?.errorOn} do seu programa da resolucao: Esperado ${validate.error?.expected} mas obteve ${validate.error?.got
        ,500)
}else{
   
    if(validate.passed == false){
        if(submissionExists) {
            const submission = await prisma.submission.update({
                where: {
                   id: submissionExists.id
                },
                data: {
                    attempts: submissionExists.attempts + 1,
                    code: req.body.code
                }
            })
        }
          
      
       
    
   
         throw new AppErrorConstructor(`Resolução incorreta! Leia o enunciado com atenção e tente novamente!` // ${validate.error?.errorOn} do seu programa da resolucao: Esperado ${validate.error?.expected} mas obteve ${validate.error?.got
    ,500) }
    if(validate.passed == true) {

        if(submissionExists) {
            const submission = await prisma.submission.update({
                where: {
                   id: submissionExists.id
                },
                data: {
                    attempts: submissionExists.attempts + 1,
                    code: req.body.code,
                    correctAttempt: submissionExists.correctAttempt ? submissionExists.correctAttempt : submissionExists.attempts + 1
                }
            })
        }else{
        const submission = await prisma.submission.create({
            data: {
                code: req.body.code,
                exerciceId: req.body.exerciceId,
                userId: (req as any).user,
                attempts: 1,
                correctAttempt: 1
            }
        })
    }

        await userPass(((req as any).user), req.body.exerciceId)

        return res.status(200).json({message: 'Parabens, você concluiu a Tarefa!'})

    }

}

}