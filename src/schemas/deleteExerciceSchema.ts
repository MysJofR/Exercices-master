import {object,string} from 'yup';

const deleteExerciceSchema = object().shape({
    statement: string().required(),
})

export default deleteExerciceSchema;