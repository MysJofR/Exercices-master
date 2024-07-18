import yup,{object,string} from 'yup';

const listMembersSchema = object().shape({
    courses: yup.array().of(string().required()).required()
})

export default listMembersSchema;