import * as yup from 'yup';

const schemaCredenciais = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required(),  
});

export default schemaCredenciais;