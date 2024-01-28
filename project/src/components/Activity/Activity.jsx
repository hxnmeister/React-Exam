import React from 'react';
import { useDispatch } from 'react-redux';

const Activity = ({ activity }) => 
{

    return (
        <div>
            <span>Title: {activity.title}</span>
            <br />
            <span>Deadline: {new Date(activity.deadline).toLocaleString()}</span>
            <br />
            <span>Description: {activity.description}</span>
            <br />
            <span>Priority: {activity.priority}</span>
            <br />
            <span>Tags: {activity.tags.map((tag, index) => <span key={index}>{tag} </span>)}</span>
            <br />
        </div>
    );
}

export default Activity;
