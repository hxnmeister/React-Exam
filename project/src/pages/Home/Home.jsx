import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allActivities } from '../../asyncThunks/activityThunk';

const Home = () => 
{
    const { activities, loading } = useSelector( (state) => state.activity );
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(allActivities());
    }, []);
    
    if(activities === null)
    {
        return <h1>Hello</h1>
    }
    if(loading)
    {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            { activities.map( (activity, index) => <span key={index}>{activity.title}</span> )}
        </div>
    );
}

export default Home;
