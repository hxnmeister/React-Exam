import { useFormik } from 'formik';
import React from 'react';
import '../../components/ErrorMessage/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { initialValues } from './form/initValues';
import { validation } from './form/validationRules';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { registration } from '../../asyncThunks/authThunk';
import { Navigate } from 'react-router-dom';

const SignUp = () => 
{
    const { token } = useSelector( (state) => state.auth );
    const dispatch = useDispatch();
    const formik = useFormik
    (
        {
            initialValues,
            validate: validation,
            onSubmit: (values) =>
            {
                dispatch(registration({ name: values.name, email: values.email, password: values.password }));
            }
        }
    );

    if(token || localStorage.getItem('token'))
    {
        alert("You are already loggined in!");
        return <Navigate to="/"/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className={formik.errors.name ? 'error' : ''}
                />
                { formik.errors.name && <ErrorMessage message={formik.errors.name}/> }

                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    onChange={formik.handleChange} 
                    value={formik.values.email}
                    className={formik.errors.email ? 'error' : ''}
                />
                { formik.errors.email && <ErrorMessage message={formik.errors.email}/> }

                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    onChange={formik.handleChange} 
                    value={formik.values.password} 
                    className={formik.errors.password ? 'error' : ''}
                />
                { formik.errors.password && <ErrorMessage message={formik.errors.password}/> }

                <label htmlFor="repeatPassword">Repeat Password:</label>
                <input 
                    type="password" 
                    name="repeatPassword" 
                    id="repeatPassword" 
                    onChange={formik.handleChange} 
                    value={formik.values.repeatPassword} 
                    className={formik.errors.repeatPassword ? 'error' : ''}
                />
                { formik.errors.repeatPassword && <ErrorMessage message={formik.errors.repeatPassword}/> }

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
