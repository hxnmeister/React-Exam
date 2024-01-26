import { useFormik } from 'formik';
import React from 'react';
import '../../components/ErrorMessage/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../asyncThunks/authThunk';
import { initialValues } from './form/initValues';
import { validation } from './form/validationRules';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Login = () => 
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
                dispatch(login({ email: values.email, password: values.password }));
            }
        }
    );

    if(token || localStorage.getItem('token'))
    {
        alert("You are already loggined in!");
        return <Navigate to='/'/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    id='email'
                    name='email'
                    type='email'
                    onChange={formik.handleChange}
                    value={formik.values.email} 
                    className={formik.errors.email ? 'error' : ''}
                />
                { formik.errors.email && <ErrorMessage message={formik.errors.email}/> }

                <label htmlFor="password">Password:</label>
                <input 
                    id='password'
                    name='password'
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.password} 
                />
                { formik.errors.password && <ErrorMessage message={formik.errors.password}/> }

                <label htmlFor="repeatPassword">Repeat Password:</label>
                <input 
                    id='repeatPassword'
                    name='repeatPassword'
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword} 
                />
                { formik.errors.repeatPassword && <ErrorMessage message={formik.errors.repeatPassword}/> }

                <button type='submit' disabled={formik.errors.email || formik.errors.password || formik.errors.repeatPassword}>Login</button>
            </form>
        </div>
    );
}

export default Login;
