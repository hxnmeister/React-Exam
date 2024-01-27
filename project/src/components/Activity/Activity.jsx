import React from 'react';
import { useDispatch } from 'react-redux';
import { remove } from '../../asyncThunks/activityThunk';

const Activity = ({ activity, handleEnterEditClick }) => 
{
    const dispatch = useDispatch();

    return (
        <div>
            <span>Title: {activity.title}</span>
            <br />
            <span>Deadline: {activity.deadline}</span>
            <br />
            <span>Description: {activity.description}</span>
            <br />
            <span>Priority: {activity.priority}</span>
            <br />
            <span>Tags: {activity.tags.map((tag, index) => <span key={index}>{tag} </span>)}</span>
            <br />
            <button type="button" onClick={() => dispatch(remove(activity._id))}>Delete</button>
            <button type="button" onClick={() => handleEnterEditClick(activity)}>Edit</button>
            <hr style={{marginRight: '80%'}}/>
        </div>
    );
}

export default Activity;
