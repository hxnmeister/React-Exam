import React from 'react';
import { initialValues } from './initValues';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../asyncThunks/activityThunk';
import ActivityForm from '../../components/ActivityForm/ActivityForm';

const CreateActivity = () => 
{
    const { userData, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = (values, {resetForm}) =>
    {
        dispatch(add({...values, user: userData.id}));
        resetForm();
    };

    if(token)
    {
        return (
            <ActivityForm handleSubmit={handleSubmit} initialValues={initialValues}/>
        );
    }
}

export default CreateActivity;
