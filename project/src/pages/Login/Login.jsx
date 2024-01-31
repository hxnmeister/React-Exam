import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../asyncThunks/authThunk';
import { initialValues } from './form/initValues';
import { validation } from './form/validationSchema';
import { clearError } from '../../slices/authSlice';

const Login = () => 
{
    const { token, error } = useSelector( (state) => state.auth );
    const dispatch = useDispatch();

    useEffect(() => 
    {
        error && dispatch(clearError());
    }, []);

    if(token || localStorage.getItem('token'))
    {
        return <Navigate to='/'/>
    }
    
    const submitHandler = (values) =>
    {
        dispatch(login({email: values.email, password: values.password}));
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                validateOnChange
                onSubmit={submitHandler}
            >
                {
                    ({ isSubmitting, isValid }) =>
                    (
                        <Form>
                            <label htmlFor="email">Email:</label>
                            <Field type="email" name="email" placeholder={initialValues.email}/>
                            <ErrorMessage component="div" name="email"/>
                            
                            <label htmlFor="password">Password:</label>
                            <Field type="password" name="password" placeholder={initialValues.password}/>
                            <ErrorMessage component="div" name="password"/>

                            <label htmlFor="repeatPassword">Repeat Password:</label>
                            <Field type="password" name="repeatPassword" placeholder={initialValues.repeatPassword}/>
                            <ErrorMessage component="div" name="repeatPassword"/>

                            <button type='submit' disabled={!isValid}>Login</button>
                        </Form>
                    )
                }
            </Formik>

            <div>
                {
                    error && error.message
                }
            </div>
        </div>
    );
}

export default Login;
