import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialValues } from './form/initValues';
import { validation } from './form/validationSchema';
import { registration } from '../../asyncThunks/authThunk';
import { Navigate } from 'react-router-dom';
import { clearError } from '../../slices/authSlice';

const SignUp = () => 
{
    const { token, error } = useSelector( (state) => state.auth );
    const dispatch = useDispatch();

    useEffect(() => 
    {
        error && dispatch(clearError());
    },[])

    if(token || localStorage.getItem('token'))
    {
        return <Navigate to="/"/>
    }
    
    
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                validateOnChange
                onSubmit=
                {(values) => 
                    {
                        dispatch(registration({ name: values.name, email: values.email, password: values.password }));
                    }
                }
            >
                {
                    ({ isSubmitting, isValid }) =>
                    (
                        <Form>
                            <label htmlFor="name">Name:</label>
                            <Field type="text" name="name" placeholder={initialValues.name}/>
                            <ErrorMessage component="div" name="name"/>

                            <label htmlFor="email">Email:</label>
                            <Field type="email" name="email" placeholder={initialValues.email}/>
                            <ErrorMessage component="div" name="email"/>

                            <label htmlFor="password">Password:</label>
                            <Field type="password" name="password" placeholder={initialValues.password}/>
                            <ErrorMessage component="div" name="password"/>

                            <label htmlFor="repeatPassword">Repeat Password:</label>
                            <Field type="password" name="repeatPassword" placeholder={initialValues.repeatPassword}/>
                            <ErrorMessage component="div" name="repeatPassword"/>

                            <button type="submit" disabled={!isValid}>Sign Up</button>
                        </Form>
                    )
                }
            </Formik>

            <div> {error && error.message}</div>
        </div>
    );
}

export default SignUp;
