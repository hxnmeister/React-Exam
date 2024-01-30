import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchByTag } from '../../asyncThunks/activityThunk';
import { Navigate } from 'react-router-dom';

const highlightSearchText = (text, searchText) => 
{
    if (!searchText) 
    {
        return text;
    }

    const regex = new RegExp(`(${searchText})`, 'gi');

    return text.split(regex).map((part, index) => regex.test(part) ? <mark key={index}>{part}</mark> : part
    );
};

const Activity = ({ activity, searchText }) => 
{
    const { userData } = useSelector((state) => state.auth);
    const { tagSearchResults } = useSelector((state) => state.activity);
    const dispatch = useDispatch();

    if(tagSearchResults.length !== 0)
    {
        return <Navigate to='/search-results'/>
    }

    return (
        <div>
            <span>Title: {highlightSearchText(activity.title, searchText)}</span>
            <br />
            <span>Deadline:  {new Date(activity.deadline).toLocaleString()}</span>
            <br />
            <span>Description: {highlightSearchText(activity.description, searchText)}</span>
            <br />
            <span>Priority: {activity.priority}</span>
            <br />
            <div className={styles.tags}>Tags: {activity.tags.map((tag, index) => <span key={index}><a onClick={() => dispatch(searchByTag({userId: userData, searchingTag: tag}))}>{highlightSearchText(tag, searchText)}</a></span>)}</div>
            <br />
        </div>
    );
}

export default Activity;
