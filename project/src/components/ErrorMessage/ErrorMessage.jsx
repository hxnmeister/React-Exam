import React from 'react';
import './style.css';

const ErrorMessage = ({ message }) => {
    return (
        <div className='error-text'>
            <span>{message}</span>
        </div>
    );
}

export default ErrorMessage;
