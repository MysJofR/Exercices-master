import yup,{object,array,string,number,addMethod} from 'yup';

const updateExerciceSchema = object().shape({
    exerciceId: string().required(),
    name: string(),
    statement: string(),
    difficulty: number().min(0).max(5),
    tests: array().of(object({
        input: array().of(string().required()).required(),
        output: string().required(),
    })
    .required()),
    doneBy: array().of(string().required()).nullable(),
    courses: array().of(string().required())
    
}).test('atLeastOneOf', 'You must provide at least one of these keys: statement, difficulty, tests', function(value) {
    return (value.statement || value.difficulty || value.tests) ? true : false;
})

export default updateExerciceSchema;