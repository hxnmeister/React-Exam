import React from 'react';

const Activity = ({ activity }) => 
{
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
            <hr style={{marginRight: '80%'}}/>
            <form ></form>
        </div>
    );
}

export default Activity;
