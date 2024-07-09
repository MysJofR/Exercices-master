import {object,string} from 'yup';

const deleteExerciceSchema = object().shape({
    id: string().required(),
})

export default deleteExerciceSchema;