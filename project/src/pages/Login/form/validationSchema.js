import * as Yup from "yup";

export const validation = Yup.object().shape
(
    {
        email: Yup.string()
            .email('Invalid email address!')
            .required('Email address is required!'),
        password: Yup.string()
            .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be 8 chars minimum and contain one: uppercase char, number, symbol')
            .required('Password is required!'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match!')
            .required("Repeat Password field is required!")
    }
)