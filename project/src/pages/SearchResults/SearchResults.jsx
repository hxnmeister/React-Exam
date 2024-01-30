import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchResults } from '../../slices/activitiySlice';
import Activity from '../../components/Activity/Activity';
import { Navigate } from 'react-router-dom';

const SearchResults = () => {
    const { tagSearchResults, loading } = useSelector((state) => state.activity);
    const [activities, setActivities] = useState(tagSearchResults);
    const dispatch = useDispatch();

    useEffect(() => 
    {
        dispatch(clearSearchResults());
    }, []);

    if(activities.length === 0)
    {
        return <Navigate to='/'/>
    }

    return (
        <div>
            <h1>Searching results:</h1>
            {activities.map((activity) => 
                (
                    <div key={activity._id}>
                        <span>Title: {activity.title}</span>
                        <br />
                        <span>Deadline: {new Date(activity.deadline).toLocaleString()}</span>
                        <br />
                        <span>Description: {activity.description}</span>
                        <br />
                        <span>Priority: {activity.priority}</span>
                        <hr />  
                    </div>
                ))
            }       
        </div>
    );
}

export default SearchResults;
