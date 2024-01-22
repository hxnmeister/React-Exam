import { useFormik } from 'formik';
import React from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../asyncThunks/authThunk';

const Login = () => {
    const { token } = useSelector( (state) => state.auth );
    const dispatch = useDispatch();
    const formik = useFormik
    (
        {
            initialValues:
            {
                email: 'helloworld@gmail.com',
                password: 'WatchOut123@',
                repeatPassword: 'WatchOut123@'
            },
            validate: (values) =>
            {
                const errors = {};

                if(!values.email)
                {
                    errors.email = "Email field is required!";
                }
                else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
                {
                    errors.email = "Invalid email address!";
                }

                if(!values.password)
                {
                    errors.password = "Password field is required";
                }
                else if(!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(values.password))
                {
                    errors.password = "Password must be at least 8 chars and contain at least one uppercase letter, special char and number!";
                }

                if(!values.repeatPassword || !values.repeatPassword.includes(values.password))
                {
                    errors.repeatPassword = "Passwords must match!";
                }

                return errors;
            },
            onSubmit: (values) =>
            {
                console.log(JSON.stringify(values));
                dispatch(login({ email: values.email, password: values.password }));
            }
        }
    );

    if(token || localStorage.getItem('token'))
    {
        alert('Login successfull!');
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
                {
                    formik.errors.email && 
                    <div className='error-text'>
                        <span>{formik.errors.email}</span>
                    </div>
                }

                <label htmlFor="password">Password:</label>
                <input 
                    id='password'
                    name='password'
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.password} 
                />
                {
                    formik.errors.password && 
                    <div className='error-text'>
                        <span>{formik.errors.password}</span>
                    </div>
                }

                <label htmlFor="repeatPassword">Repeat Password:</label>
                <input 
                    id='repeatPassword'
                    name='repeatPassword'
                    type='password'
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword} 
                />
                {
                    formik.errors.repeatPassword && 
                    <div className='error-text'>
                        <span>{formik.errors.repeatPassword}</span>
                    </div>
                }

                <button type='submit' disabled={formik.errors.email || formik.errors.password || formik.errors.repeatPassword}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
