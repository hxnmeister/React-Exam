import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../asyncThunks/activityThunk';
import Activity from '../../components/Activity/Activity';

const Home = () => 
{
    const { activities, loading } = useSelector((state) => state.activity);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(getAll());
    }, []);

    if(loading)
    {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            { activities && activities.map( (activity, index) => <Activity key={index} activity={activity}/> )}
        </div>
    );
}

export default Home;
