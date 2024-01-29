import React from 'react';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchByTag } from '../../asyncThunks/activityThunk';

const Activity = ({ activity }) => 
{
    const { userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

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
            <div className={styles.tags}>Tags: {activity.tags.map((tag, index) => <span key={index}><a onClick={() => dispatch(searchByTag({userId: userData._id, searchingTag: tag}))}>{tag}</a></span>)}</div>
            <br />
        </div>
    );
}

export default Activity;
