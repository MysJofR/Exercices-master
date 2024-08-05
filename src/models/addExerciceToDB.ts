import exerciceDTO from "../interfaces/exerciceDTO";
import testCasesDTO from "../interfaces/testCasesDTO";
import checkIfExerciceExists from './checkIfExerciceExists';
import AppErrorConstructor from '../Errors/errorConstructor';
import prisma from "../libs/prisma/prisma";

export default async function addExerciceToDB(exercice: exerciceDTO, testCases: testCasesDTO) {
    try {
        if (await checkIfExerciceExists(exercice.name)) {
            throw new AppErrorConstructor("Exercice with same statement already exists", 400);
        }

        // Verificar se todos os cursos existem
  

        // Criar o exercício e associar os testes
        const result = await prisma.exercice.create({
            data: {
                name: exercice.name,
                creatorId: exercice.creator,
                statement: exercice.statement,
                difficulty: exercice.difficulty,
                tests: {
                    create: testCases.testCases.map(testCase => ({
                        input: {
                            set: testCase.inputs || [],
                        },
                        output: testCase.output,
                    })),
                },
                // Associar cursos ao exercício
              
                
            },
            include: {
                tests: true,
            },
        });

        if (!result) {
            throw new AppErrorConstructor("Internal Server Error", 500);
        }

        return result;
    } catch (error) {
        if (error instanceof AppErrorConstructor) {
            throw error;
        }
        throw new AppErrorConstructor("Internal Server Error", 500);
    }
}
