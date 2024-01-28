import React from 'react';
import ActivityForm from '../ActivityForm/ActivityForm';
import { useDispatch } from 'react-redux';
import { update } from '../../asyncThunks/activityThunk';

const EditMode = ({ selectedActivity, handleExitEdit }) => 
{
    const dispatch = useDispatch();

    const handleSubmit = (values) =>
    {
        dispatch(update(values));
        handleExitEdit();
    };

    console.log(selectedActivity);
    return (
        <div>
            <ActivityForm handleSubmit={handleSubmit} initialValues={{...selectedActivity, deadline: new Date(selectedActivity.deadline).toISOString().substring(0, 16)}}/>
        </div>
    );
}

export default EditMode;
