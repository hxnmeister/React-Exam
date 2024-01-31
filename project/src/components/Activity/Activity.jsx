import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    return (
        <div className={styles.activity}>
            <span>Title: {highlightSearchText(activity.title, searchText)}</span>
            <br />
            <span>Deadline:  {new Date(activity.deadline).toLocaleString()}</span>
            <br />
            <span>Description: {highlightSearchText(activity.description, searchText)}</span>
            <br />
            <span>Priority: {activity.priority}</span>
            <div className={styles.tags}>Tags: {activity.tags.map((tag, index) => <span key={index}><a onClick={() => navigate(`/search-by-tag/${tag.replace("#", "")}`)}>{highlightSearchText(tag, searchText)}</a></span>)}</div>
        </div>
    );
}

export default Activity;
